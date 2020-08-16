import { observable } from "aurelia-binding";


export class SudokuValue {
  @observable public value: number;
  public offset: number;
  public solvedValue: number = 0;
  public originalValue: boolean = false;

  constructor(value:number, offset: number) {
    this.value = value;
    this.offset = offset;
    if(value !== 0) {
      this.originalValue = true;
      this.solvedValue = value;
    }
  }


}
