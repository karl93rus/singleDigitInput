export class SinChar {
  private digits: HTMLInputElement[]; // inputs
  private resultingPassInput: HTMLInputElement; // hidden input to assemble the final string
  private filledPass: boolean; // is pass value emty?
  private recievedPass: string[]; // empty array to store splitted pass value
  private isFilled: boolean;
  private debugMode?: boolean;

  constructor(selector: string, hiddenInputId: string, debug?: boolean) {
    this.digits = Array.from(document.querySelectorAll(selector)) as HTMLInputElement[];
    this.resultingPassInput = document.getElementById(hiddenInputId) as HTMLInputElement;
    this.filledPass = this.resultingPassInput.value ? true : false;
    this.recievedPass = [];
    this.isFilled = false;

    if(debug) {
      this.debugMode = debug;
    } else {
      this.debugMode = false;
    }
    
    // if password input value is not empty (incorrect code was filled in),
    // fill code this.digits with recieved value
    if(this.filledPass) {
      // if pass value is not empty
      this.recievedPass = this.resultingPassInput.value.split(''); // split pass value spring into array
    }
  }

  public processCodeInput(cb?: Function) {  
    this.digits.forEach((digit, index) => {

      if(this.filledPass){
        // if pass value is not empty
        digit.value = this.recievedPass[index]; // fill every digit with a corresponding recievedPass array element
      }

      digit.addEventListener('keydown', (e: KeyboardEvent) => {
        if(e.key !== 'Backspace' && index >= 0 && index < this.digits.length -1) {
          digit.value = e.key;
          this.digits[index + 1].focus();
          e.preventDefault();
          e.stopPropagation();
        } else if(e.key !== 'Backspace' && index === this.digits.length - 1) {
          return;
        }

        if(digit.value.length === 1 && e.key === 'Backspace' && index > 0) {
          this.isFilled = false;
          digit.value = '';
          return;
        } else if(digit.value.length === 0 && e.key === 'Backspace' && index > 0) {
          this.isFilled = false;
          this.digits[index - 1].value = '';
          this.digits[index - 1].focus();
        } else if(e.key === 'Backspace' && index === 0) {
          this.isFilled = false;
          return;
        }
      });

      digit.addEventListener('keyup', (e: KeyboardEvent) => {
        if(this.debugMode) {
          console.log('keyup');
        }

        if(index === this.digits.length - 1) {
          if(!/\d/.test(digit.value)) {
            if(this.debugMode) {
              console.log('index === this.digits.length - 1', index);
            }
            digit.value = '';
            if(!/\d/.test(this.digits[index - 1].value)) {
              this.digits[index - 1].value = ''
              this.digits[index - 1].focus();
            }
          }
        } else if(index === 0) {
          if(this.debugMode) {
            console.log('index === 0', index);
          }
          if(!/\d/.test(digit.value)) {
            digit.value = '';
          }
        } else if(index > 0 && index < this.digits.length - 1) {
          if(this.debugMode) {
            console.log('index > 0 && index < this.digits.length - 1', index);
          }
          if(!/\d/.test(this.digits[index - 1].value)) {
            this.digits[index - 1].value = ''
            this.digits[index - 1].focus();
          }
        }

        this.resultingPassInput.value = '';
        this.digits.forEach(d => {
          this.resultingPassInput.value += d.value;
          if(this.debugMode) {
            console.log('result: ', this.resultingPassInput.value);
          }
        });
        if(cb && !this.isFilled && this.resultingPassInput.value.length === this.digits.length) {
          this.isFilled = true;
          cb();
        } else if(!this.isFilled && this.resultingPassInput.value.length === this.digits.length) {
          if(this.debugMode) {
            console.log('execute action with value: ', this.resultingPassInput.value);
          }
          this.isFilled = true;
        } else {
          return;
        }
      });
    });
  }
}