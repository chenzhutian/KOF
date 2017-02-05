import _ from 'lodash';
import platform from 'platform';
/* global window */

import * as benchmark from 'benchmark';

const Benchmark = benchmark.runInContext({ _, platform });
if (typeof window === 'object') window.Benchmark = Benchmark;

export default Benchmark;
