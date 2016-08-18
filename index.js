'use strict';
const path = require('path');
const writeYaml = require('write-yaml');

/**
 * @param {Object} options
 * @param {String} options.outputPath
 * @param {Object} options.services
 * @param {function} continueWith
 */
const createNewComposeFile = function (options, continueWith) {
  const outputPath = options.outputPath;
  const services = options.services;
  const data = { version: '2' };

  if (services) {
    data.services = services;
  }
  writeYaml(outputPath, data, continueWith);
};

/**
 * @param {Object} options
 * @param {String} options.templatePath
 * @param {String} options.outputFolder
 * @param {String} options.filename
 * @param {Object} options.services
 * @param {function} continueWith
 */
const createComposeFile = function (options, continueWith) {
  if (typeof options === 'function') {
    continueWith = options;
    options = {};
  }

  let outputFolder = options.outputFolder;

  if (!outputFolder) {
    outputFolder = __dirname;
  }

  let filename = options.filename;

  if (!filename) {
    filename = 'docker-compose.yml';
  }

  const outputPath = path.join(outputFolder, filename);
  const services = options.services;
  const templatePath = options.templatePath;

  if (!templatePath) {
    createNewComposeFile({ outputPath, services }, continueWith);
  }
};

module.exports = createComposeFile;
