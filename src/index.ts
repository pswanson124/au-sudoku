import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/sudoku-board'),
    PLATFORM.moduleName('./elements/sudoku-box'),
    PLATFORM.moduleName('./value-converters/sudoku-value-converter')
  ]);
}
