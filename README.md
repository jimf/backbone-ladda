# backbone-ladda

[Backbone][backbone] view mixin for [Ladda][ladda] buttons.

[![npm Version][npm-badge]][npm]
[![Build Status][build-badge]][build-status]
[![Test Coverage][coverage-badge]][coverage-result]
[![Dependency Status][dep-badge]][dep-status]

## Installation

Install using npm:

    $ npm install backbone-ladda

## Usage

__backbone-ladda__ exposes a `mixin` function for mixing Ladda button
functionality into an existing Backbone view. The view `el` will
unconditionally become a button element, and any `id`, `className`, and
`attributes` properties specified on the view will be respected. Additional
options (listed below) may be specified to configure the particular
Ladda-specific behavior of the button.

```js
var Backbone = require('backbone'),
    BackboneLadda = require('backbone-ladda');

module.exports = Backbone.View.extend({
    buttonStyle: 'slide-right',

    events: {
        click: 'onClick'
    },

    initialize: function() {
        BackboneLadda.mixin(this);
    },

    onClick: function() {
        this.start();
        setTimeout(this.stop, 2000);
    }
});
```

## Configuration

The following options may be specified when extending Backbone.View:

#### `buttonStyle` (default: 'expand-right')

Main spinner behavior. Maps to the Ladda __data-style__ option and takes all
the same values.

#### `buttonColor`

Specifies the color of the button. Maps to the Ladda __data-color__ option and
takes all the same values.

#### `buttonSize`

Specifies the size of the button. Maps to the Ladda __data-size__ option and
takes all the same values.

#### `spinnerSize`

Specifies the size of the spinner. Maps to the Ladda __data-spinner-size__
option and takes all the same values.

#### `spinnerColor`

Specifies the color of the spinner. Maps to the Ladda __data-spinner-color__
option and takes all the same values.

#### `spinnerLines`

Specifies the number of lines for the spinner. Maps to the Ladda
__data-spinner-lines__ option and takes all the same values.

## Methods

Once the mixin has been applied to the given view, the view will gain the
following methods, which are thin wrappers around a ladda instance:

#### `start()`

Start the spinner.

#### `setProgress(value)`

Display a progress bar within the button.

#### `stop()`

Stop the spinner.

#### `toggle()`

Toggle between loading/not loading states.

#### `isLoading()`

Check whether the spinner is in a loading state.

#### `remove()`

Delete the ladda instance. This method will wrap a pre-existing `remove` method
if already defined.

## Changelog

## 1.0.0 - 2015-10-09
- Initial release

## License

MIT

[build-badge]: https://img.shields.io/travis/jimf/backbone-ladda/master.svg
[build-status]: https://travis-ci.org/jimf/backbone-ladda
[npm-badge]: https://img.shields.io/npm/v/backbone-ladda.svg
[npm]: https://www.npmjs.org/package/backbone-ladda
[coverage-badge]: https://img.shields.io/coveralls/jimf/backbone-ladda.svg
[coverage-result]: https://coveralls.io/r/jimf/backbone-ladda
[dep-badge]: https://img.shields.io/david/jimf/backbone-ladda.svg
[dep-status]: https://david-dm.org/jimf/backbone-ladda
[backbone]: http://backbonejs.org/
[ladda]: http://lab.hakim.se/ladda/
