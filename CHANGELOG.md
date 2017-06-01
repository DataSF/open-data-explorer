# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/)

## Unreleased

## [v1.0.0-alpha.4](https://github.com/DataSF/open-data-explorer/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) - 2017-02-10

### Added
- [274](https://github.com/DataSF/open-data-explorer/pull/274) - Allow users to search datasets from navigation bar

### Changed
- [267](https://github.com/DataSF/open-data-explorer/pull/267) - Refactor algolia search to use react-instantsearch
- [272](https://github.com/DataSF/open-data-explorer/pull/272) - Improve server failure error message, remove unique IDs and geo fields from selectable columns
- [291](https://github.com/DataSF/open-data-explorer/pull/291) - Improve column selector user interaction, restyle options panel
- [292](https://github.com/DataSF/open-data-explorer/pull/292) - Refactor build and test suite based on Create React App
- [298](https://github.com/DataSF/open-data-explorer/pull/298) - Swap in new metadata API to load data about datasets, replaces direct calls to Socrata's views.json
- [302](https://github.com/DataSF/open-data-explorer/pull/302) - Modify getSelectableColumns() to return all columns with flag to support field details feature
- [303](https://github.com/DataSF/open-data-explorer/pull/303) - Upgrade to webpack2

### Fixed
- [259](https://github.com/DataSF/open-data-explorer/pull/259) - Fixes a number of display bugs in charts
- [264](https://github.com/DataSF/open-data-explorer/pull/264) - Fix any/all switch on checkboxes, fix numeric filter types, fix multi-select
- [268](https://github.com/DataSF/open-data-explorer/pull/268) - Fix chart display on group by and formatting related to grouped data
- [272](https://github.com/DataSF/open-data-explorer/pull/272) - Fix call stack errors by clearing out legacy code
- [273](https://github.com/DataSF/open-data-explorer/pull/273) - Remove group by option on histogram
- [301](https://github.com/DataSF/open-data-explorer/pull/301) - Interpolate missing dates to represent continuous ranges on timeseries charts

## [v1.0.0-alpha.3](https://github.com/DataSF/open-data-explorer/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) - 2017-02-10

### Added
- [210](https://github.com/DataSF/open-data-explorer/pull/210) - Present server error messages to the user
- [232](https://github.com/DataSF/open-data-explorer/pull/232) - Show filtered options under the chart title (as text)
- [234](https://github.com/DataSF/open-data-explorer/pull/234) - Add rollup for data with long tails

### Changed
- [220](https://github.com/DataSF/open-data-explorer/pull/220) - Load column definitions from field definition dataset
- [233](https://github.com/DataSF/open-data-explorer/pull/233) - Add quick filters and sort to column details, simplify column card components

### Fixed
- [222](https://github.com/DataSF/open-data-explorer/pull/222) - Fix download/api button layout
- [224](https://github.com/DataSF/open-data-explorer/pull/224) - Fix chart axis labeling issues
- [228](https://github.com/DataSF/open-data-explorer/pull/228) - Fix issues related to accessing data via API for geographic datasets
- [230](https://github.com/DataSF/open-data-explorer/pull/230) - Fix chart flickering issues related to component lifecycle

## [v1.0.0-alpha.2](https://github.com/DataSF/open-data-explorer/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) - 2016-12-09

### Added

### Changed

### Fixed

## [v1.0.0-alpha.1](https://github.com/DataSF/open-data-explorer/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) - 2016-10-25

### Added

### Changed

### Fixed

## [v1.0.0-alpha.0](https://github.com/DataSF/open-data-explorer/compare/init...v1.0.0-alpha.0) - 2016-09-07

This is our "hello world" release

### Added

- Implemented Karma + Mocha + Enzyme for testing framework
- Set up standardjs and linter
- Configured Travis CI for autodeployment
- Set up initial folder structure
- Implemented redux for state management
- Can search catalog
- Can chart datasets with group by, filtering, and aggregation
- Can view a list of fields in the dataset
- Can view an overview about the dataset
- Can view a table preview of the data
- Can download data and open API docs
- Began semantic versioning



