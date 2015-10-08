'use strict';

var Ladda = require('ladda'),
    laddaOptions = {
        buttonStyle: 'data-style',
        buttonColor: 'data-color',
        buttonSize: 'data-size',
        spinnerSize: 'data-spinner-size',
        spinnerColor: 'data-spinner-color',
        spinnerLines: 'data-spinner-lines'
    };

function _isFunction(val) {
    return Object.prototype.toString.call(val) === '[object Function]';
}

function _result(obj, prop) {
    return _isFunction(obj[prop]) ? obj[prop].call(obj) : obj[prop];
}

function attachElClasses(el, view) {
    el.classList.add('ladda-button');

    if (view.className) {
        el.classList.add.apply(
            el.classList,
            _result(view, 'className').split(' ')
        );
    }
}

function attachElAttributes(el, view) {
    el.setAttribute('data-style', 'expand-right');

    Object.keys(laddaOptions).forEach(function(opt) {
        if (opt in view) {
            el.setAttribute(laddaOptions[opt], view[opt]);
        }
    });

    if (view.attributes) {
        Object.keys(view.attributes).forEach(function(attr) {
            el.setAttribute(attr, view.attributes[attr]);
        });
    }

    if (view.id) { el.id = _result(view, 'id'); }
}

function attachFunctions(view, ladda) {
    var origRemove = view.remove;

    view.remove = function() {
        var args = Array.prototype.slice.call(arguments);
        ladda.remove();
        return origRemove.apply(view, args);
    };

    ['start', 'setProgress', 'stop', 'toggle', 'isLoading']
        .forEach(function(fn) {
            view[fn] = function() {
                var args = Array.prototype.slice.call(arguments);
                return ladda[fn].apply(ladda, args);
            };
        });
}

module.exports = {
    mixin: function(view) {
        var el = document.createElement('button'),
            ladda;

        attachElClasses(el, view);
        attachElAttributes(el, view);
        ladda = Ladda.create(el);
        view.setElement(el);
        attachFunctions(view, ladda);
    }
};
