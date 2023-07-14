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
  javascriptGenerator['repeat_block'] = function(block){
    let code = '';
    const times = block.getFieldValue('TIMES');
  
    for (let i = 0; i < times; i++) {
      let doBlock = block.getInputTargetBlock('DO'); 
      //This retrieves the connected block inside the 'DO' statement input of the block object. It captures the block that should be executed within the loop.
      while (doBlock) {
        const doCode = javascriptGenerator[doBlock.type](doBlock);
        /* This line retrieves the generator function corresponding to the doBlock.type from the javascriptGenerator object. 
        It then calls the generator function, passing the doBlock as an argument, and captures the generated code in the doCode variable. */
        code += doCode;
        doBlock = doBlock.getNextBlock();
      }
    }
  console.log(code);
    return code;
  };
  
