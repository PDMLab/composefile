'use strict';
const assert = require('assert');
const async = require('async');
const composeFile = require('../');
const fs = require('fs');
const path = require('path');
const yamlParser = require('parser-yaml');

describe('Compose file', () => {
  beforeEach(done => {
    async.parallel([
      awaits => {
        fs.unlink(path.join(__dirname, 'docker-compose.yml'), awaits);
      },
      awaits => {
        fs.unlink(path.join(__dirname, 'custom-docker-compose.yml'), awaits);
      }
    ], err => { // eslint-disable-line
      done();
    });
  });

  describe('When being created without services', () => {
    it('should contain version 2', done => {
      composeFile({ outputFolder: __dirname }, err => { // eslint-disable-line
        yamlParser.parseFile(path.join(__dirname, 'docker-compose.yml'), (errParse, yaml) => {
          assert.equal(yaml.version, '2');
          assert.equal(yaml.services, null);
          done(errParse);
        });
      });
    });
  });

  describe('When being created with services', () => {
    it('should contain services', done => {
      const services = {
        nginx: {
          image: 'nginx:latest',
          ports: [ '8080:8080' ]
        },
        app: {
          build: '../app',
          ports: [ '80:80' ]
        }
      };

      composeFile({ outputFolder: __dirname, services }, err => { // eslint-disable-line
        yamlParser.parseFile(path.join(__dirname, 'docker-compose.yml'), (errParse, yaml) => {
          assert.equal(yaml.services.nginx.image, 'nginx:latest');
          assert.equal(yaml.services.nginx.ports, '8080:8080');
          assert.equal(yaml.services.app.build, '../app');
          assert.equal(yaml.services.app.ports, '80:80');
          done(errParse);
        });
      });
    });
  });

  describe('When being created with networks', () => {
    it('should contain networks', done => {
      const networks = {
        outside: {
          external: true
        }
      };

      composeFile({ outputFolder: __dirname, networks }, err => { // eslint-disable-line
        yamlParser.parseFile(path.join(__dirname, 'docker-compose.yml'), (errParse, yaml) => {
          assert.equal(yaml.networks.outside.external, true);
          done(errParse);
        });
      });
    });
  });

  describe('When being created with volumes', () => {
    it('should contain volumes', done => {
      const volumes = {
        data: {
          external: true
        }
      };

      composeFile({ outputFolder: __dirname, volumes }, err => { // eslint-disable-line
        yamlParser.parseFile(path.join(__dirname, 'docker-compose.yml'), (errParse, yaml) => {
          assert.equal(yaml.volumes.data.external, true);
          done(errParse);
        });
      });
    });
  });

  describe('When being created with custom filename', () => {
    it('should be created at custom filename', done => {
      composeFile({ outputFolder: __dirname, filename: 'custom-docker-compose.yml' }, err => { // eslint-disable-line
        yamlParser.parseFile(path.join(__dirname, 'custom-docker-compose.yml'), (errParse, yaml) => {
          assert.equal(yaml.version, '2');
          assert.equal(yaml.services, null);
          done(errParse);
        });
      });
    });
  });
});

