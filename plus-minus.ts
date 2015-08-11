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
      this.pmInit = false;

      // initialise the component
      this.renderComponent(); // render the html for the component
      this.updateOutput(); // fill the output field with array value based on counter value
      this.initEventHandlers(); // add event handlers to buttons
      this.pmInit = true;
    }

    private renderComponent():void {
        var descriptionHtml:string;

        if (this.descriptionText && this.descriptionText !== '' || this.iconClassNames && this.iconClassNames !== '') {
          descriptionHtml = '<div class="plus-minus-description">';
          if (this.iconClassNames !== '') {
            descriptionHtml += '<i class="'+this.iconClassNames+'"></i>';
          }
          if (this.descriptionText && this.descriptionText !== '') {
  					descriptionHtml += '<p class="plus-minus-description-text txt-default">'+this.descriptionText+'</p>';
  				}
          descriptionHtml += '</div>';
        }


        var componentHtml: string;
        componentHtml = '<div class="plus-minus-component"><a href="#" class="plus-minus-button plus-minus-button-minus"><i class="icon icon-minus"></i></a><input class="plus-minus-output" type="text" name="" value="" readonly="readonly"><a href="#" class="plus-minus-button plus-minus-button-plus"><i class="icon icon-plus"></i></a></div>';

        // wrap plus/minus elements in containing wrapper
        var wrapperHtml = '<div class="plus-minus">'+componentHtml+descriptionHtml+'</div>';

        this.pmInstance.innerHTML = wrapperHtml;
    }

    private initEventHandlers():void {
      var btn_minus = this.pmInstance.querySelector('.plus-minus-button-minus');

      btn_minus.addEventListener('click', event => this.decrement(event));
      btn_minus.addEventListener('touchstart', event => this.decrement(event));

      var btn_plus = this.pmInstance.querySelector('.plus-minus-button-plus');

      btn_plus.addEventListener('click', event => this.increment(event));
      btn_plus.addEventListener('touchstart', event => this.increment(event));

    }

    /**
      Increase the counter if valid and call updateOutput() to update input value
    **/
    private increment(e):any {
      e.stopPropagation();
			e.preventDefault();
			if(e.handled !== true) {
        if (this.counter < (this.values.length - 1)) {
          this.counter++;
          this.updateOutput();
        }
      	e.handled = true;
      } else {
          return false;
      }
    }

    /**
      Decrease the counter if valid and call updateOutput() to update input value
    **/
    private decrement(e):any {
      e.stopPropagation();
      e.preventDefault();
      if(e.handled !== true) {
        if (this.counter > 0) {
          this.counter--;
          this.updateOutput();
        }
        e.handled = true;
      } else {
        return false;
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
      if (this.callback) {
        this.callback('return val = '+this.output);
      }
    }
}
