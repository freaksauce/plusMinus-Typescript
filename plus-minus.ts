class PlusMinus {

    values: any[];
    descriptionText: string;
    iconClassNames: string;
    sitetrackingkey: string;
    callback: any;
    counter: number;
    output: any;
    pm_instance: any;

    constructor(el:string, pmValues:number[], cb:any, description:string, iconClasses:string, siteTrackingKey:string) {
      this.counter = 0;
      this.pm_instance = document.getElementById(el);
      this.values = pmValues;
      this.descriptionText = description;
      this.iconClassNames = iconClasses;
      this.sitetrackingkey = siteTrackingKey
      this.callback = cb;
      this.output = this.values[0];

      // initialise the component
      this.renderComponent(el); // render the html for the component
      this.updateOutput(); // fill the output field with array value based on counter value
      this.initEventHandlers(); // add event handlers to buttons
    }

    private renderComponent(el:any):void {
        var componentHtml: string;
        componentHtml = '<div class="plusMinusWidget"><a href="#" class="btn minus">-</a> <input class="plus-minus-output" name="output" value="" readonly/> <a href="#" class="btn plus">+</a></div>';
        this.pm_instance.innerHTML = componentHtml;
    }

    private initEventHandlers():void {
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

    /**
      Increase the counter if valid and call updateOutput() to update input value
    **/
    private increment():void {
      if (this.counter < (this.values.length - 1)) {
        this.counter++;
        this.updateOutput();
        console.log('increment counter = '+this.counter);
      }
    }

    /**
      Decrease the counter if valid and call updateOutput() to update input value
    **/
    private decrement():void {
      if (this.counter > 0) {
        this.counter--;
        this.updateOutput();
        console.log('decrement counter = '+this.counter);
      }
    }

    private updateOutput():void {
      this.output = this.values[this.counter];
      var pm_output = this.pm_instance.querySelector('.plus-minus-output');
      pm_output.value = this.values[this.counter];
      this.notifyCallback();
    }

    /**
      Return the value of output to the callback function
    **/
    private notifyCallback():void {
      console.log('notify');
      if (this.callback) {
        this.callback('return val = '+this.output);
      }
    }
}
