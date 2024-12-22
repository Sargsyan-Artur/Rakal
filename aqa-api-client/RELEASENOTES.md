# Release notes

## 1.1.3 - 2022-01-11

### Updated

-   Improve DDT types for `TExpectedResponse`

## 1.1.2 - 2022-01-11

### Updated

-   Unit tests for `AuthControllers`
-   Updated models for `AuthService`
-   Updated `login` method in `ApiClient`
-   Added `getToken` method for `AuthController`

## 1.1.1 - 2022-01-07

### Added

-   Added `updateSessionByUserId` method for `AuthController`
-   Unit tests for `updateSessionByUserId` method

## 1.1.0 - 2022-01-06

### Added

-   WEB Gateway and covered by unit tests;
-   Upd `AuthService`, added location of swagger docs

## 1.0.8 - 2022-01-04

### Added

-   Swagger documentation for: `AuthService` service;
-   Added next controllers for `AuthService`: `getThinToken`, `getFatTokenByThinToken`
-   Added next method for `ApiClient`: `setToken`
-   Updated method `login` for `ApiClient`
-   Updated documentation for: `User` service
-   Updated controller `createUser` for `UserService`
-   Added unit tests

## 1.0.7 - 2021-12-28

### Updated

-   Swagger documentation for: `MerchantService` service;
-   Update `Merchant` controller restricting create/update access for merchant user
-   Add `MerchantAdmin` controller adding create/update actions for merchant user
-   Add unit tests

## 1.0.6 - 2021-12-24

## Updated

-   Swagger documentation for: `CatalogService`, `CommerceAdapterService` services;

## 1.0.4 - 1.0.5 - 2021-12-23

## Added

-   updated `merchant` service types according to back-end changes
-   added `createMerchant` method for `MerchantController` in `MerchantHierarchyService`

## 1.0.3 - 2021-12-22

### Added

-   Added a new method into `CatalogService` and upd swagger doc;

## 1.0.0 - 2021-12-17 (Stable version)

### Updated

-   Swagger documentation for: `ProductService`, `CatalogService`, `CommerceAdapterService` services;
-   Changed naming pattern for swagger docs and type aliases;
-   Added re-export all services and controllers;

## 0.2.20 - 2021-12-16

### Updated

-   `UserService` fix for `/users` controller

## 0.2.19 - 2021-12-14

### Updated

-   `Merchnat-Hierarchy-Service` BE bug fix updates

## 0.2.18 - 2021-12-14

### Added

-   `CatalogService` service with controllers

## 0.2.17 - 2021-12-13

### Added

-   updated `merchant` service types according to back-end changes
-   Updated merchant controller url in
    1 controller
    2 unit tests fixture
    3 unit test

## 0.2.16 - 2021-12-13

### Updated

-   `BrandsController` docs

## 0.2.15 - 2021-12-10

### Added

-   added `createUser` method for `UsersController` in `UserService`

## 0.2.14 - 2021-12-10

### Added

-   added `CommerceAdapterService` service with `CategoriesAdapterController` controller;

## 0.2.13 - 2021-12-09

### Fixed

-   `existsBrand` method in `BrandsController` of `ProductService`

## 0.2.11 - 2021-12-01

### Added

-   added methods for `JobService` -> `TypeController`
-   added methods for `JobService` -> `SubTypeController`

## 0.2.10 - 2011-11-30

### Added

-   Added `User Service` with initial structure

## 0.2.9 - 2021-11-30

### Added

-   `existsBrand` method to `ProductService` -> `BrandsController`

## 0.2.8 - 2021-11-29

### Added

-   `Merchnat Hierarchy Service` added its controllers and functions
-   Added warning message for the missing path property in `extractJsonSchema` function

## 0.2.7 - 2021-11-29

### Added

-   new methods to `ProductService` -> `BrandsController`

## 0.2.6 - 2021-11-25

### Added

-   `ddt` Updated test types to support ddt approach both for negative and positive types

## 0.2.5 - 2021-11-22

### Added

-   `AuthService` service with nested controllers. Still mock version

## 0.2.4 - 2021-11-18

### Added

-   new types of test data input for DDT tests in `@types/common`

## 0.2.3 - 2021-11-17

### Added

-   New method (`deleteBrand`) in `BrandsController` of `ProductService`

## 0.2.0 - 2021-11-16

### Changed

-   usage of 'mocha' to 'jest' in `allureStep`
-   removed the base-mocha config;
-   removed `chaijs`

## 0.1.8 - 2021-11-10

### Fixed

-   publishing process on CodeBuild

## 0.1.7 - 2021-11-09

### Changed

-   approach with naming keys in services and controllers. Should be used only 'lower' case.

## 0.1.6 - 2021-11-05

### Changed

-   returned type for negative case in `BrandsController` of `ProductService`

## 0.1.5 - 2021-11-05

### Added

-   eslint + prettier

## 0.1.4 - 2021-11-04

### Fixed

-   Contract test in `ProductService`

## 0.1.3 - 2021-11-02

### Added

-   New method to `BrandsController` of `ProductService`

## 0.1.2 - 2021-11-02

### Fixed

-   Contract verification

## 0.1.1 - 2021-11-02

### Fixed

-   `allBrands` method of `BrandsController` of `ProductService`

## 0.1.0 - 2021-11-02

### Added

-   Contract testing

## 0.0.15 - 2021-11-01

### Added

-   Job service

## 0.0.2 - 0.0.10 - 2021-10-18

### Added

-   Added ts code transpiling
-   Debug
-   Readme
-   Changed the approach with cli handling

## 0.0.1 - 2021-10-17

### Added

-   Official release
