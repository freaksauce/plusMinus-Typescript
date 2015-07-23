class PlusMinus {

    values: any[];
    counter: number;
    callback: any;
    output: any;
    pm_instance: any;

    constructor(el:string, pmValues:number[], cb:any) {
      this.counter = 0;
      this.pm_instance = document.getElementById(el);
      this.values = pmValues;
      this.callback = cb;
      this.output = this.values[0];
      this.renderComponent(el);
      this.initEventHandlers();
    }

    renderComponent(el:any):void {
        var componentHtml: string;
        componentHtml = '<div class="plusMinusWidget"><a href="#" class="btn minus">-</a> <input name="output" value="" readonly/> <a href="#" class="btn plus">+</a></div>';
        this.pm_instance.innerHTML = componentHtml;
    }

    initEventHandlers():void {
      var btn_minus = this.pm_instance.querySelector('.minus');
      var self = this;
      btn_minus.onclick = (e) => {
        console.log('click minus');
        this.decrement();
      }
      var btn_plus = this.pm_instance.querySelector('.plus');
      btn_plus.onclick = (e) => {
        console.log('click plus');
        this.increment();
      }
    }

    increment():void {
      console.log(this.values.length);
      console.log(this.output);
      if (this.counter < this.values.length) {
        this.counter++;
        this.updateOutput();
        console.log('increment counter = '+this.counter);
      }
    }

    decrement():void {
      if (this.counter > 0) {
        this.counter--;
        this.updateOutput();
        console.log('decrement counter = '+this.counter);
      }
    }

    updateOutput():void {
      this.output = this.values[this.counter];
      this.notifyCallback();
    }

    notifyCallback():void {
      if (this.callback) {
        this.callback('return val = '+this.output);
      }
    }
}
