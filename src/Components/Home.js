import React, { useState, useEffect, useRef } from "react";
import BlocklyComponent, { Block } from "../Blockly";
import "../blocks/customblocks";
import "../generator/generator";
import { useSelector } from "react-redux";
import ThreeDMatrix from "./ThreeDMatrix";
import HintComponent from "./HintComponent";
import { resetAlert } from "../utils/constant";

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
  const [resetFlag, setResetFlag] = useState(false);
  const [full3DScreen, setFull3DScreen] = useState(false);
  const gameLevel = useSelector((store) => store.gameLevel.gameLevel);
  const [blocklyValues, setBlocklyValues] = useState(initialBlocklyValues);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Reset the BlocklyComponent when gameLevel changes
    setBlocklyValues(initialBlocklyValues);
  }, [gameLevel]);

  return showHint ? (
    <HintComponent
      {...gamesConfig.gameConfigOne}
      resetFlag={resetFlag}
      setResetFlag={setResetFlag}
      showHint={showHint}
      setShowHint={setShowHint}
    />
  ) : (
    <div className="flex w-screen">
      {!full3DScreen && (
        <div className="w-1/2">
          <BlocklyComponent {...blocklyValues} setResetFlag={setResetFlag} gameLevel={gameLevel}>
            <Block type="turn_block" />
            <Block type="move_block" />
            <Block type="repeat_block"/>
          </BlocklyComponent>
        </div>
      )}
      <div className={`${full3DScreen ? "w-screen" : " w-1/2"}`}>
      <div className="flex mr-8 absolute top-0 right-0 z-50 ">
        <button
          onClick={() => setFull3DScreen(!full3DScreen)}
          className="bg-white hover:bg-gray-300-300 mx-3 focus:outline-none focus:border-none rounded-full float-right p-2"
        >
          <img
            className="h-8 w-8 bg-white focus:outline-none focus:border-none"
            src={` ${full3DScreen ? 'https://cdn-icons-png.flaticon.com/128/7398/7398301.png' :' https://static.thenounproject.com/png/577796-200.png'}`}
            alt="size"
          />
        </button>
        <button
          className="rounded-full"
          onClick={() => resetAlert(setResetFlag)}
        >
         <img src="https://cdn-icons-png.flaticon.com/128/2618/2618245.png" alt="reset"
           className="h-10 w-10 bg-white rounded-full"
         />
        </button>
        </div>
        {gameLevel === 1 && (
          <ThreeDMatrix
            {...gamesConfig.gameConfigOne}
            resetFlag={resetFlag}
            setResetFlag={setResetFlag}
            showHint={showHint}
            setShowHint={setShowHint}
          />
        )}
        {gameLevel === 2 && (
          <ThreeDMatrix
            {...gamesConfig.gameConfigTwo}
            resetFlag={resetFlag}
            setResetFlag={setResetFlag}
            showHint={showHint}
            setShowHint={setShowHint}
          />
        )}
        {gameLevel === 3 && (
          <ThreeDMatrix
            {...gamesConfig.gameConfigThree}
            resetFlag={resetFlag}
            setResetFlag={setResetFlag}
            showHint={showHint}
            setShowHint={setShowHint}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
