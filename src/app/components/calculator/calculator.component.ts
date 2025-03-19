import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  firstNumber: number | null = null;
  secondNumber: number | null = null;
  result: number | null = null;
  operation: string = '';

  setFirstNumber(event: any) {
    const value = event.target.value;
    this.firstNumber = value ? parseFloat(value) : null;
  }

  setSecondNumber(event: any) {
    const value = event.target.value;
    this.secondNumber = value ? parseFloat(value) : null;
  }

  calculate() {
    if (this.firstNumber !== null && this.secondNumber !== null) {
      switch (this.operation) {
        case '+':
          this.result = this.firstNumber + this.secondNumber;
          break;
        case '-':
          this.result = this.firstNumber - this.secondNumber;
          break;
        case '*':
          this.result = this.firstNumber * this.secondNumber;
          break;
        case '/':
          this.result = this.secondNumber !== 0 ? this.firstNumber / this.secondNumber : null;
          break;
        default:
          this.result = null;
      }
    }
  }

  clear() {
    this.firstNumber = null;
    this.secondNumber = null;
    this.result = null;
    this.operation = '';
  }
}
