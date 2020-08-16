

export class SudokuValueConverter {
  
  toView(value, maxValue) {
    console.log("toview")
    if(+value ===0 || value > maxValue)  {
      return undefined;
    }
    return value;
  }

  fromView(value) {
    console.log(value)
    if(isNaN(+value))  {
      return 0;
    }
    
    return value;
  }
}
