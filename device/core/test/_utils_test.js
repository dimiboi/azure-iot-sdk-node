// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');
var getUserAgentString = require('../lib/utils').getUserAgentString;
var getCustomUserAgentString = require('../lib/utils').getCustomUserAgentString;
var core = require('azure-iot-common');
var packageJson = require('../package.json');

describe('getUserAgentString', function() {
  var fakePlatformString = 'fakePlatformString';
  var fakeProductInfoObject = { productInfo: 'fakeProductInfo'};
  before(function() {
    sinon.stub(core, 'getAgentPlatformString').callsArgWith(0, fakePlatformString);
  });

  after(function() {
    core.getAgentPlatformString.restore();
  });

  /*Codes_SRS_NODE_DEVICE_UTILS_18_001: [`getUserAgentString` shall call `getAgentPlatformString` to get the platform string.]*/
  /*Codes_SRS_NODE_DEVICE_UTILS_18_002: [`getUserAgentString` shall call its `callback` with a string in the form 'azure-iot-device/<packageJson.version>(<platformString>)'.]*/
  it ('returns the right string', function(callback) {
    getUserAgentString(function(actualAgentString) {
      assert.equal(actualAgentString, 'azure-iot-device/' + packageJson.version + ' (' + fakePlatformString + ')');
      callback();
    });
  });
  
  
});


describe('getCustomUserAgentString', function() {
  var fakePlatformString = 'fakePlatformString';
  var fakeProductInfoString = 'fakeProductInfoString';
  before(function() {
    sinon.stub(core, 'getAgentPlatformString').callsArgWith(0, fakePlatformString);
  });

  after(function() {
    core.getAgentPlatformString.restore();
  });

  it('does not populate productInfo if it wasn\'t given', function () {
    ['', null, undefined].forEach(function (falsyValue) {
      getCustomUserAgentString(falsyValue, function(actualAgentString) {
        assert.equal(actualAgentString, 'azure-iot-device/' + packageJson.version + ' (' + fakePlatformString + ')');
      });
    });
  });
  
  it('returns the right string with productInfo', function(callback) {
    getCustomUserAgentString(fakeProductInfoString, function(actualAgentString) {
      assert.equal(actualAgentString, 'azure-iot-device/' + packageJson.version + ' (' + fakePlatformString + ')' + fakeProductInfoString);
      callback();
    });
  });
  
  it.only('throws on wrong type for productInfo', function() {
    // TODO: Implement this with a bunch of parameters.
    // Go through the code and look for []
    [41, [5, 1], {test: 'test'}].forEach(function (badValue) {
      assert.throws( function() {
        getCustomUserAgentString(badValue, function(actualAgentString) {
          console.log(actualAgentString);
        });
      });
    });
  });
  




})







