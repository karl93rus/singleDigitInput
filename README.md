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
Create instance and pass 2 arguments:
1. CSS selector to pick all inputs. It is a ```querySelectorAll``` underhood.
2. ID attribute of a hidden input. This input stores all the digits we entered.
After instance is created, run ```.processCodeInput(callback)``` method. This will initialize all keyboard the events
```javascript
const sch = new SinChar('.inputs-div > .my-input', 'final-value');
sch.processCodeInput(callback);
```