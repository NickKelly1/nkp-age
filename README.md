# @nkp/age

[![npm version](https://badge.fury.io/js/%40nkp%2Fage.svg)](https://www.npmjs.com/package/@nkp/age)
[![deploy status](https://github.com/nickkelly1/nkp-age/actions/workflows/release.yml/badge.svg)](https://github.com/nickkelly1/nkp-age/actions/workflows/release.yml)
[![known vulnerabilities](https://snyk.io/test/github/nickkelly1/nkp-age/badge.svg)](https://snyk.io/test/github/nickkelly1/nkp-age)

Get an approximate human readable number of years, months,days, hours, minutes, seconds between dates.

```ts
import { getAge } '@nkp/age';

// 1y1m2d
console.log(getAge(new Date(2021, 2, 3)));
```

## Table of contents

- [Exports](#exports)
- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [pnpm](#pnpm)
- [Publishing](#publishing)

## Exports

`@nkp/age` exports both CommonJS and ES modules.

## Installation

### npm

```sh
npm install @nkp/age
```

### yarn

```sh
yarn add @nkp/age
```

### pnpm

```sh
pnpm add @nkp/age
```

## Publishing

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
