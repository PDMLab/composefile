'use strict';
const path = require('path');
const writeYaml = require('write-yaml');

/**
 * @param {Object} options
 * @param {String} options.outputPath
 * @param {Object} options.services
 * @param {Object} options.networks
 * @param {Object} options.volumes
 * @param {function} continueWith
 */
const createNewComposeFile = function (options, continueWith) {
  const outputPath = options.outputPath;
  const services = options.services;
  const networks = options.networks;
  const volumes = options.volumes;
  const data = { version: '2' };

  if (services) {
    data.services = services;
  }

  if (networks) {
    data.networks = networks;
  }

  if (volumes) {
    data.volumes = volumes;
  }
  writeYaml(outputPath, data, continueWith);
};

/**
 * @param {Object} options
 * @param {String} options.templatePath
 * @param {String} options.outputFolder
 * @param {String} options.filename
 * @param {Object} options.services
 * @param {Object} options.networks
 * @param {Object} options.volumes
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
  const networks = options.networks;
  const volumes = options.volumes;
  const templatePath = options.templatePath;

  if (!templatePath) {
    createNewComposeFile({ outputPath, services, networks, volumes }, continueWith);
  }
};

module.exports = createComposeFile;
