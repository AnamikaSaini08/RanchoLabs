import React, { useState, useRef, Suspense } from "react";
import BlocklyComponent, { Block } from "../Blockly";
import "../blocks/customblocks";
import "../generator/generator";
import { useSelector } from "react-redux";
import ThreeDMatrix from "./ThreeDMatrix";
//import ThreeDRobot from "./threeDRobot";

const Home = () => {
  const gamesConfig = useSelector((store) => store.matrixConfig);
  const robotPositionRef = useRef(gamesConfig.gameConfigOne.robotStartPosition);
  const [robotPosition, setRobotPosition] = useState(
    gamesConfig.gameConfigOne.robotStartPosition
  );
  const [resetFlag,setResetFlag] = useState(false);
  const [full3DScreen, setFull3DScreen] = useState(false);

  return (
    <div className="flex w-screen ">
      {!full3DScreen && <div className="w-1/2">
        <BlocklyComponent
          readOnly={false}
          trashcan={true}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true,
          }}
          robotPositionRef={robotPositionRef}
          robotPosition={robotPosition}
          setRobotPosition={setRobotPosition}
          setResetFlag={setResetFlag}
        >
          <Block type="turn_block" />
          <Block type="move_block" />
        </BlocklyComponent>
      </div>}
      <div  className={`${full3DScreen ? "w-screen" : " w-1/2"}`}>
        <ThreeDMatrix
          {...gamesConfig.gameConfigOne}
          robotPositionRef={robotPositionRef}
          resetFlag={resetFlag}
          setResetFlag={setResetFlag}
        />
        <button className="ml-96 bg-blue-500 px-3 py-3 text-center text-white text-bold" onClick={()=>setResetFlag(true)}>Reset</button>
        <button onClick={()=>setFull3DScreen(!full3DScreen)}
        className="bg-black text-white text-bold p-2 rounded-sm float-right mx-3">[  ]</button>
      </div>
    </div>
  );
};

export default Home;
