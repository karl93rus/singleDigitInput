export class SinChar{constructor(s,i){this.digits=Array.from(document.querySelectorAll(s)),this.resultingPassInput=document.getElementById(i),this.filledPass=!!this.resultingPassInput.value,this.recievedPass=[],this.isFilled=!1,this.filledPass&&(this.recievedPass=this.resultingPassInput.value.split(""))}processCodeInput(s){this.digits.forEach((i,t)=>{this.filledPass&&(i.value=this.recievedPass[t]),i.addEventListener("keydown",s=>{if("Backspace"!==s.key&&t>=0&&t<this.digits.length-1)i.value=s.key,this.digits[t+1].focus(),s.preventDefault(),s.stopPropagation();else if("Backspace"!==s.key&&t===this.digits.length-1)return;if(1===i.value.length&&"Backspace"===s.key&&t>0)return this.isFilled=!1,void(i.value="");if(0===i.value.length&&"Backspace"===s.key&&t>0)this.isFilled=!1,this.digits[t-1].value="",this.digits[t-1].focus();else if("Backspace"===s.key&&0===t)return void(this.isFilled=!1)}),i.addEventListener("keyup",e=>{if(t===this.digits.length-1||0===t?/\d/.test(i.value)||(i.value=""):t>0&&t<this.digits.length-1&&(/\d/.test(this.digits[t-1].value)||(this.digits[t-1].value="",this.digits[t-1].focus())),this.resultingPassInput.value="",this.digits.forEach(s=>{this.resultingPassInput.value+=s.value}),s&&!this.isFilled&&this.resultingPassInput.value.length===this.digits.length)this.isFilled=!0,s();else{if(this.isFilled||this.resultingPassInput.value.length!==this.digits.length)return;console.log("execute action with value: ",this.resultingPassInput.value),this.isFilled=!0}})})}}
