# lib Folder

This directory is used to integrate npm packages/libraries into the application.

Set up packages/libraries configuration here.

## Convention

All integrations should export and import into `index.js` file. Other modules will use the integration by strictly importing from the `lib` module.

The file name must be the package/library name. If we encounter duplicate names, please notify your Team Leader/Manager for solution.

- `lib/<<package_name>>.js`

## Example

`express.js` file:
```
const express = require('express');

const app = express();

module.exports = app;
```

`index.js` file:
```
const app = require("./express");

exports.app = app;
```

Other modules:
```
const { app } = require("./lib");
```
