import React, { useState, useEffect, useRef } from "react";
import BlocklyComponent, { Block } from "../Blockly";
import "../blocks/customblocks";
import "../generator/generator";
import { useSelector } from "react-redux";
import ThreeDMatrix from "./ThreeDMatrix";
import HintComponent from "./HintComponent";

const initialBlocklyValues = {
  readOnly: false,
  trashcan: true,
  move: {
    scrollbars: true,
    drag: true,
    wheel: true,
  },
};

const Home = () => {
  const gamesConfig = useSelector((store) => store.matrixConfig);
  const [resetFlag,setResetFlag] = useState(false);
  const [full3DScreen, setFull3DScreen] = useState(false);
  const gameLevel = useSelector(store => store.gameLevel.gameLevel);
  const [blocklyValues, setBlocklyValues] = useState(initialBlocklyValues);
  const [showHint , setShowHint] = useState(true);
  const hintNextButton = useRef(false);
  
  useEffect(() => {
    // Reset the BlocklyComponent when gameLevel changes
    setBlocklyValues(initialBlocklyValues);
  }, [gameLevel]);

  return showHint ? <HintComponent  {...gamesConfig.gameConfigOne}
  resetFlag={resetFlag}
  setResetFlag={setResetFlag}
  showHint={showHint}
  setShowHint={setShowHint}
  hintNextButton={hintNextButton}
  /> :(
    <div className="flex w-screen ">
      {!full3DScreen && <div className="w-1/2">
        <BlocklyComponent
           {...blocklyValues}
          setResetFlag={setResetFlag}
        >
          <Block type="turn_block" />
          <Block type="move_block" />
        </BlocklyComponent>
      </div>}
      <div className={`${full3DScreen ? "w-screen" : " w-1/2"}`}>
      
       {gameLevel === 1 && <ThreeDMatrix
          {...gamesConfig.gameConfigOne}
          resetFlag={resetFlag}
          setResetFlag={setResetFlag}
          showHint={showHint}
          setShowHint={setShowHint}
          hintNextButton={hintNextButton}
        />}
         {gameLevel === 2 && <ThreeDMatrix
          {...gamesConfig.gameConfigTwo}
          resetFlag={resetFlag}
          setResetFlag={setResetFlag}
          showHint={showHint}
          setShowHint={setShowHint}
          hintNextButton={hintNextButton}
        />}
         {gameLevel === 3 && <ThreeDMatrix
          {...gamesConfig.gameConfigThree}
          resetFlag={resetFlag}
          setResetFlag={setResetFlag}
          showHint={showHint}
          setShowHint={setShowHint}
          hintNextButton={hintNextButton}
        />}
        <button className="ml-96 bg-blue-500 px-3 py-3 text-center text-white text-bold" onClick={()=>setResetFlag(true)}>Reset</button>
        <button onClick={()=>setFull3DScreen(!full3DScreen)}
        className="bg-black text-white text-bold p-2 rounded-sm float-right mx-3">[  ]</button>
      </div>
    </div>
  );
};

export default Home;
