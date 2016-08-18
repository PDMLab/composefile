# Create dynamic Docker Compose files using Node.js

`composefile` allows you to create [Docker Compose](https://docs.docker.com/compose/) (version 2) files (named `docker-compose.yml` by default) dynamically using Node.js.

## Installation

```bash
npm install --save composefile
```

## Usage

```js
const composefile = require('composefile');

const options = {
  outputFolder: __dirname,
  filename: 'custom-docker-compose.yml',
  services: {
    nginx: {
      image: 'nginx:latest',
      ports: [ '8080:8080' ]
    },
    app: {
      build: '../app',
      ports: [ '80:80' ]
    }
  },
  networks: {
    outside: {
      external: true
    }
  },
  volumes: {
    data: {
      external: true
    }
  }
};

composefile(options, err => { console.log('done'); });
```

`options.filename` is optional and defaults to `docker-compose.yml`.

The result of the above sample looks like this:

```yaml
version: '2'
services:
  nginx:
    image: 'nginx:latest'
    ports:
      - '8080:8080'
  app:
    build: ../app
    ports:
      - '80:80'
networks:
  outside:
    external: true
volumes:
  data:
    external: true
```

## Running the tests

```
npm test
```

## Want to help?

This project is just getting off the ground and could use some help with cleaning things up and refactoring.

If you want to contribute - we'd love it! Just open an issue to work against so you get full credit for your fork. You can open the issue first so we can discuss and you can work your fork as we go along.

If you see a bug, please be so kind as to show how it's failing, and we'll do our best to get it fixed quickly.

Before sending a PR, please [create an issue](https://github.com/PDMLab/composefile/issues/new) to introduce your idea and have a reference for your PR.

Also please add tests and make sure to run `npm run eslint`.

## License

MIT License

Copyright (c) 2016 PDMLab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.