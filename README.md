# schedule

Before coding be sure that you've installed following plugins for your IDE:

1. [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
2. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
4. [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
5. [TypeScript Import Sorter](https://marketplace.visualstudio.com/items?itemName=mike-co.import-sorter)

## Git

All branches have to be created from **develop** branch. You have to create pull request in order to merge your changes. Pushing in **master** and **develop** branch is forbidden.

Branch prefixes and commit messages:

1. **fix** - for bug fixes. Branch: **fix/responsive-layout**, commit: **fix: adapt header view for mobiles**
2. **feat** - for features. Branch: **feat/puzzle-game**, commit: **feat: implement puzzle game**
3. **chore** - for some random work e.g. modules update, change webpack configuration and so on. Branch: **chore/add-ci**, commit: **chore: add continuous integration config**

## Development

1. Run **npm ci** command in order to install dependencies (**NOTE**: not npm install).
2. Run **npm start** command to start dev-server.

## Overview

**schedule** - RS School course schedule. From the student's side, this application will allow real-time viewing of the course schedule. From the mentor's side, this application will allow you to schedule lectures and practical sessions at any time convenient for both parties.

## Getting started

1. clone this repository: [repository](https://github.com/pavelSaikov/schedule)

2. To install all dependencies use **npm ci** (**NOTE**: not npm install).

3. Run **npm start** command to start dev-server.

## Core packages

**Typescript** - JavaScript that scales.
**React (16.13.1)** - A JavaScript library for building user interfaces. We use only functional components + hooks.
**Redux (4.0.5)** - A Predictable State Container for JS.
**antd (4.6.2)** - A React UI library antd that contains a set of high quality components and demos for building rich, interactive user interfaces.
**mapbox-gl** - Mapbox GL JS is a JavaScript library that uses WebGL to render interactive maps from vector tiles and Mapbox styles.
**moment.js** - Parse, validate, manipulate, and display dates and times in JavaScript.

## Project structure

Source code of the project has been placed in ‘src’ directory which has the following structure:

- | - src
- - | - app
- - - | - common
- - - | - config
- - - | - models
- - - | - pages
- - - | - routes
- - - | - services
- - - | - store
- - | - style

**common**
All reusable components which can be reused by several features.

**config**
This folder is just container for all assets in app such as fonts, icons, images.

**models**
common constants.

**pages**
All the main components that build this application.

**routes**
Navigation configuration files: headers, default navigators configs.

**services**
Api methods for communication with back-end. Correct name for these methods is type of request (GET, POST, PATCH, DELETE ).

**store**
Redux store configuration. This is the place where reducers and thunks come in.

All these directories have ‘index.ts’ file for import needs.
