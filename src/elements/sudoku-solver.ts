import { SudokuValue } from './sudoku-value';

export interface Location {
  offset: number;
  row: number;
  col: number;
}

export class SudokuSolver {
  columnCount: number;
  maxOffset: number;

  constructor(private gameArray: SudokuValue[][], private sectionCount: number) {
    this.columnCount = gameArray[0].length;
    this.maxOffset = gameArray.length * gameArray[0].length
  }

  public solve() {
    this.move(0);
  }

  move(offset: number) : boolean {
    const openPosition = this.findOpenPosition(offset);
    if(openPosition.offset < this.maxOffset) {
      for(let option=1; option<=this.columnCount; option++) {
        if(this.isAvailable(openPosition, option)) {
          this.gameArray[openPosition.row][openPosition.col].solvedValue = option;
          const attempt = this.move(openPosition.offset+1);
          if(attempt) {
            return true;
          }
        }
      }
      this.gameArray[openPosition.row][openPosition.col].solvedValue = 0;
      return false;
    }
    return true;
  }

  isAvailable(position: Location, option: number) : boolean{
    if(!this.isAvailableColumn(position, option))
      return false;
    else if(!this.isAvailableRow(position, option))
      return false;
    else if(!this.isAvailableSection(position, option))
      return false;
    else
      return true;
  }

  isAvailableSection(position: Location, option: number) {
    const rowSection = Math.floor(position.row / this.sectionCount);
    const colSection = Math.floor(position.col / this.sectionCount);

    for(let row = 0; row < 3; row++) {
      for(let col = 0; col < 3; col++) {
        const currentRow = rowSection * this.sectionCount + row;
        const currentCol = colSection * this.sectionCount + col
        if(position.col !== currentCol || position.row !== currentRow)  {
          if(this.gameArray[currentRow][currentCol].solvedValue===option) {
            return false;
          }
        }
      }
    }
    return true;
  }

  isAvailableRow(position: Location, option: number) {
    for(let row = 0; row < this.gameArray.length; row++) {
      if(row !== position.row && this.gameArray[row][position.col].solvedValue===option)
        return false;
    }
    return true;
  }

  private isAvailableColumn(position: Location, option: number) : boolean {
    for(let col = 0; col < this.columnCount; col++) {
      if(col !== position.col && this.gameArray[position.row][col].solvedValue===option)
        return false;
    }
    return true;
  }
  private findOpenPosition(offset: number): Location {
    let row: number;
    let col: number;
    for(; offset < this.maxOffset; offset++)  {
      row = Math.floor(offset / this.columnCount);
      col = offset % this.columnCount;
      if(this.gameArray[row][col].solvedValue===0)  {
        break;
      }
    }
    return { offset, row, col };
  }
}
