var PlusMinus = (function () {
    function PlusMinus(el, pmValues, cb) {
        this.counter = 0;
        this.pm_instance = document.getElementById(el);
        this.values = pmValues;
        this.callback = cb;
        this.output = this.values[0];
        this.renderComponent(el);
        this.initEventHandlers();
    }
    PlusMinus.prototype.renderComponent = function (el) {
        var componentHtml;
        componentHtml = '<div class="plusMinusWidget"><a href="#" class="btn minus">-</a> <input name="output" value="" readonly/> <a href="#" class="btn plus">+</a></div>';
        this.pm_instance.innerHTML = componentHtml;
    };
    PlusMinus.prototype.initEventHandlers = function () {
        var _this = this;
        var btn_minus = this.pm_instance.querySelector('.minus');
        var self = this;
        btn_minus.onclick = function (e) {
            console.log('click minus');
            _this.decrement();
        };
        var btn_plus = this.pm_instance.querySelector('.plus');
        btn_plus.onclick = function (e) {
            console.log('click plus');
            _this.increment();
        };
    };
    PlusMinus.prototype.increment = function () {
        console.log(this.values.length);
        console.log(this.output);
        if (this.counter < this.values.length) {
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
        this.notifyCallback();
    };
    PlusMinus.prototype.notifyCallback = function () {
        if (this.callback) {
            this.callback('return val = ' + this.output);
        }
    };
    return PlusMinus;
})();
