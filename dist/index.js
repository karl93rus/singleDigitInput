export class SinChar {
    constructor(selector, hiddenInputId) {
        this.digits = Array.from(document.querySelectorAll(selector));
        this.resultingPassInput = document.getElementById(hiddenInputId);
        this.filledPass = this.resultingPassInput.value ? true : false;
        this.recievedPass = [];
        this.isFilled = false;
        // if password input value is not empty (incorrect code was filled in),
        // fill code this.digits with recieved value
        if (this.filledPass) {
            // if pass value is not empty
            this.recievedPass = this.resultingPassInput.value.split(''); // split pass value spring into array
        }
    }
    processCodeInput(cb) {
        this.digits.forEach((digit, index) => {
            if (this.filledPass) {
                // if pass value is not empty
                digit.value = this.recievedPass[index]; // fill every digit with a corresponding recievedPass array element
            }
            digit.addEventListener('keypress', (e) => {
                if (e.key !== 'Backspace' && index + 1 < this.digits.length) {
                    this.digits[index + 1].focus();
                }
                else if (e.key !== 'Backspace' && index === this.digits.length - 1) {
                    return;
                }
            });
            digit.addEventListener('keydown', (e) => {
                if (digit.value.length === 1 && e.key === 'Backspace' && index > 0) {
                    digit.value = '';
                    return;
                }
                else if (digit.value.length === 0 && e.key === 'Backspace' && index > 0) {
                    this.digits[index - 1].value = '';
                    this.digits[index - 1].focus();
                }
                else if (e.key === 'Backspace' && index === 0) {
                    return;
                }
            });
            digit.addEventListener('keyup', (e) => {
                if (index > 0 && index < this.digits.length - 1) {
                    if (!/\d/.test(this.digits[index - 1].value)) {
                        this.digits[index - 1].value = '';
                        this.digits[index - 1].focus();
                    }
                }
                else if (index === this.digits.length - 1) {
                    if (!/\d/.test(digit.value)) {
                        digit.value = '';
                    }
                }
                else if (index === 0) {
                    if (!/\d/.test(digit.value)) {
                        digit.value = '';
                    }
                }
                this.resultingPassInput.value = '';
                this.digits.forEach(d => {
                    this.resultingPassInput.value += d.value;
                });
                if (cb && !this.isFilled && this.resultingPassInput.value.length === this.digits.length) {
                    cb();
                    this.isFilled = true;
                }
                else if (!this.isFilled && this.resultingPassInput.value.length === this.digits.length) {
                    console.log('execute action with value: ', this.resultingPassInput.value);
                    this.isFilled = true;
                }
                else {
                    return;
                }
            });
        });
    }
}
