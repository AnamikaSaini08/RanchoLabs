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

  return (
    <div className="flex w-full ">
      <div className="w-1/2">
        <BlocklyComponent
          readOnly={false}
          trashcan={true}
          media={"media/"}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }}
          robotPositionRef={robotPositionRef}
          robotPosition={robotPosition}
          setRobotPosition={setRobotPosition}
        >
          <Block type="turn_block" />
          <Block type="move_block" />
        </BlocklyComponent>
      </div>
      <div className="w-1/2">
        <ThreeDMatrix
          {...gamesConfig.gameConfigOne}
          robotPositionRef={robotPositionRef}
          robotPosition={robotPosition}
          setRobotPosition={setRobotPosition}
        />
      </div>
    </div>
  );
};

export default Home;
