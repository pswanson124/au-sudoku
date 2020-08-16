import { SudokuSolver, Location } from './sudoku-solver';
import { SudokuValue } from './sudoku-value';
import { bindable, observable } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';

export class SudokuBoard {
  @bindable private gameArrayIn: number[][];
  private gameArray: SudokuValue[][] = [];
  private sectionCount: number;
  private rowCount: number;
  private columnCount: number;
  private solver: SudokuSolver;
  @observable private showSolution: boolean = false;
  @observable private showHints: boolean = false;
  private availableOptions: number[] = [];
  @observable protected currentOffset: number;
  myOnKeypressCallback: any;

  constructor( )  {
    this.myOnKeypressCallback = this.onKeypress.bind(this);
  }

  attached() {
    console.log("adding keypress")
    window.addEventListener('keydown', this.myOnKeypressCallback, false);
  }

  detached() {
    console.log('removing keypress')
    window.removeEventListener('keydown', this.myOnKeypressCallback, false);
  }

  gameArrayInChanged() {
    let offset = 0;
    for (let row of this.gameArrayIn) {
      let newRow = [];
      for (let col of row) {
        newRow.push(new SudokuValue(col, offset++));
      }
      this.gameArray.push(newRow);
    }
    this.columnCount = this.gameArray[0].length;
    this.sectionCount = Math.floor(Math.sqrt(this.columnCount));
    this.rowCount = this.gameArray.length;
    this.solver = new SudokuSolver(this.gameArray, this.sectionCount);
    this.solver.solve();
  }

  isColBoundary(offset: number) {
    return offset % this.sectionCount === 0 && offset % this.columnCount > 0;
  }

  isRowBoundary(row) {
    const offset = row[0].offset;
    return offset > 0 && offset % (this.columnCount * this.sectionCount) == 0;
  }

  onFocus(offset) {
    this.getAvailableOptions(offset);
  }

  getAvailableOptions(offset: number) {
    this.currentOffset = offset;
    this.availableOptions = [];
    let usedValues: any = new Object();
    let location = this.getLocation(offset);
    this.getRowValues(usedValues, location);
    this.getColValues(usedValues, location);
    this.getSectionValues(usedValues, location);
    for (let option = 1; option <= this.columnCount; option++) {
      if (!usedValues.hasOwnProperty(option.toString())) {
        this.availableOptions.push(option);
      }
    }
  }

  getLocation(offset: number): Location {
    return {
      offset,
      row: Math.floor(offset / this.columnCount),
      col: offset % this.columnCount
    };
  }

  getColValues(usedValues: any, location: Location) {
    for (let row = 0; row < this.columnCount; row++) {
      if (this.gameArray[row][location.col].value) {
        usedValues[this.gameArray[row][location.col].value] = true;
      }
    }
  }

  getRowValues(usedValues: any, location: Location) {
    for (let col = 0; col < this.columnCount; col++) {
      if (this.gameArray[location.row][col].value) {
        usedValues[this.gameArray[location.row][col].value] = true;
      }
    }
  }

  getSectionValues(usedValues: any, location: Location) {
    const rowSection = Math.floor(location.row / this.sectionCount);
    const colSection = Math.floor(location.col / this.sectionCount);

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const currentRow = rowSection * this.sectionCount + row;
        const currentCol = colSection * this.sectionCount + col;
        if (this.gameArray[currentRow][currentCol].value) {
          usedValues[this.gameArray[currentRow][currentCol].value] = true;
        }
      }
    }
  }

  onBlur(offset) {
    if (this.currentOffset === offset) {
      this.availableOptions = [];
    }
  }

  chooseOption(option) {
    const location = this.getLocation(this.currentOffset);
    this.gameArray[location.row][location.col].value = option;
  }


  onKeypress($event: KeyboardEvent) : boolean {
    if($event.key === 'ArrowUp' 
    || $event.key === 'ArrowDown' 
    || $event.key === 'ArrowLeft' 
    || $event.key === 'ArrowRight'
    ) {
      const detail = { offset : this.currentOffset, direction: $event.key }
      this.moveFocus(detail)
    }
    return true;
  }

  moveFocus(detail): void {
    var newOffset;
    switch (detail.direction) {
      case 'ArrowUp':
        newOffset = this.currentOffset - this.columnCount;
        break;
      case 'ArrowDown':
        newOffset = this.currentOffset + this.columnCount;
        break;
      case 'ArrowRight':
        newOffset = this.currentOffset + 1;
        break;
      case 'ArrowLeft':
        newOffset = this.currentOffset - 1;
    }
    if(newOffset >= 0 && newOffset < Math.pow(this.columnCount, 2))  {
      this.currentOffset = newOffset;
    }
  }

  selectBox(offset) {
    this.currentOffset = offset;
    console.log(offset);
  }
}
