import { isNumber, isPaste, clamp } from './utils';

export interface IOptions {
  selector: string;
  hiddenInputId: string;
  fillRecievedValue: boolean;
  filledClass?: string;
  numbersOnly?: boolean;
  autofocus?: boolean;
}

export class SinChar {
  private digits: HTMLInputElement[]; // inputs
  private resultingPassInput: HTMLInputElement; // hidden input to assemble the final string
  private filledPass: boolean; // is pass value emty?
  private recievedPass: string[]; // empty array to store splitted pass value
  private fillRecieved: boolean;
  private filledClass?: string;
  private numbersOnly?: boolean;
  private autofocus?: boolean = false;

  private get fullfilled() {
    if (!this.resultingPassInput) return;
    return this.resultingPassInput.value.length === this.digits.length;
  }

  private get result() {
    return this.resultingPassInput?.value ?? '';
  }

  constructor(options: IOptions) {
    this.digits = Array.from(document.querySelectorAll(options.selector)) as HTMLInputElement[];
    this.resultingPassInput = document.getElementById(options.hiddenInputId) as HTMLInputElement;
    this.filledPass = !!this.resultingPassInput.value;
    this.fillRecieved = options.fillRecievedValue;
    this.recievedPass = [];

    this.numbersOnly = !!options.numbersOnly;

    if (options.filledClass) {
      this.filledClass = options.filledClass;
    }

    // if password input value is not empty (incorrect code was filled in),
    // fill code this.digits with recieved value
    if (this.filledPass && this.fillRecieved) {
      // if pass value is not empty
      this.recievedPass = this.resultingPassInput.value.split(''); // split pass value spring into array
    }

    if (options.autofocus) {
      this.autofocus = true;
    }
  }

  public processCodeInput(cb?: (result: string) => void): void {
    this.digits.forEach((digit, index) => {
      digit.setAttribute('maxlength', '1');
      digit.setAttribute('autocapitalize', 'off');
      digit.setAttribute('autocorrect', 'off');
      digit.setAttribute('autocomplete', 'off');

      if (this.numbersOnly) {
          digit.setAttribute('inputmode', 'numeric');
          digit.setAttribute('pattern', '[0-9]*');
      }

      if (index === 0) {
          digit.setAttribute('autocomplete', 'one-time-code');
          digit.setAttribute('maxlength', this.digits.length.toString());
      }

      if (this.filledPass && this.fillRecieved) {
        // if pass value is not empty
        digit.value = this.recievedPass[index] ?? ''; // fill every digit with a corresponding recievedPass array element
        if (this.filledClass) {
          digit.classList.add(this.filledClass);
        }
      }

      if (this.autofocus && index === 0) {
        digit.focus();
      }


      /* always focus first digit if it's empty */
      digit.addEventListener('focus', () => {
        if (index !== 0 && !this.digits[0].value) {
            this.focusDigit(0);
        }
      });

      digit.addEventListener('paste', (e: ClipboardEvent) => {
        e.preventDefault();
        const data = e.clipboardData
          ?.getData('text')
          .split('')
          .filter((char) => !this.numbersOnly || isNumber(char))
          .slice(0, this.digits.length);

        if (data && data.length > 0) {
          // fill every digit with a corresponding pastedata array element
          this.digits.forEach((digit, i) => {
            digit.value = data[i] ?? digit.value;
          });
          this.insertResultValue();
          this.setFilledClasses();
        }

        if (this.fullfilled && cb) {
          cb(this.result);
        }
      });

      digit.addEventListener('keydown', (e: KeyboardEvent) => {
        const isBackspace = e.key === 'Backspace';
        const isControl = e.key === 'Control';
        const allowedKeys = ['Backspace', 'Control', 'Tab'];

        const isLeftArrow = e.code === 'ArrowLeft';
        const isRightArrow = e.code === 'ArrowRight';

        if (isLeftArrow || isRightArrow) {
          const indexToFocus = clamp(
            isLeftArrow ? index - 1 : index + 1,
            0,
            this.digits.length
          );
          this.focusDigit(indexToFocus);
          return;
        }

        if (
          this.numbersOnly &&
          !isPaste(e) &&
          !allowedKeys.includes(e.key) &&
          !isNumber(e.key)
        ) {
          e.preventDefault();
          return;
        }

        if (index > 0 && isBackspace) {
          if (digit.value === '') {
            this.focusDigit(index - 1);
          } else {
            digit.value = '';
          }
        } else if(index === 0 && isBackspace) {
          digit.value = '';
        }

        if (
          !isBackspace &&
          !isControl &&
          digit.value !== '' &&
          index >= 0 &&
          index < this.digits.length - 1
        ) {
          this.focusDigit(index + 1);
        }

        setTimeout(() => {
          this.insertResultValue();
          this.setFilledClasses();
        }, 0);
      });

      digit.addEventListener('input', (e: Event) => {
        e.preventDefault();

        const value = digit.value;
        /* case for ios 15 otp code autofill */
        if (index === 0 && value.length > 1) {
          digit.value = value[0];
          value
              .slice(1, this.digits.length)
              .split('')
              .forEach((char, charIdx) => {
                  this.digits[charIdx + 1].value = char;
              });
          this.focusDigit(this.digits.length - 1);
        } else if (
          index < this.digits.length - 1 && 
          digit.value !== ''
        ) {
            this.focusDigit(index + 1);
          }

        this.insertResultValue();
        if (this.fullfilled && cb) {
          cb(this.result);
        }
      });
    });
  }

  private insertResultValue() {
    this.resultingPassInput.value = this.digits.reduce((result, digit) => result + digit.value, '');
  }

  private setFilledClasses() {
    if (!this.filledClass) return;
    this.digits.forEach((digit) => {
      if (digit.value.length > 0) {
        digit.classList.add(this.filledClass!);
      } else {
        digit.classList.remove(this.filledClass!);
      }
    });
  }

  private focusDigit(index: number) {
    this.digits[index]?.focus();
  }
}
