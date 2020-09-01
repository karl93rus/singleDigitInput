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
* ```selector```: CSS selector to pick all inputs. It is a ```querySelectorAll``` underhood.
* ```hiddenInputId```: ID attribute of a hidden input. This input stores all the digits we entered.
* ```filledClass?```: name of a class to decorate filled input. This is optional parameter.

After instance is created, run ```.processCodeInput(callback)``` method. This will initialize all keyboard the events.
Please notice, that you have to manualy store the final value result as shown in example below.
I am thinking about making this process less annoying for user.
```javascript
const options = {
  selector: '.inputs-div > .my-input',
  hiddenInputId: 'final-value'
}
const sch = new SinChar(options);
sch.processCodeInput(() => {
  const FINAL_RESULT = document.getElementById('final-value').value;
  // Here is your code...
});
```

#### [Sourse code on github](https://github.com/karl93rus/singleDigitInput)