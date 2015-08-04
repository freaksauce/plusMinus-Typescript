# plusMinus-Typescript

## Usage:

```
<div id="pm_test"></div>
<div id="pm_test2"></div>
```

```javascript
var myCallback = function(data) {
  console.log(data);
}
var pm_test = new PlusMinus({element:'pm_test', values:"1,2,3,4,4+", description:"How many bones are broken?", iconClasses:"icon icon-public-liability", cb:myCallback});
var pm_test2 = new PlusMinus({values:"one, two, ALL", description:"Number of bedrooms", element:'pm_test2'});
```
