import * as Blockly from 'blockly/core';

const turnBlock = {
  "type": "turn_block",
  "message0": "Turn %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "DIRECTION",
      "options": [
        ["Left", "LEFT"],
        ["Right", "RIGHT"]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "Turn left or right"
};

Blockly.Blocks['turn_block'] = {
  init: function() {
    this.jsonInit(turnBlock);
    this.setStyle('motion_blocks');
  }
};

//For Loop Block
Blockly.Blocks['repeat_block'] = {
  init: function() {
    this.jsonInit({
      "type": "repeat_block",
      "message0": "Repeat %1 times",
      "args0": [
        {
          "type": "field_number",
          "name": "TIMES",
          "value": 1,
          "min": 1
        }
      ],
      "message1": "do %1",
      "args1": [
        {
          "type": "input_statement",
          "name": "DO"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 260,
      "tooltip": "Repeat a set of statements a specific number of times",
      "helpUrl": ""
    });
    this.setStyle('loop_blocks');
  }
};



//Move Block in forward/backward direction
const moveBlock = {
  "type": "move_block",
  "message0": "Move %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "DIRECTION",
      "options": [
        ["Forward", "FORWARD"],
        ["Backward", "BACKWARD"]
      ]
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "Move forward or backward by a certain number of steps"
};
Blockly.Blocks['move_block'] = {
  init: function() {
    this.jsonInit(moveBlock);
    this.setStyle('motion_blocks');
  }
};

