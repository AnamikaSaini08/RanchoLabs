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

Blockly.setLocale(locale);

function BlocklyComponent(props) {
  const {
    readOnly,
    trashcan,
    move,
  setResetFlag,
  gameLevel} = {...props};
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();
  const dispatch = useDispatch();
  let commandArray = [];

  const generateBlocklyCode = () => {
    setResetFlag(false);
    commandArray = generateCode(primaryWorkspace.current, javascriptGenerator);
    dispatch(addBlockInstruction(commandArray));
    //Below print , means just after dispatch render does't occur - neeche saare execute hone ke baad phir render hoga.
  };

  useEffect(() => {
    const { children, ...rest } = props;
    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      readOnly,
      trashcan,
      move,
      trashcan: trashcan,
      move: move,
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
  const levelNumber=[1,2,3,4,5,6,7,8]

  return (
    <div className="">
        <div className="flex flex-col">
    <div className="flex z-20 my-2 pb-2 shadow-md relative ml-48">
    {levelNumber.map((level,ind)=>{
      return(
        <div className=" flex justify-between">
        <button className={` focus:outline-none focus:border-none border border-gray-400 rounded-full px-3 py-1 mx-3 ${gameLevel===(ind+1) && 'bg-red-600 text-white'}`}>{level}</button><hr/>
        </div>
      )
    })}
    </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-20"
        onClick={generateBlocklyCode}
      >
        Play
      </button>
      <div ref={blocklyDiv} className="h-screen w-1/2 absolute " />
      <div style={{ display: "none" }} ref={toolbox}>
        {props.children}
      </div>
    </div>
    </div>
  );
}

export default BlocklyComponent;
