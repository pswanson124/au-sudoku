import { bindable, computedFrom, autoinject } from 'aurelia-framework';
import { SudokuValue } from './sudoku-value';

@autoinject
export class SudokuBox {
  @bindable sudokuValue: SudokuValue;
  @bindable showSolution: boolean = false;
  @bindable isCurrent: boolean = false;

  constructor(private element: Element) {}

  get isIncorrect() {
    return (
      !this.sudokuValue.originalValue &&
      this.sudokuValue.value != 0 &&
      this.sudokuValue.solvedValue !== +this.sudokuValue.value
    );
  }

  isCurrentChanged(n, o)  {
    let div = this.element.getElementsByTagName('div');
    if(div.length===0)  {
      return;
    }

    if(n) {
      div[0].focus();
    } 
    else {
      div[0].blur();
    }
  }
  @computedFrom('showSolution')
  get value() {
    return this.showSolution
      ? this.sudokuValue.solvedValue
      : this.sudokuValue.value;
  }

  onFocus() {
    const ev = new CustomEvent('focus', {
      detail: { offset: this.sudokuValue.offset }
    });
    this.element.dispatchEvent(ev);
  }

  onBlur() {
    const ev = new CustomEvent('blur', {
      detail: { offset: this.sudokuValue.offset }
    });
    this.element.dispatchEvent(ev);
  }

}
