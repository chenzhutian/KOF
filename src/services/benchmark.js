import _ from 'lodash';
import platform from 'platform';
import * as benchmark from 'benchmark';
/* global window */

const Benchmark = benchmark.runInContext({ _, platform });
if (typeof window === 'object') window.Benchmark = Benchmark;

export default Benchmark;
