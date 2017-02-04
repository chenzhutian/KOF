import * as ts from 'typescript';
import * as babel from 'babel-standalone';

// import _ from 'lodash';
// // import process from 'process';
// import platform from 'platform';
// /* global window */

// // const benchmark = require('benchmark');
// import * as benchmark from 'benchmark';

// const Benchmark = benchmark.runInContext({ _, platform });
// if (typeof window === 'object') window.Benchmark = Benchmark;

import Benchmark from '../../services/benchmark';

export default {
    name: 'hello',
    data() {
        return {
            runners: [{
                title: 'for-loop',
                code: 'for(let i = 0; i < 100; ++i) Math.log(i);',
            }, {
                title: 'forEach-loop',
                code: 'Array(100).forEach((d,i)=>Math.log(i));',
            }],
            newRunner: { title: '', code: '' },
            running: false,
            resultStat: '',
        };
    },
    methods: {
        addRunner() {
            this.runners.push(this.newRunner);
            this.newRunner = { title: '', code: '' };
        },
        removeRunner(index) {
            this.runners.splice(index, 1);
        },
        removeUseStrict(src) {
            return src.replace('"use strict";', '');
        },
        tsParser(src) {
            const code = ts.transpileModule(src, {
                compilerOptions: {
                    target: ts.ScriptTarget.ES5,
                },
            }).outputText;
            return this.removeUseStrict(code);
        },
        babelParser(src) {
            const code = babel.transform(src, { presets: ['es2015'] }).code;
            return this.removeUseStrict(code);
        },
        run() {
            const suite = new Benchmark.Suite();
            this.running = true;
            const self = this;
            // add tests
            this.runners.forEach((runner, idx) => {
                if (runner) {
                    let code = this.tsParser(runner.code);
                    suite.add(`ts:${runner.title}`, () => code, { id: `${idx}_ts` });
                    code = this.babelParser(runner.code);
                    suite.add(`ts:${runner.title}`, () => code, { id: `${idx}_babel` });
                }
            });
            // add listeners
            suite
                .on('cycle', (event) => {
                    const target = event.target;
                    const id = target.id.split('_')[0];
                    const parser = target.id.split('_')[1];
                    this.runners[id].info += `${parser}_${String(target)}`;
                })
                .on('complete', function () {
                    self.resultStat = `Fastest is ${this.filter('fastest').map('name')}`;
                    self.running = false;
                })
                // run async
                .run({
                    async: true,
                });
        },
    },
};
