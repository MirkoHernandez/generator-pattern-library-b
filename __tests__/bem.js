'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-pattern-library-b:bem', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/bem'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
