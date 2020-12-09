# singleDigitInput
### Small utility to controll single char input field. Works well on desktop and mobile devices.
Visually it looks something like this. After filling up all the inputs a callback function executes.

![example](./ghp.jpeg)

Run ```npm i sinchar``` to install as npm package.

### Usage
Imagine structure like this:
```html
<div class="inputs-div">
  <input class="my-input" maxlength="1">
  <input class="my-input" maxlength="1">
  <input class="my-input" maxlength="1">
  <input class="my-input" maxlength="1">
  <input class="my-input" maxlength="1">
  <input class="my-input" maxlength="1">
  <input type="hidden" id="final-value">
</div>
```
It has 6 inputs for typing in 1 digit per input. For exapmle it can be authorization sms code.
Create instance and pass options object. Options are:
* ```selector: string```: CSS selector to pick all inputs. It is a ```querySelectorAll``` underhood.
* ```hiddenInputId: string```: ID attribute of a hidden input. This input stores all the digits we entered.
* ```fillRecievedValue: boolean```: If true, inputs will be filled in case server returns value fo hiddenInput input.
* ```filledClass?: string | undefined```: name of a class to decorate filled input. This is optional parameter.
* ```numbersOnly?: boolean```: if ```true``` only numbers allowed. Default is false.


Supports ```paste``` event with ```Ctrl+C```. After paste event fired, the callback function executes.


After instance is created, run ```.processCodeInput(callback)``` method. This will initialize all the keyboard events.
Please notice, that you have to manualy store the final value result as shown in example below.
```javascript
const options = {
  selector: '.inputs-div > .my-input',
  hiddenInputId: 'final-value',
  fillRecievedValue: true
}
const sch = new SinChar(options);
sch.processCodeInput(() => {
  const FINAL_RESULT = document.getElementById('final-value').value;
  // Here is your code...
});
```