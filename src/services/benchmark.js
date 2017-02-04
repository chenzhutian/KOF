import _ from 'lodash';
import process from 'process';
// import platform from 'platform';
/* global window */

// const benchmark = require('benchmark');
import * as benchmark from 'benchmark';

const Benchmark = benchmark.runInContext({ _, process });
if (typeof window === 'object') window.Benchmark = Benchmark;

export default Benchmark;
