{
  "name": "frontend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "tests"
  },
  "dependencies": {
    "babel-cli": "^6.24.1",
    "babel-core": "^6.25.0",
    "babel-plugin-module-resolver": "^2.7.1",
    "babel-polyfill": "^6.23.0",
    "babel-preset-env": "^1.6.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "ejs": "^2.5.7",
    "express": "^4.15.3"
  },
  "devDependencies": {
    "eslint": "^4.3.0",
    "eslint-config-airbnb": "^15.1.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^6.0.2",
    "eslint-plugin-react": "^7.1.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "babel-node index.js"
  },
  "author": "",
  "license": "ISC",
  "babel": {
    "presets": [
      "react",
      "env",
      "stage-3"
    ],
    "plugins": [
      [
        "module-resolver",
        {
          "root": [
            "./client",
            "./lib"
          ],
          "alias": {}
        }
      ]
    ]
  }
}
