#!/usr/bin/env node
'use strict';

var cli = require('./lib');

if (require.main === module) {
  cli.run();
}

module.exports = cli;