# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/)

## Unreleased

## [v1.0.0-beta.1](https://github.com/DataSF/open-data-explorer/compare/v1.0.0-beta.0...v1.0.0-beta.1) - 2017-08-30

### Changed

- [#434](https://github.com/DataSF/open-data-explorer/pull/434) - Swap in secure endpoint for metadata api

## [v1.0.0-beta.0](https://github.com/DataSF/open-data-explorer/compare/v1.0.0-alpha.5...v1.0.0-beta.0) - 2017-08-30

### Added

- [#359](https://github.com/DataSF/open-data-explorer/pull/359) - Added related datasets to the overview page
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - Change the title of the page based on the route, implemented on all the primary route components [<tt>5f5f6b0</tt>](https://github.com/DataSF/open-data-explorer/commit/5f5f6b033814d35bf5e04a909e8d279bf883d019)
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - Added an informative message to the autosuggest search when the terms return no results, removed the pagination when there were no extra pages, did not add an additional message to the catalog as the implementation was causing some performance issues [<tt>d0a1708</tt>](https://github.com/DataSF/open-data-explorer/commit/d0a170875ec3872ccce75eb674bb5b43b3f5dc0e)
- [#401](https://github.com/DataSF/open-data-explorer/pull/401) - Added google analytics event tracking middleware, implemented event tracking for link sharing, downloads, and UI interactions on the chart configuration
- [#403](https://github.com/DataSF/open-data-explorer/pull/403) - Added simple context to home page
- [#411](https://github.com/DataSF/open-data-explorer/pull/411) - Added color picker option for single dimension charts

### Changed

- [#359](https://github.com/DataSF/open-data-explorer/pull/359) - Changed the layout and design of the dataset overview page
- [#360](https://github.com/DataSF/open-data-explorer/pull/360) - Moved link sharing into a modal popup
- [#377](https://github.com/DataSF/open-data-explorer/pull/377) - Refactored field selector for greater code reuse
- [#377](https://github.com/DataSF/open-data-explorer/pull/377) - Made styling consistent between field definition and chart configuration field selectors
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - Load search record into metadata state and introduces loading notice on dataset (when coming directly to dataset) [<tt>a24a218</tt>](https://github.com/DataSF/open-data-explorer/commit/a24a2180970b207577aa8d0f6bebb850a1d61b19) [<tt>030bd9b</tt>](https://github.com/DataSF/open-data-explorer/commit/030bd9bd6743603f091a1cfb5bbc3146f4bde081) [<tt>7b3e99b</tt>](https://github.com/DataSF/open-data-explorer/commit/7b3e99b3a62e0ff789b6a5bfe1d455cd153f62f9) [<tt>22cf723</tt>](https://github.com/DataSF/open-data-explorer/commit/22cf7230ea179b4a78320f26b64f0c3508c9155b) [<tt>a5b2724</tt>](https://github.com/DataSF/open-data-explorer/commit/a5b27242a37a7115b55de7693152bcdbd00ad82d) 
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - removes related datasets component when 0 related datasets [<tt>b30484f</tt>](https://github.com/DataSF/open-data-explorer/commit/b30484f8e40de8a864bd0e4ee1bc02dede6dfcda)
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - Broke description text with \n\n into `<p>` [<tt>64d5358</tt>](https://github.com/DataSF/open-data-explorer/commit/64d535899fde724acf125b3b76464acf89721386)
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - Updated the messages for no chart data and only zeroes to use the messages reducer and component, bringing these into consistency with messaging in other parts of the app [<tt>cbb82f9</tt>](https://github.com/DataSF/open-data-explorer/commit/cbb82f925ffd855d335871139d82a72f1f849dfb)
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - Remove chosen filters from filter pick list [<tt>5384e8a</tt>](https://github.com/DataSF/open-data-explorer/commit/5384e8aa6f604975d06248357de26fc4c0ea300a)
- [#387](https://github.com/DataSF/open-data-explorer/pull/387) - Made multiple cosmetic changes to the field definitions section
- [#393](https://github.com/DataSF/open-data-explorer/pull/393) - Replaces existing date range picker with pure react component, including calendar range selector, quick range selector, and text input [<tt>2b6e458</tt>](https://github.com/DataSF/open-data-explorer/commit/2b6e458c0e030067799fb365d8bb0a428c8960a2) [<tt>e2cc8b8</tt>](https://github.com/DataSF/open-data-explorer/commit/e2cc8b80a93e8c3e3eb3051d0af4e77aa790a4ee) [<tt>414fd03</tt>](https://github.com/DataSF/open-data-explorer/commit/414fd0335950f6a4cbb7259e3d159ae8b6d92d2e)
- [#393](https://github.com/DataSF/open-data-explorer/pull/393) - Removes old date range related dependencies [<tt>459bbb0</tt>](https://github.com/DataSF/open-data-explorer/commit/459bbb01584f50d2b1735447d0832fbabbb4f911) 
- [#393](https://github.com/DataSF/open-data-explorer/pull/393) - Removes the jquery dependency reducing the bundle by 30kb compressed [<tt>9870c52</tt>](https://github.com/DataSF/open-data-explorer/commit/9870c52a46a8d84dce1f2f4e884ff581a4f5490a)
- [#400](https://github.com/DataSF/open-data-explorer/pull/400) - Refactored charts code to run calculations as selectors colocated with the reducers
- [#400](https://github.com/DataSF/open-data-explorer/pull/400) - Added a message to the subtitle to indicate to the user when rollups were applied
- [#403](https://github.com/DataSF/open-data-explorer/pull/403) - Related datasets now sorted by name
- [#409](https://github.com/DataSF/open-data-explorer/pull/409) - Allow numeric field types to display in bar charts
- [#409](https://github.com/DataSF/open-data-explorer/pull/409) - Change metadata API endpoint to metadata.datasf.org
- [#409](https://github.com/DataSF/open-data-explorer/pull/409) - Exclude year fields from summable options
- [#409](https://github.com/DataSF/open-data-explorer/pull/409) - Load data notes to dataset overview from algolia search index when clicking from search
- [#410](https://github.com/DataSF/open-data-explorer/pull/410) - Changed the layout of charts to have consistent styling and alignment across options, including moving the legend to the right
- [#410](https://github.com/DataSF/open-data-explorer/pull/410) - Checking isCategory prop instead of existence of categories prop, which means the field selection options load as soon as the field details API returns instead of waiting for each column to be profiled for categories. Later, we'll introduce just in time return of these categories on adding a filter or doing a group by [<tt>a9386e9</tt>](https://github.com/DataSF/open-data-explorer/commit/a9386e907cdd30e859564ae66e8b9ef3b81469d0)
- [#410](https://github.com/DataSF/open-data-explorer/pull/410) - Using the viewport height to resize the chart height so it can take advantage of the full screen real estate
- [#411](https://github.com/DataSF/open-data-explorer/pull/411) - Default to a single color ramp across chart types
- [#412](https://github.com/DataSF/open-data-explorer/pull/412) - Fix broken link sharing, switch to library `qs` for query string parsing and encoding
- []() - Move navigation bar search to the right

### Fixed

- [#358](https://github.com/DataSF/open-data-explorer/pull/358) - Refactored selectable fields in chart configuration to include the right ones
- [#358](https://github.com/DataSF/open-data-explorer/pull/358) - Fixed an issue where all options were still applied when clearing the selected column, now clearing a selected column resets the query state completely
- [#358](https://github.com/DataSF/open-data-explorer/pull/358) - Fixed issue where selector dropdowns were displaying underneath other components
- [#358](https://github.com/DataSF/open-data-explorer/pull/358) - Fixed an issue with the input range slider so it will accept empty input and negative numbers
- [#358](https://github.com/DataSF/open-data-explorer/pull/358) - Fixed an issue where all options were still applied when clearing the selected column, now clearing a selected column resets the query state completely
- [#358](https://github.com/DataSF/open-data-explorer/pull/358) - Fixed an issue related to geometry fields being treated like categories
- [#358](https://github.com/DataSF/open-data-explorer/pull/358) - Fix filterable fields - modified `getSelectableColumns()` with an option to ignore type filters called `ignoreTypeFilters`
- [#360](https://github.com/DataSF/open-data-explorer/pull/360) - Reset state for Table, Query and Metadata when loading a new dataset
- [#377](https://github.com/DataSF/open-data-explorer/pull/377) - Fixed issue where type filters were not clearing out when moving between datasets
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - Fixed broken file attachment links [<tt>7f2a133</tt>](https://github.com/DataSF/open-data-explorer/commit/7f2a1330b70573bc0dc95d19b1347da9d4c27ccc)
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - Fixed issue where selecting a catalog facet would jump the page to the search bar [<tt>3db88c8</tt>](https://github.com/DataSF/open-data-explorer/commit/3db88c85361912f3b90855e8108d6c6665ac3bd3) 
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - Removed `Promise.all()` from `fetchRelatedDatasets` in `actions\index.js` to address an issue where this call was blocking other async calls and causing unnecessary dataset loading delays
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - Fixed an issue where boolean fields weren't being output in the table [<tt>732149a</tt>](https://github.com/DataSF/open-data-explorer/commit/732149ae1d2a2cc871f912a90d88cc01676ac94c)
- [#384](https://github.com/DataSF/open-data-explorer/pull/384) - Fixed issue where sharing a chart with time filters would crash the chart, addresses related issues where the hideShow button wouldn't be initially instantiated when viewing a shared URL [<tt>83fac92</tt>](https://github.com/DataSF/open-data-explorer/commit/83fac927fb55dcab94760eb1edeb59f983205e5d)
- [#393](https://github.com/DataSF/open-data-explorer/pull/393) - Fixed an issue where selected field was not showing up in filterable list [<tt>40528cc</tt>](https://github.com/DataSF/open-data-explorer/commit/40528cc5314201a745ab9bb0966922c5c0d1d6bb)
- [#393](https://github.com/DataSF/open-data-explorer/pull/393) - The add filter fields selector no longer removes fields filtered out earlier in the field selector [<tt>b1be95a</tt>](https://github.com/DataSF/open-data-explorer/commit/b1be95a237fea24e5c089a98face1960081c3bd3)
- [#393](https://github.com/DataSF/open-data-explorer/pull/393) - The field selector filter list input now keeps the entered filter text between hiding and showing the filter list [<tt>b1be95a</tt>](https://github.com/DataSF/open-data-explorer/commit/b1be95a237fea24e5c089a98face1960081c3bd3)
- [#400](https://github.com/DataSF/open-data-explorer/pull/400) - Fixed an issue where bar charts were breaking when filtering to a single value on the same field being grouped
- [#400](https://github.com/DataSF/open-data-explorer/pull/400) - Fixed an issue where blank (null) values were not showing when grouping
- [#400](https://github.com/DataSF/open-data-explorer/pull/400) - Fixed an issue where y-axis ranges weren't being recalcuated when switching chart types (e.g. when stacking data)
- [#400](https://github.com/DataSF/open-data-explorer/pull/400) - Fixed an intermittent issue where the chart would resize incorrectly when switching parameters
- [#400](https://github.com/DataSF/open-data-explorer/pull/400) - Fixed a data render issue where the charts would draw in 2 sections
- [#400](https://github.com/DataSF/open-data-explorer/pull/400) - Fixed an issue where the upper range of the y-axis wasn't being calculated properly
- [#400](https://github.com/DataSF/open-data-explorer/pull/400) - Fixed an issue where the show all/roll up buttons weren't working
- [#403](https://github.com/DataSF/open-data-explorer/pull/403) - Fixed issue where newlines weren't converting to paragraphs when loading from algolia search index
- [#403](https://github.com/DataSF/open-data-explorer/pull/403) - Fixed unnecessary render calls to dataset overview
- [#403](https://github.com/DataSF/open-data-explorer/pull/403) - Fixed an issue where related datasets wouldn't render if any had missing descriptions
- [#403](https://github.com/DataSF/open-data-explorer/pull/403) - Fixed issue where created and updated datetime stamps weren't being interpretted to local time
- [#409](https://github.com/DataSF/open-data-explorer/pull/409) - Remove line or area options when selecting a numeric field type
- [#409](https://github.com/DataSF/open-data-explorer/pull/409) - Fixed an issue where data with very large summed domains (like budget) was not displaying on charts
- [#410](https://github.com/DataSF/open-data-explorer/pull/410) - Fixed an issue where `ChartExperimentalCanvas.jsx` was attempting to find a node that didn't exist on a resize event because it was unmounted before the function could run [<tt>96f6559</tt>](https://github.com/DataSF/open-data-explorer/commit/96f6559f65a4f7d0dc858850013473ec0b60f04a)
- [#410](https://github.com/DataSF/open-data-explorer/pull/410) - Now passing in the label of the summed column to the axes [<tt>7b8b594</tt>](https://github.com/DataSF/open-data-explorer/commit/7b8b594fde0b92dd90287b82f7eb63c295a89665) [<tt>f613448</tt>](https://github.com/DataSF/open-data-explorer/commit/f61344898c76efd1fddb992148e9dbd0f0727f40)
- 


## [v1.0.0-alpha.5](https://github.com/DataSF/open-data-explorer/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) - 2017-07-24

### Added

-   [#311](https://github.com/DataSF/open-data-explorer/pull/311) - Adds a feedback button in preparation for beta feedback
-   [#315](https://github.com/DataSF/open-data-explorer/pull/315) - Add google analytics pageview monitoring
-   [#331](https://github.com/DataSF/open-data-explorer/issues/331 "Add Top 10 Categories for Text Fields") Add top 10 categories for text fields
-   [#341](https://github.com/DataSF/open-data-explorer/issues/341 "When rowLabel null TypeError: Cannot read property 'toLowerCase' of null") Add field types to available catalog refinements
-   [#319](https://github.com/DataSF/open-data-explorer/issues/319 "Format Dates in the Metadata Stats Table") Format dates in field definitions

### Changed


-   [#334](https://github.com/DataSF/open-data-explorer/pull/334 "more style changes; redesigns secondary navbar") [#351](https://github.com/DataSF/open-data-explorer/pull/351) - Change layout / structure of dataset pages
-   [#343](https://github.com/DataSF/open-data-explorer/pull/343 "fix browser history bug in dataset nav") [#342](https://github.com/DataSF/open-data-explorer/pull/342) [#344](https://github.com/DataSF/open-data-explorer/pull/344) - Switch to browserHistory and squash bugs related to switch
-   [#340](https://github.com/DataSF/open-data-explorer/pull/340) Change design of the catalog search to come more in line with theme
-   [#307](https://github.com/DataSF/open-data-explorer/issues/307) Change Y axis scale to take the max of the object rather than the entire graph
-   [#317](https://github.com/DataSF/open-data-explorer/issues/317) Remove dots and line smoothing on charts
-   [#348](https://github.com/DataSF/open-data-explorer/pull/348) Match catalog font to theme, add new logo icon, add additional sort options to catalog, calculate age of dataset using `moment.fromNow()`, refactor and slight style changes to filters

### Fixed

-   [#315](https://github.com/DataSF/open-data-explorer/pull/315) [#316](https://github.com/DataSF/open-data-explorer/pull/316) [#345](https://github.com/DataSF/open-data-explorer/pull/345) [#347](https://github.com/DataSF/open-data-explorer/pull/347) - Fix airbrake error monitoring to report which environment the error came from (remove dev logging)
-   [#306](https://github.com/DataSF/open-data-explorer/pull/306) - Addresses issue [#288](https://github.com/DataSF/open-data-explorer/issues/288 "Sort order bug when grouping a date/time dimension") sort order bug on timeseries charts
-   [#321](https://github.com/DataSF/open-data-explorer/issues/321) Fix format decimals on graph axis
-   [#320](https://github.com/DataSF/open-data-explorer/issues/320) Fix titles on field profiles not always showing up
-   [#329](https://github.com/DataSF/open-data-explorer/issues/329) Fix metadata title overflow
-   [#341](https://github.com/DataSF/open-data-explorer/issues/341 "When rowLabel null TypeError: Cannot read property 'toLowerCase' of null") Fix issue when rowLabel === null causing charts to break
-   [#325](https://github.com/DataSF/open-data-explorer/issues/325) Fix error in numeric slider filter where undefined was being passed instead of value
-   [#289](https://github.com/DataSF/open-data-explorer/issues/289) Fix issue with a brief chart flicker when switching between certain types of charts

## [v1.0.0-alpha.4](https://github.com/DataSF/open-data-explorer/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) - 2017-06-01

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



