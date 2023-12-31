import React from "react";
import { useEffect, useRef, useState } from "react";

import Blockly from "blockly/core";
import "blockly/javascript";
import { javascriptGenerator } from "blockly/javascript";
import locale from "blockly/msg/en";
import "blockly/blocks";
import { useDispatch, useSelector } from "react-redux";
import { addBlockInstruction } from "../utils/blocklyInstructionSlice";
import { generateCode } from "../utils/generateBlocklyCode";
import { changeRobotPosition } from "../utils/changeRobotPosition";

Blockly.setLocale(locale);

function BlocklyComponent(props) {
  const { robotPositionRef, robotPosition, setRobotPosition } = props;
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();
  let blocklyInstruction = useSelector(
    (store) => store.blocklyInstruction.blockInstructionArray
  );
  const gamesConfig = useSelector((store) => store.matrixConfig);
  const { row, col, batteryPosition, obstaclePosition, initialDirectionRobot } =
    gamesConfig.gameConfigOne;
  const robotDirectionRef = useRef(initialDirectionRobot);

  const dispatch = useDispatch();
  let commandArray = [];

  const generateBlocklyCode = () => {
    commandArray = generateCode(primaryWorkspace.current, javascriptGenerator);
    dispatch(addBlockInstruction(commandArray));
    //Below print , means just after dispatch render does't occur - neeche saare execute hone ke baad phir render hoga.
  };

  useEffect(() => {
    console.log("blocklyInstruction- ", blocklyInstruction);
    robotPositionRef.current = initialDirectionRobot;
    changeRobotPosition(
      blocklyInstruction,
      obstaclePosition,
      row,
      col,
      setRobotPosition,
      robotDirectionRef
    );
  }, [blocklyInstruction]);

  useEffect(() => {
    const { children, ...rest } = props;
    const { readOnly, trashcan, move } = props;
    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      readOnly,
      trashcan,
      move,
      trashcan: props.trashcan,
      move: props.move,
    });
    workspace.addChangeListener((event) => {
      if (
        event.type === Blockly.Events.CREATE ||
        event.type === Blockly.Events.MOVE ||
        event.type === Blockly.Events.END_DRAG ||
        event.type === Blockly.Events.BLOCK_MOVE
      ) {
        // Handle block connections and movements
        try {
        } catch (error) {
          console.error("An error occurred during code generation:", error);
          // Handle the error gracefully (e.g., show a notification, display an error message)
        }
      }
    });
    primaryWorkspace.current = workspace;
  }, [primaryWorkspace, toolbox, blocklyDiv]);

  return (
    <div className="flex flex-col">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-20"
        onClick={generateBlocklyCode}
      >
        Convert
      </button>
      <div ref={blocklyDiv} className="h-screen w-1/2 absolute " />
      <div style={{ display: "none" }} ref={toolbox}>
        {props.children}
      </div>
    </div>
  );
}

export default BlocklyComponent;
