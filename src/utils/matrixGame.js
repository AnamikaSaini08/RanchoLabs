import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Model } from "../Components/Roboting";
import { Suspense } from "react";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial";
import ThreeDRobot from "../Components/ThreeDRobot";

export const initialMatrixConfiguration = (
  row,
  col,
  batteryPosition,
  obstaclePosition,
  robotStartPosition,
  robotEndPosition,
  robotPositionRef,
  sceneRef,
  cameraRef,
  rendererRef,
  containerRef,
  cylinderRef,
  robot,
  filterBatteryPosition,
  setFilteredBatteryPosition,
  robotPosition
) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth / 2, window.innerHeight);
  containerRef.current.appendChild(renderer.domElement);

  const cellHeight = 2;
  const cellWidth = 4;
  const chessboard = [];

  for (let i = 1; i <= row; i++) {
    for (let j = 1; j <= col; j++) {
      const geometry = new THREE.PlaneGeometry(cellWidth, cellHeight);
      const material = new MeshBasicMaterial({
        color: (i + j) % 2 === 0 ? "blue" : "white",
        side: THREE.DoubleSide
      });
      const square = new THREE.Mesh(geometry, material);
      square.position.x = (j - col / 2) * cellWidth; // Modify to use col instead of row
      square.position.y = (i - row / 2) * cellHeight; // Modify to use row instead of col
      chessboard.push(square);
      scene.add(square);

      // Obstacle Condition
      if (
        obstaclePosition &&
        obstaclePosition.some((coor) => coor[0] === i && coor[1] === j)
      ) {
        const obstacleGeometry = new THREE.BoxGeometry(2, 1.5, 2);
        const obstacleMaterial = new MeshBasicMaterial({
          color: "brown"
        });
        const cube = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
        cube.position.x = square.position.x;
        cube.position.z += 1;
        cube.position.y = square.position.y;
        scene.add(cube);
        continue;
      }
      // Robot Position
      if (i === robotPosition.x && j === robotPosition.y) {
        const robotComponent = (
          <group position={[square.position.x, square.position.y, 0]}>
            <Html>
              <Canvas>
                <Suspense fallback={null}>
                  <ThreeDRobot />
                </Suspense>
              </Canvas>
            </Html>
          </group>
        );
        scene.add(robotComponent);
        continue;
      }

      // Battery Position
      if (filterBatteryPosition && filterBatteryPosition.length > 0) {
        filterBatteryPosition.forEach((coor) => {
          if (coor[0] === i && coor[1] === j) {
            const geometry = new THREE.CylinderGeometry(0.7, 0.7);
            const material = new MeshBasicMaterial({
              color: "red",
              transparent: true
            });
            const cylinder = new THREE.Mesh(geometry, material);
            cylinder.position.x = square.position.x;
            cylinder.position.y = square.position.y;
            cylinder.position.z += 1;
            scene.add(cylinder);
            // I want each cylinder to rotate, so have to make a separate cylinderRef for each.
            const cylinderRef = {
              current: cylinder
            };

            const animateCylinder = () => {
              cylinderRef.current.rotation.z += 0.01;
              renderer.render(scene, camera);
              requestAnimationFrame(animateCylinder);
            };

            animateCylinder();
            return () => {
              cancelAnimationFrame(animateCylinder);
              scene.clear();
            };
          }
        });
      }
    }
  }

  camera.position.z = 20;
  //camera.up.set(0, 0, 5); // Set camera up direction to the positive z-axis (horizontal)
  //scene.rotation.x = -Math.PI / 5; // Rotate the scene by 90 degrees around the x-axis

  sceneRef.current = scene;
  cameraRef.current = camera;
  rendererRef.current = renderer;
};
