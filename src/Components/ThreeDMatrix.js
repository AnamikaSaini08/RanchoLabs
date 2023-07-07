import { Canvas } from "@react-three/fiber";
import Polyhedron from "./Polyhedron";
import * as THREE from "three";
import { Stats, OrbitControls } from "@react-three/drei";
import { Robot } from "./Robot";
import { DoubleSide } from "three";
import { useState } from "react";

const ThreeDMatrix = ({
  row,
  col,
  batteryPosition,
  obstaclePosition,
  robotStartPosition,
  robotEndPosition,
  robotPositionRef,
  robotPosition,
  setRobotPosition
}) => {
  const [directions, setDirections] = useState([]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Canvas camera={{ position: [0, 4, 10] }}>
        <ambientLight />
        <spotLight
          intensity={0.9}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Robot
          directions={directions}
          row={row}
          col={col}
          robotStartPosition={robotStartPosition}
          robotEndPosition={robotEndPosition}
          batteryPosition={batteryPosition}
          obstaclePosition={obstaclePosition}
        />
        <OrbitControls />
        <gridHelper args={[row, col, "brown", "brown", "brown"]} />
        <mesh
          position={[0, -0.01, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[row, col, 1]}
        >
          <planeBufferGeometry />
          <meshBasicMaterial color="#C4A484" side={DoubleSide} />
        </mesh>
        <Stats />
      </Canvas>
    </div>
  );
};

export default ThreeDMatrix;
