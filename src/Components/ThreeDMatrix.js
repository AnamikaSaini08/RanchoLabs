import { Canvas } from "@react-three/fiber";
import Polyhedron from "./Polyhedron";
import * as THREE from "three";
import { Stats, OrbitControls } from "@react-three/drei";
import { AnimatedRobot } from "./AnimatedRobot";
import { Robot } from "./Robot";
import { DoubleSide } from "three";
import { useState, useRef } from "react";
import {Coin} from './Coin';

function Box({ position }) {
  const boxRef = useRef();
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
function Star({ position }) {
  return (
    <mesh position={position}>
      <Coin/>
    </mesh>
  );
}
const ThreeDMatrix = ({
  row,
  col,
  batteryPosition,
  obstaclePosition,
  robotStartPosition,
  robotEndPosition,
  robotPositionRef,
  robotPosition,
  setRobotPosition,
  resetFlag,
  setResetFlag
}) => {
  const boxOffset = 5;
  const [filterBatteryPosition , setFilterBatteryPosition] = useState(batteryPosition);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <Canvas camera={{ position: [0, 6, 7] }}>
        <ambientLight />
        <spotLight
          intensity={0.9}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Robot
          row={row}
          col={col}
          robotStartPosition={robotStartPosition}
          robotEndPosition={robotEndPosition}
          batteryPosition={batteryPosition}
          filterBatteryPosition={filterBatteryPosition}
          setFilterBatteryPosition={setFilterBatteryPosition}
          obstaclePosition={obstaclePosition}
          resetFlag ={resetFlag}
          setResetFlag={setResetFlag}
        />
        <OrbitControls />
        <gridHelper args={[row, col, "red", "red", "red"]} />
        <mesh
          position={[0, -0.01, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[row, col, 1]}
        >
          <planeBufferGeometry />
          <meshBasicMaterial color="orange" side={DoubleSide} />
        </mesh>
        {obstaclePosition &&
          obstaclePosition.map((value, rowIndex) => {
            const x = value[0] - boxOffset - 0.5;
            const z = -(value[1] - boxOffset - 0.5);
            const position = [x, 0, z];
            return (
              <Box key={`${rowIndex}-${rowIndex + 1}`} position={position} />
            );
          })}
          {filterBatteryPosition &&
            filterBatteryPosition.map((value, rowIndex) => {
            const x = value[0] - boxOffset - 0.5;
            const z = -(value[1] - boxOffset - 0.5);
            const position = [x, 0, z];
            return (
              <Star key={`${x}-${z}`} position={position} />
            );
          })}
        <Stats />
      </Canvas>
    </div>
  );
};

export default ThreeDMatrix;
