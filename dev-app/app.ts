// import '../src/elements/sudoku-box.scss';

export class App {
  public message: string = 'from Aurelia!';
  gameArray=[
    [5,3,0,0,7,0,0,0,0], 
    [6,0,0,1,9,5,0,0,0], 
    [0,9,8,0,0,0,0,6,0], 
    [8,0,0,0,6,0,0,0,3], 
    [4,0,0,8,0,3,0,0,1], 
    [7,0,0,0,2,0,0,0,6], 
    [0,6,0,0,0,0,2,8,0], 
    [0,0,0,4,1,9,0,0,5], 
    [0,0,0,0,8,0,0,7,9],
  ]

  clicked() {
    // eslint-disable-next-line no-alert
    alert('A primary button click or a touch');
  }
}
