"use strict";
var PlusMinus = (function () {
    function PlusMinus(plusMinusObj) {
        this.counter = 0;
        this.pmInstance = document.getElementById(plusMinusObj.element);
        if (plusMinusObj.values && plusMinusObj.values !== '') {
            this.values = plusMinusObj.values.split(',');
        }
        else {
            this.values = [0, 1, 2, 3, 4];
        }
        this.descriptionText = plusMinusObj.description;
        this.iconClassNames = plusMinusObj.iconClasses;
        this.sitetrackingkey = plusMinusObj.siteTrackingKey;
        this.callback = plusMinusObj.cb;
        this.output = this.values[0];
        this.renderComponent();
        this.updateOutput();
        this.initEventHandlers();
        this.pmInit = true;
    }
    PlusMinus.prototype.renderComponent = function () {
        var descriptionHtml;
        if (this.descriptionText !== '' || this.iconClassNames !== '') {
            descriptionHtml = '<div class="plus-minus-description">';
            if (this.iconClassNames !== '') {
                descriptionHtml += '<i class="icon icon-custom ' + this.iconClassNames + '"></i>';
            }
            if (this.descriptionText !== '') {
                descriptionHtml += '<p class="plus-minus-description-text txt-default">' + this.descriptionText + '</p>';
            }
            descriptionHtml += '</div>';
        }
        this.pmInstance.insertAdjacentHTML('afterend', descriptionHtml);
        var componentHtml;
        componentHtml = '<a href="#" class="plus-minus-button plus-minus-button-minus"><i class="icon icon-minus">-</i></a><input class="plus-minus-output" type="text" name="" value="" readonly="readonly"><a href="#" class="plus-minus-button plus-minus-button-plus"><i class="icon icon-plus">+</i></a>';
        this.pmInstance.innerHTML = componentHtml;
    };
    PlusMinus.prototype.initEventHandlers = function () {
        var _this = this;
        var btn_minus = this.pmInstance.querySelector('.plus-minus-button-minus');
        btn_minus.onclick = function (e) {
            console.log('click minus');
            _this.decrement();
        };
        var btn_plus = this.pmInstance.querySelector('.plus-minus-button-plus');
        btn_plus.onclick = function (e) {
            console.log('click plus');
            _this.increment();
        };
    };
    PlusMinus.prototype.increment = function () {
        if (this.counter < (this.values.length - 1)) {
            this.counter++;
            this.updateOutput();
            console.log('increment counter = ' + this.counter);
        }
    };
    PlusMinus.prototype.decrement = function () {
        if (this.counter > 0) {
            this.counter--;
            this.updateOutput();
            console.log('decrement counter = ' + this.counter);
        }
    };
    PlusMinus.prototype.updateOutput = function () {
        this.output = this.values[this.counter];
        var pm_output = this.pmInstance.querySelector('.plus-minus-output');
        pm_output.value = this.values[this.counter];
        if (this.pmInit) {
            this.notifyCallback();
        }
    };
    PlusMinus.prototype.notifyCallback = function () {
        console.log('notify');
        if (this.callback) {
            this.callback('return val = ' + this.output);
        }
    };
    return PlusMinus;
})();
