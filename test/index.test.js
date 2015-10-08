'use strict';

var $ = require('jquery'),
    Backbone = require('backbone'),
    BackboneLadda = require('../'),
    LaddaButton;

Backbone.$ = $;

LaddaButton = Backbone.View.extend({
    initialize: function() {
        BackboneLadda.mixin(this);
    }
});

describe('backbone-ladda mixin', function() {
    var subject;

    function shouldStartSpinner() {
        it('should start spinner', function() {
            expect(subject.$el.attr('data-loading')).toBeDefined();
        });

        it('should disable button', function() {
            expect(subject.$el.prop('disabled')).toBe(true);
        });
    }

    function shouldStopSpinner() {
        it('should stop spinner', function() {
            expect(subject.$el.attr('data-loading')).not.toBeDefined();
        });

        it('should enable button', function() {
            expect(subject.$el.prop('disabled')).toBe(false);
        });
    }

    beforeEach(function() {
        subject = new LaddaButton();
    });

    it('should be a button', function() {
        expect(subject.el.tagName).toBe('BUTTON');
    });

    it('should have "ladda-button" class', function() {
        expect(subject.$el.hasClass('ladda-button')).toBe(true);
    });

    it('should have data-style attribute', function() {
        expect(subject.$el.attr('data-style')).toBe('expand-right');
    });

    describe('when ladda options are specified', function() {
        var ConfiguredLaddaButton = LaddaButton.extend({
            buttonStyle: 'expand-left',
            buttonColor: '#9400d3',
            buttonSize: 'l',
            spinnerSize: 60,
            spinnerColor: '#e6e6fa',
            spinnerLines: 16
        });

        beforeEach(function() {
            subject = new ConfiguredLaddaButton();
        });

        it('should set button style', function() {
            expect(subject.$el.attr('data-style')).toBe(subject.buttonStyle);
        });

        it('should set button color', function() {
            expect(subject.$el.attr('data-color')).toBe(subject.buttonColor);
        });

        it('should set button size', function() {
            expect(subject.$el.attr('data-size')).toBe(subject.buttonSize);
        });

        it('should set spinner size', function() {
            expect(subject.$el.attr('data-spinner-size')).toBe(
                subject.spinnerSize.toString()
            );
        });

        it('should set spinner color', function() {
            expect(subject.$el.attr('data-spinner-color')).toBe(
                subject.spinnerColor
            );
        });

        it('should set spinner lines', function() {
            expect(subject.$el.attr('data-spinner-lines')).toBe(
                subject.spinnerLines.toString()
            );
        });
    });

    describe('when view defines attributes of DOM element', function() {

        describe('with strings', function() {
            var ConfiguredLaddaButton = LaddaButton.extend({
                id: 'dummy-id',
                className: 'dummy-class',
                attributes: {
                    'data-dummy-attr': 'attr-val'
                }
            });

            beforeEach(function() {
                subject = new ConfiguredLaddaButton();
            });

            it('should retain id', function() {
                expect(subject.el.id).toBe('dummy-id');
            });

            it('should retain className', function() {
                expect(subject.$el.hasClass('dummy-class')).toBe(true);
            });

            it('should retain attributes', function() {
                expect(subject.$el.attr('data-dummy-attr')).toBe('attr-val');
            });
        });

        describe('with functions', function() {
            var ConfiguredLaddaButton = LaddaButton.extend({
                id: function() { return 'dummy-id'; },
                className: function() { return 'dummy-class'; }
            });

            beforeEach(function() {
                subject = new ConfiguredLaddaButton();
            });

            it('should retain id', function() {
                expect(subject.el.id).toBe('dummy-id');
            });

            it('should retain className', function() {
                expect(subject.$el.hasClass('dummy-class')).toBe(true);
            });
        });
    });

    describe('#start', function() {

        beforeEach(function() {
            Backbone.$('body').html(subject.render().el);
            subject.start();
        });

        afterEach(function() {
            subject.remove();
        });

        it('should start spinner', function() {
            expect(subject.$el.attr('data-loading')).toBeDefined();
            expect(subject.$('.ladda-spinner').length).toBeTruthy();
        });

        it('should disable button', function() {
            expect(subject.$el.prop('disabled')).toBe(true);
        });
    });

    describe('#setProgress', function() {

        beforeEach(function() {
            Backbone.$('body').html(subject.render().el);
            subject.start();
            subject.setProgress(0.5);
        });

        afterEach(function() {
            subject.remove();
        });

        it('should display progress bar', function() {
            expect(subject.$('.ladda-progress').length).toBeTruthy();
        });
    });

    describe('#stop', function() {

        beforeEach(function() {
            Backbone.$('body').html(subject.render().el);
            subject.start();
            subject.stop();
        });

        afterEach(function() {
            subject.remove();
        });

        shouldStopSpinner();
    });

    describe('#toggle', function() {

        beforeEach(function() {
            Backbone.$('body').html(subject.render().el);
        });

        afterEach(function() {
            subject.remove();
        });

        describe('when spinner is active', function() {

            beforeEach(function() {
                subject.start();
                subject.toggle();
            });

            shouldStopSpinner();
        });

        describe('when spinner is not active', function() {

            beforeEach(function() {
                subject.toggle();
            });

            shouldStartSpinner();
        });
    });

    describe('#isLoading', function() {
        var returned;

        beforeEach(function() {
            Backbone.$('body').html(subject.render().el);
        });

        describe('when spinner is active', function() {

            beforeEach(function() {
                subject.start();
                returned = subject.isLoading();
            });

            it('should return true', function() {
                expect(returned).toBe(true);
            });
        });

        describe('when spinner is not active', function() {

            beforeEach(function() {
                returned = subject.isLoading();
            });

            it('should return false', function() {
                expect(returned).toBe(false);
            });
        });
    });

    describe('#remove', function() {

        beforeEach(function() {
            Backbone.$('body').html(subject.render().el);
            subject.start();
            subject.remove();
        });

        shouldStopSpinner();

        it('should remove $el from DOM', function() {
            expect(subject.$el.closest('body').length).toBeFalsy();
        });
    });
});
