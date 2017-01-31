import * as ts from 'typescript';
import _ from 'lodash';
import process from 'process';

const benchmark = require('benchmark');

const Benchmark = benchmark.runInContext({ _, process });
window.Benchmark = Benchmark;

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
            running: false,
            resultStat: '',
        };
    },
    methods: {
        removeRunner(index) {
            this.runners.splice(index, 1);
        },
        tsParser(src) {
            const code = ts.transpileModule(src, {
                compilerOptions: {
                    target: ts.ScriptTarget.ES5,
                },
            }).outputText;
            return code.replace('"use strict";', '');
        },
        run() {
            const suite = new Benchmark.Suite();
            this.running = true;
            const self = this;
            // add tests
            this.runners.forEach((runner, idx) => {
                if (runner) {
                    const code = this.tsParser(runner.code);
                    suite.add(runner.title, () => code, { id: idx });
                }
            });
            // add listeners
            suite
                .on('cycle', (event) => {
                    const target = event.target;
                    this.runners[target.id].info = String(event.target);
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
