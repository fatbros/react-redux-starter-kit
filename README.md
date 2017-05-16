# React Redux Starter Kit

[![Build Status](https://travis-ci.org/davezuko/react-redux-starter-kit.svg?branch=master)](https://travis-ci.org/davezuko/react-redux-starter-kit?branch=master)
[![dependencies](https://david-dm.org/davezuko/react-redux-starter-kit.svg)](https://david-dm.org/davezuko/react-redux-starter-kit)
[![devDependency Status](https://david-dm.org/davezuko/react-redux-starter-kit/dev-status.svg)](https://david-dm.org/davezuko/react-redux-starter-kit#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This starter kit is designed to get you up and running with a bunch of awesome new front-end technologies, all on top of a powerful build system based on webpack.

The primary goal of this project is to give you a stable foundation. Its purpose is not to dictate your project structure or to demonstrate a complete sample application, but to provide a set of tools intended to make front-end development robust, easy, and, most importantly, fun. Check out the full feature list below!

Finally, This project wouldn't be possible without the help of our many contributors, so [thank you](#thank-you) for all of your help.

## Table of Contents
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Project Structure](#project-structure)
1. [Developer Tools](#developer-tools)
1. [Routing](#routing)
1. [Testing](#testing)
1. [Deployment](#deployment)
1. [Build System](#build-system)
1. [Learning Resources](#learning-resources)
1. [FAQ](#troubleshooting)
1. [Thank You](#thank-you)

## Requirements
* node `^5.0.0`
* yarn `^0.17.0` or npm `^3.0.0`

## Getting Started

After confirming that your local environment meets the above [requirements](#requirements), you can create a new project based on `react-redux-starter-kit` by doing the following:

```bash
$ git clone https://github.com/davezuko/react-redux-starter-kit.git <my-project-name>
$ cd <my-project-name>
```

Then install dependencies and check to see it works. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management, but `npm install` will work as well.

```bash
$ yarn install # Install project dependencies (or `npm install`)
$ yarn start   # Compile and launch (or `npm start`)
```
If everything works, you should see the following:

<img src="http://i.imgur.com/Kk2qTHC.png" />

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`yarn run <script>`|Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:3000`.|
|`compile`          |Compiles the application to disk.|
|`test`             |Runs unit tests with Karma and generates a coverage report.|
|`test:watch`       |Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`           |Runs linter, tests, and then, on success, compiles your application to disk.|
|`lint`             |Lint the project.|
|`lint:fix`         |Lint the project and fix all correctable errors. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Project Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications. If you wish to read more about this pattern, please check out this [awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
.
├── build                    # All build-related code
├── config                   # Project and build configurations
├── public                   # Static public assets (not imported anywhere in source code)
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Global Reusable Components
│   ├── containers           # Global Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   │   └── PageLayout       # Global application layout in which to render routes
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   ├── Home             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   └── routes **    # Fractal sub-routes (** optional)
│   │   └── Counter          # Fractal route
│   │       ├── index.js     # Counter route definition
│   │       ├── container    # Connect components to actions and store
│   │       ├── modules      # Collections of reducers/constants/actions
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```

## Developer Tools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn’t require installing any packages.

However, it's easy to bundle these developer tools locally should you choose to do so. First, grab the packages from npm:

```bash
yarn add --dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```

Then follow the [manual integration walkthrough](https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md).

## Routing
We use `react-router` [route definitions](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

## Testing
To add a unit test, create a `.spec.js` file anywhere inside of `./tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them. Coverage reports will be compiled to `./coverage` by default.

## Deployment
Out of the box, this starter kit is deployable by serving the `./dist` folder generated by `npm run deploy` (make sure to specify your target `NODE_ENV` as well). This project does not concern itself with the details of server-side rendering or API structure, since that demands an opinionated structure that makes it difficult to extend the starter kit. However, if you do need help with more advanced deployment strategies, here are a few tips:

## Static Deployments
If you are serving the application via a web server such as nginx, make sure to direct incoming route requests to the root `./dist/index.html` file and let react-router take care of the rest. If you are unsure of how to do this, you might find [this documentation](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server) helpful. The Express server that comes with the starter kit is able to be extended to serve as an API and more, but is not required for a static deployment.

## Thank You

This project wouldn't be possible without help from the community, so I'd like to highlight some of its biggest contributors. Thank you all for your hard work, you've made my life a lot easier and taught me a lot in the process.

* [Justin Greenberg](https://github.com/justingreenberg) - For all of your PR's, getting us to Babel 6, and constant work improving our patterns.
* [Roman Pearah](https://github.com/neverfox) - For your bug reports, help in triaging issues, and PR contributions.
* [Spencer Dixon](https://github.com/SpencerCDixon) - For your creation of [redux-cli](https://github.com/SpencerCDixon/redux-cli).
* [Jonas Matser](https://github.com/mtsr) - For your help in triaging issues and unending support in our Gitter channel.

And to everyone else who has contributed, even if you are not listed here your work is appreciated.
