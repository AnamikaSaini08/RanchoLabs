import { Canvas } from "@react-three/fiber";
import Polyhedron from "./Polyhedron";
import * as THREE from "three";
import { Stats, OrbitControls } from "@react-three/drei";
import { Robot } from "./Robot";
import { DoubleSide } from "three";
import { useState, useRef } from "react";
import {Coin} from './Coin';
import {Space} from './BackgroundSpace';
import { Plane } from "./Plane";
import { SpaceTwo } from "./SpaceTwo";
const boxOffset=5;

function Box({ position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 0.6, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
function Star({ position,deleteCoorBattery,isStarToDelete,resetFlag,setResetFlag }) {
  return (
    <mesh position={position}>
      <Coin position={position} deleteCoorBattery={deleteCoorBattery} isStarToDelete={isStarToDelete} resetFlag={resetFlag} setResetFlag={setResetFlag}/>
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
  hintArray,
  resetFlag,
  setResetFlag,
  showHint,
  setShowHint,
}) => {
  const [filterBatteryPosition , setFilterBatteryPosition] = useState(batteryPosition);
  const [deleteCoorBattery,setDeleteCoorBattery] = useState([]);
  const [isWin , setIsWin] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([2, 5, 7]);
  const [tryCount , setTryCount] = useState(1);

  return (
    <div className="h-screen w-full bg-blue-700">
      <Canvas camera={{ position: cameraPosition }}>
        <ambientLight />
        <spotLight
          intensity={0.9}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
         <Space position={[0,4,-17]}/>
         <Plane position= {[-17,6,-20]}/>
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
          setDeleteCoorBattery ={setDeleteCoorBattery}
          isWin ={isWin}
          setIsWin ={setIsWin}
          cameraPosition={cameraPosition}
          setCameraPosition={setCameraPosition}
          tryCount ={tryCount}
          setTryCount={setTryCount}
          hintArray ={hintArray}
          showHint ={showHint}
          setShowHint ={setShowHint}
        />
        <OrbitControls enablePan={false}  
  minPolarAngle={0}
  maxPolarAngle={Math.PI / 2.5}/>
        <gridHelper args={[row, col, "red", "red", "red"]} />
        <mesh
          position={[0, -0.01, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[row, col, 2]}
        >
          <planeBufferGeometry />
          <meshBasicMaterial color="orange" side={DoubleSide} />
        </mesh>
        {obstaclePosition &&
          obstaclePosition.map((value, rowIndex) => {
            const x = value[0] - boxOffset - 0.5;
            const z = -(value[1] - boxOffset - 0.5);
            const position = [x, 0.3, z];
            return (
              <Box key={`${x}-${z}`} position={position} />
            );
          })}
          {batteryPosition &&
            batteryPosition.map((value, rowIndex) => {
            const x = value[0] - boxOffset - 0.5;
            const z = -(value[1] - boxOffset - 0.5);
            const position = [x, 0, z];
            const isStarToDelete = useRef(false);
            return (
              <Star position={position} deleteCoorBattery={deleteCoorBattery} isStarToDelete={isStarToDelete} resetFlag={resetFlag} setResetFlag={setResetFlag}/>
            );
          })}
        <Stats />
        <SpaceTwo position={[15,0,7]}/>
        <Space position={[0,4,27]}/>
      </Canvas>
    </div>
  );
};

export default ThreeDMatrix;