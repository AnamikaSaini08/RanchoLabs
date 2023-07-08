import {javascriptGenerator} from 'blockly/javascript';

javascriptGenerator['turn_block'] = function(block) {
    const direction = block.getFieldValue('DIRECTION');
  
    let turnCode;
    if (direction === 'LEFT') {
      turnCode = 'LEFT,';
    } else {
      turnCode = 'RIGHT,';
    }
  
    return turnCode;
  };
  javascriptGenerator['move_block'] = function(block) {
    const direction = block.getFieldValue('DIRECTION');
  
    let moveCode;
    if (direction === 'FORWARD') {
      moveCode = `FORWARD,`;
    } else {
      moveCode = `BACKWARD,`;
    }
  
    return moveCode;
  };
