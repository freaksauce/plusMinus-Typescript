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
        this.pmInit = false;
        this.renderComponent();
        this.updateOutput();
        this.initEventHandlers();
        this.pmInit = true;
    }
    PlusMinus.prototype.renderComponent = function () {
        var descriptionHtml;
        if (this.descriptionText && this.descriptionText !== '' || this.iconClassNames && this.iconClassNames !== '') {
            descriptionHtml = '<div class="plus-minus-description">';
            if (this.iconClassNames !== '') {
                descriptionHtml += '<i class="' + this.iconClassNames + '"></i>';
            }
            if (this.descriptionText && this.descriptionText !== '') {
                descriptionHtml += '<p class="plus-minus-description-text txt-default">' + this.descriptionText + '</p>';
            }
            descriptionHtml += '</div>';
        }
        var componentHtml;
        componentHtml = '<div class="plus-minus-component"><a href="#" class="plus-minus-button plus-minus-button-minus"><i class="icon icon-minus"></i></a><input class="plus-minus-output" type="text" name="" value="" readonly="readonly"><a href="#" class="plus-minus-button plus-minus-button-plus"><i class="icon icon-plus"></i></a></div>';
        var wrapperHtml = '<div class="plus-minus">' + componentHtml + descriptionHtml + '</div>';
        this.pmInstance.innerHTML = wrapperHtml;
    };
    PlusMinus.prototype.initEventHandlers = function () {
        var _this = this;
        var btn_minus = this.pmInstance.querySelector('.plus-minus-button-minus');
        btn_minus.addEventListener('click', function (event) { return _this.decrement(event); });
        btn_minus.addEventListener('touchstart', function (event) { return _this.decrement(event); });
        var btn_plus = this.pmInstance.querySelector('.plus-minus-button-plus');
        btn_plus.addEventListener('click', function (event) { return _this.increment(event); });
        btn_plus.addEventListener('touchstart', function (event) { return _this.increment(event); });
    };
    PlusMinus.prototype.increment = function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.handled !== true) {
            if (this.counter < (this.values.length - 1)) {
                this.counter++;
                this.updateOutput();
            }
            e.handled = true;
        }
        else {
            return false;
        }
    };
    PlusMinus.prototype.decrement = function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.handled !== true) {
            if (this.counter > 0) {
                this.counter--;
                this.updateOutput();
            }
            e.handled = true;
        }
        else {
            return false;
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
        if (this.callback) {
            this.callback('return val = ' + this.output);
        }
    };
    return PlusMinus;
})();
