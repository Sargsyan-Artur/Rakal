# Release notes

## 0.1.4 - 2021-12-16

### Fixed

* randexp package moved to `dependencies`

## 0.1.3 - 2021-12-16

### Added

* functions `generateNumericString`, `generateAlphabeticsString`, `generateAlphanumericString` for generating strings
* function `getObjectWithoutProperty` deletes property from object

## 0.1.2 - 2021-11-29

### Added

* `setEnvVarFromCli` fn for creating env var based on passed cli param

## 0.1.1 - 2021-11-24

### Fixed

* api for getting current env-data and test-data

## 0.1.0 - 2021-11-19

### Added

* feature for forking with nested objects in constants
* logic for working with environment: cli: `--testenv` & `--testurl`. Env var: `TEST_ENV` & `TEST_URL`
* [EXPERIMENTAL] `main` property for marking the testable service.
  E.g.: if either `--testurl` or `TEST_URL` passed, the URL will be changed for this service.

## 0.0.9 - 2021-11-11

### Fixed

* README

## 0.0.8 - 2021-11-10

### Fixed

* overwrite logic in memory helper

## 0.0.7 - 2021-11-10

### Fixed

* publish process

## 0.0.6 - 2021-11-09

### Added

* Generic type to `valueParser` fn.

## 0.0.5 - 2021-11-05

### Added

* Changed valueParser() returned type from unknown to any

## 0.0.3 - 0.0.4 - 2021-11-05

### Fixed

* publish process

## 0.0.2 - 2021-11-05

### Added

* Changed delimiter from $ to #$
* Changed delimiter from $$ to #$$
* Changed returned type for memory.get() from unknown to any

## 0.0.1 - 2021-11-02

### Added

* Official release
