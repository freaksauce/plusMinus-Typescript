"use strict";

interface PlusMinusObj {
  element:string; // id of dom element
  values:string; // comma seperated string to convert to an array
  description:string; // displayed next to component
  iconClasses:string; // to display an icon
  cb:any; // callback
  siteTrackingKey:string;
}

class PlusMinus {

    values: any[];
    descriptionText: string;
    iconClassNames: string;
    sitetrackingkey: string;
    callback: any;
    counter: number;
    output: any;
    pmInstance: any;
    pmInit: boolean;

    constructor(plusMinusObj: PlusMinusObj) {
      this.counter = 0;
      this.pmInstance = document.getElementById(plusMinusObj.element);

      if (plusMinusObj.values && plusMinusObj.values !== '') {
        this.values = plusMinusObj.values.split(',');
      }else{
        this.values = [0,1,2,3,4];
      }
      this.descriptionText = plusMinusObj.description;
      this.iconClassNames = plusMinusObj.iconClasses;
      this.sitetrackingkey = plusMinusObj.siteTrackingKey
      this.callback = plusMinusObj.cb;
      this.output = this.values[0];

      // initialise the component
      this.renderComponent(); // render the html for the component
      this.updateOutput(); // fill the output field with array value based on counter value
      this.initEventHandlers(); // add event handlers to buttons
      this.pmInit = true;
    }

    private renderComponent():void {
        var descriptionHtml:string;

        if (this.descriptionText !== '' || this.iconClassNames !== '') {
          descriptionHtml = '<div class="plus-minus-description">';
          if (this.iconClassNames !== '') {
            descriptionHtml += '<i class="icon icon-custom '+this.iconClassNames+'"></i>';
          }
          if (this.descriptionText !== '') {
  					descriptionHtml += '<p class="plus-minus-description-text txt-default">'+this.descriptionText+'</p>';
  				}
          descriptionHtml += '</div>';
        }

        this.pmInstance.insertAdjacentHTML('afterend', descriptionHtml);

        var componentHtml: string;
        componentHtml = '<a href="#" class="plus-minus-button plus-minus-button-minus"><i class="icon icon-minus">-</i></a><input class="plus-minus-output" type="text" name="" value="" readonly="readonly"><a href="#" class="plus-minus-button plus-minus-button-plus"><i class="icon icon-plus">+</i></a>';
        this.pmInstance.innerHTML = componentHtml;
    }

    private initEventHandlers():void {
      var btn_minus = this.pmInstance.querySelector('.plus-minus-button-minus');
      btn_minus.onclick = (e) => {
        console.log('click minus');
        this.decrement();
      }
      var btn_plus = this.pmInstance.querySelector('.plus-minus-button-plus');
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
      var pm_output = this.pmInstance.querySelector('.plus-minus-output');
      pm_output.value = this.values[this.counter];
      if (this.pmInit) {
        this.notifyCallback();
      }
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
