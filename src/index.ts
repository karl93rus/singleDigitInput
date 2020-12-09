export interface IOptions {
  selector: string;
  hiddenInputId: string;
  fillRecievedValue: boolean;
  filledClass?: string;
  numbersOnly?: boolean;
}

export class SinChar {
  private digits: HTMLInputElement[]; // inputs
  private resultingPassInput: HTMLInputElement; // hidden input to assemble the final string
  private filledPass: boolean; // is pass value emty?
  private recievedPass: string[]; // empty array to store splitted pass value
  private fillRecieved: boolean;
  private filledClass?: string;
  private numbersOnly?: boolean;

  // constructor(selector: string, hiddenInputId: string, debug?: boolean) {
  constructor(options: IOptions) {
    this.digits = Array.from(document.querySelectorAll(options.selector)) as HTMLInputElement[];
    this.resultingPassInput = document.getElementById(options.hiddenInputId) as HTMLInputElement;
    this.filledPass = this.resultingPassInput.value ? true : false;
    this.fillRecieved = options.fillRecievedValue;
    this.recievedPass = [];

    if(!options.numbersOnly) {
      this.numbersOnly = false;
    } else {
      this.numbersOnly = options.numbersOnly;
    }

    if(options.filledClass) {
      this.filledClass = options.filledClass;
    }
    
    // if password input value is not empty (incorrect code was filled in),
    // fill code this.digits with recieved value
    if(this.filledPass && this.fillRecieved) {
      // if pass value is not empty
      this.recievedPass = this.resultingPassInput.value.split(''); // split pass value spring into array
    }
  }

  public processCodeInput(cb?: Function) {
    this.digits[0].focus(); // autofocus first input

    this.digits.forEach((digit, index) => {

      if(this.filledPass && this.fillRecieved){
        // if pass value is not empty
        digit.value = this.recievedPass[index]; // fill every digit with a corresponding recievedPass array element
        if(this.filledClass) {
          digit.classList.add(this.filledClass);
        }
      }

      if(this.filledClass) {
        digit.addEventListener('focus', () => {
          digit.classList.add(this.filledClass!);
        });
        digit.addEventListener('blur', () => {
          if(digit.value.length === 0) {
            digit.classList.remove(this.filledClass!);
          }
        });
      }

      digit.addEventListener('paste', (e: ClipboardEvent) => {
        const data = e.clipboardData?.getData('text').split('');
        e.preventDefault();

        if(data && data.length > 0) {
          this.digits[index].value = data[index]; // fill every digit with a corresponding pastedata array element
          this.digits.forEach((d, i) => {
            this.digits[i].value = data[i];
            this.resultingPassInput.value += this.digits[i].value;
            if(this.filledClass) {
              this.digits[i].classList.add(this.filledClass);
            }
          });
        }
        if((this.resultingPassInput.value.length === this.digits.length) && cb) {
          cb();
        }

      });

      digit.addEventListener('keydown', (e: KeyboardEvent) => {
        if(this.numbersOnly && !/[0-9]|Backspace|Control|v|Tab/.test(e.key)) {
          console.log(e.key);
          e.preventDefault();
          return;
        }
        if(digit.value === '' && index > 0 && e.key === 'Backspace') {
          this.digits[index - 1].focus();
        }
        if(digit.value !== '' && index > 0 && e.key === 'Backspace') {
          digit.value = '';
        }
        if(digit.value !== '' && index >= 0 && index < this.digits.length - 1 && e.key !== 'Backspace') {
          this.digits[index + 1].focus();
        }
      });

      digit.addEventListener('input', (e: Event) => {
        e.preventDefault();

        if(index >= 0 && index < this.digits.length - 1 && digit.value !== '') {
          this.digits[index + 1].focus();
        }

        this.resultingPassInput.value = '';
        this.digits.forEach(d => {
          this.resultingPassInput.value += d.value;
        });

        if(this.filledClass) {
          this.digits.forEach(d => {
            if (d.value !== '') {
              d.classList.add(this.filledClass!);
            } else {
              d.classList.remove(this.filledClass!);
            }
          });
        }

        if((this.resultingPassInput.value.length === this.digits.length) && cb) {
          cb();
        }
      });
    });
  }
}