/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.5 scene.gltf
Author: l0wpoly (https://sketchfab.com/l0wpoly)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/robot-80a736ddac1044299b134cfcca87c7f9
Title: Robot
*/
//clockwise - -ve

import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { addHintInstruction, resetBlocklyInstruction } from "../utils/blocklyInstructionSlice";
import { increaseGameLevel } from "../utils/gameLevelSlice";
import { handleGameResult, showHintFunction } from "../utils/constant";

const boxOffset = 5;
const checkBatteryPosition = (
  filterBatteryPosition,
  setFilterBatteryPosition,
  position,
  setDeleteCoorBattery,
  batteryCapture,
  setBatteryCapture,
  isBatteryX,
  isBatteryZ
) => {
  const tempfilterBatteryPosition = filterBatteryPosition.filter(([x, y]) => {
    const isDeleted =
      x - boxOffset - 0.5 === isBatteryX &&
      -(y - boxOffset - 0.5) === isBatteryZ;
    if (isDeleted) {
      setDeleteCoorBattery([isBatteryX, isBatteryZ]);
    }
    return !isDeleted;
  });
  setFilterBatteryPosition(tempfilterBatteryPosition);
};

export function Robot(props) {
  const group = useRef();
  const {
    row,
    col,
    robotStartPosition,
    robotEndPosition,
    batteryPosition,
    filterBatteryPosition,
    setFilterBatteryPosition,
    obstaclePosition,
    resetFlag,
    setResetFlag,
    setDeleteCoorBattery,
    isWin,
    setIsWin,
    cameraPosition,
    setCameraPosition,
    tryCount,
    setTryCount,
    hintArray,
    showHint,
    setShowHint,
    hintNextButton
  } = { ...props };

  const { nodes, materials, animations } = useGLTF("./Assets/robot/scene.gltf");
  const { actions, names } = useAnimations(animations, group);
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the current direction
  const stepDistance = 0.01; // Distance to move in each animation step
  const [batteryCapture, setBatteryCapture] = useState(0);
  const [isNextLevel , setIsNextLevel] = useState(false);

  const [position, setPosition] = useState({
    x: robotStartPosition.x - boxOffset - 0.5,
    y: 0.27,
    z: -(robotStartPosition.y - boxOffset - 0.5),
  });

  let blocklyInstruction = useSelector(
    (store) => store.blocklyInstruction.blockInstructionArray
  );
  const alertShown = useRef(false);
  const robotDirectionRef = useRef("TOP");
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);

   useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, []);

  useEffect(()=>{
    if(showHint){
      dispatch(resetBlocklyInstruction());
      setTimeout(()=>{
        dispatch(addHintInstruction(hintArray));
      },3000);
    }
  },[showHint,hintArray])

  useEffect(() => {
    const { current: dispatch } = dispatchRef;
    if (isNextLevel) {
      setCurrentIndex(0);
      setBatteryCapture(0);
      setIsWin(false);
      setResetFlag(false);
      setDeleteCoorBattery([]);
      setFilterBatteryPosition(batteryPosition);
      dispatch(increaseGameLevel());
      dispatch(resetBlocklyInstruction());
      setIsNextLevel(false);
      setShowHint(false);
    }
  }, [isNextLevel,hintNextButton?.current]);

  useFrame(() => {
    const mesh = group.current;
    if (resetFlag) {
      setPosition({
        x: robotStartPosition.x - boxOffset - 0.5,
        y: 0,
        z: -(robotStartPosition.y - boxOffset - 0.5),
      });
      mesh.position.x = position.x;
      mesh.position.z = position.z;
      setCurrentIndex(0);
      setResetFlag(false);
      alertShown.current = false;
      dispatch(resetBlocklyInstruction());
    }

    if (
      !alertShown.current &&
      blocklyInstruction.length &&
      currentIndex >= blocklyInstruction.length &&
      !resetFlag
    ) {
      if (filterBatteryPosition.length) {
        setTryCount(tryCount+1);
        setTimeout(() => {
          setIsWin(false);
          if(tryCount >= 2){
            showHintFunction(setShowHint);
          }else{
            handleGameResult(
              "Oopss..",
              "You Fail. Try Again!!",
              "warning",
              "Try Again",
              "Hint"
            );
          }
        }, 2000);
      } else {
       !showHint && setTimeout(() => {
          setIsWin(true);
          handleGameResult(
            "Hurrah",
            "You won the level!",
            "success",
            "Next",
            null,
            setIsNextLevel,
          );
        }, 2000);
      }
      setCameraPosition([position]);
      alertShown.current = true;
    }
  
    let direction;
    // Calculate the current direction
    if (
      alertShown.current === false &&
      currentIndex < blocklyInstruction.length
    ) {
      direction = blocklyInstruction[currentIndex];
      if (robotDirectionRef.current === "LEFT") {
        if (direction === "FORWARD") {
          if (
            (mesh.position.x < -(boxOffset - 0.5) && !alertShown.current) ||
            obstaclePosition.some(([x, y]) => {
              return (
                x - boxOffset - 0.5 === position.x - 1 &&
                -(y - boxOffset - 0.5) === position.z
              );
            })
          ) {
            alertShown.current = true;
            alert("Game End");
            return;
          }
          checkBatteryPosition(
            filterBatteryPosition,
            setFilterBatteryPosition,
            position,
            setDeleteCoorBattery,
            batteryCapture,
            setBatteryCapture,
            position.x - 1,
            position.z
          );
          mesh.position.x -= stepDistance;
          if (mesh.position.x < position.x - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setPosition({ ...position, x: position.x - 1 });
          }
        } else if (direction === "BACKWARD") {
          if (
            (mesh.position.x > boxOffset - 0.5 && !alertShown.current) ||
            obstaclePosition.some(
              ([x, y]) =>
                x - boxOffset - 0.5 === position.x + 1 &&
                -(y - boxOffset - 0.5) === position.z
            )
          ) {
            alertShown.current = true;
            alert("Game End");
            return;
          }
          mesh.position.x += stepDistance;
          checkBatteryPosition(
            filterBatteryPosition,
            setFilterBatteryPosition,
            position,
            setDeleteCoorBattery,
            batteryCapture,
            setBatteryCapture,
            position.x + 1,
            position.z
          );
          if (mesh.position.x > position.x + 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setPosition({ ...position, x: position.x + 1 });
          }
        } else if (direction === "LEFT") {
          robotDirectionRef.current = "BOTTOM";
          mesh.rotation.y += Math.PI / 2;
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else if (direction === "RIGHT") {
          robotDirectionRef.current = "TOP";
          setCurrentIndex((prevIndex) => prevIndex + 1);
          mesh.rotation.y -= Math.PI / 2;
        }
      } else if (robotDirectionRef.current === "RIGHT") {
        if (direction === "FORWARD") {
          if (
            (mesh.position.x > boxOffset - 0.5 && !alertShown.current) ||
            obstaclePosition.some(
              ([x, y]) =>
                x - boxOffset - 0.5 === position.x + 1 &&
                -(y - boxOffset - 0.5) === position.z
            )
          ) {
            alertShown.current = true;
            alert("Game End");
            return;
          }
          mesh.position.x += stepDistance;
          checkBatteryPosition(
            filterBatteryPosition,
            setFilterBatteryPosition,
            position,
            setDeleteCoorBattery,
            batteryCapture,
            setBatteryCapture,
            position.x + 1,
            position.z
          );
          if (mesh.position.x > position.x + 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setPosition({ ...position, x: position.x + 1 });
          }
        } else if (direction === "BACKWARD") {
          if (
            (mesh.position.x < -(boxOffset - 0.5) && !alertShown.current) ||
            obstaclePosition.some(
              ([x, y]) =>
                x - boxOffset - 0.5 === position.x - 1 &&
                -(y - boxOffset - 0.5) === position.z
            )
          ) {
            alertShown.current = true;
            alert("Game End");
            return;
          }
          mesh.position.x -= stepDistance;
          checkBatteryPosition(
            filterBatteryPosition,
            setFilterBatteryPosition,
            position,
            setDeleteCoorBattery,
            batteryCapture,
            setBatteryCapture,
            position.x - 1,
            position.z
          );
          if (mesh.position.x < position.x - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setPosition({ ...position, x: position.x - 1 });
          }
        } else if (direction === "LEFT") {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          robotDirectionRef.current = "TOP";
          mesh.rotation.y += Math.PI / 2;
        } else if (direction === "RIGHT") {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          robotDirectionRef.current = "BOTTOM";
          mesh.rotation.y -= Math.PI / 2;
        }
      } else if (robotDirectionRef.current === "TOP") {
        if (direction === "FORWARD") {
          if (
            (mesh.position.z < -boxOffset + 0.5 && !alertShown.current) ||
            obstaclePosition.some(
              ([x, y]) =>
                x - boxOffset - 0.5 === position.x &&
                -(y - boxOffset - 0.5) === position.z - 1
            )
          ) {
            alertShown.current = true;
            alert("Game End");
            return;
          }
          checkBatteryPosition(
            filterBatteryPosition,
            setFilterBatteryPosition,
            position,
            setDeleteCoorBattery,
            batteryCapture,
            setBatteryCapture,
            position.x,
            position.z - 1
          );
          mesh.position.z -= stepDistance;
          if (mesh.position.z < position.z - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setPosition({ ...position, z: position.z - 1 });
          }
        } else if (direction === "BACKWARD") {
          if (
            (mesh.position.z > boxOffset - 0.5 && !alertShown.current) ||
            obstaclePosition.some(
              ([x, y]) =>
                x - boxOffset - 0.5 === position.x &&
                -(y - boxOffset - 0.5) === position.z + 1
            )
          ) {
            alertShown.current = true;
            alert("Game End");
            return;
          }
          mesh.position.z += stepDistance;
          checkBatteryPosition(
            filterBatteryPosition,
            setFilterBatteryPosition,
            position,
            setDeleteCoorBattery,
            batteryCapture,
            setBatteryCapture,
            position.x,
            position.z + 1
          );
          if (mesh.position.z > position.z + 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setPosition({ ...position, z: position.z + 1 });
          }
        } else if (direction === "LEFT") {
          robotDirectionRef.current = "LEFT";
          mesh.rotation.y += Math.PI / 2;
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else if (direction === "RIGHT") {
          robotDirectionRef.current = "RIGHT";
          mesh.rotation.y -= Math.PI / 2;
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      } else if (robotDirectionRef.current === "BOTTOM") {
        if (direction === "FORWARD") {
          if (
            (mesh.position.z > boxOffset - 0.5 && !alertShown.current) ||
            obstaclePosition.some(
              ([x, y]) =>
                x - boxOffset - 0.5 === position.x &&
                -(y - boxOffset - 0.5) === position.z + 1
            )
          ) {
            alertShown.current = true;
            alert("Game End");
            return;
          }
          mesh.position.z += stepDistance;
          checkBatteryPosition(
            filterBatteryPosition,
            setFilterBatteryPosition,
            position,
            setDeleteCoorBattery,
            batteryCapture,
            setBatteryCapture,
            position.x,
            position.z + 1
          );
          if (mesh.position.z > position.z + 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setPosition({ ...position, z: position.z + 1 });
          }
        } else if (direction === "BACKWARD") {
          if (
            (mesh.position.z < -boxOffset + 0.5 && !alertShown.current) ||
            obstaclePosition.some(
              ([x, y]) =>
                x - boxOffset - 0.5 === position.x &&
                -(y - boxOffset - 0.5) === position.z - 1
            )
          ) {
            alertShown.current = true;
            alert("Game End");
            return;
          }
          mesh.position.z -= stepDistance;
          checkBatteryPosition(
            filterBatteryPosition,
            setFilterBatteryPosition,
            position,
            setDeleteCoorBattery,
            batteryCapture,
            setBatteryCapture,
            position.x,
            position.z - 1
          );
          if (mesh.position.z < position.z - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setPosition({ ...position, z: position.z - 1 });
          }
        } else if (direction === "LEFT") {
          robotDirectionRef.current = "RIGHT";
          mesh.rotation.y -= Math.PI / 2;
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else if (direction === "RIGHT") {
          robotDirectionRef.current = "LEFT";
          mesh.rotation.y += Math.PI / 2;
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      }
    }
  });

  return (
    <group
      ref={group}
      {...props}
      position={[
        robotStartPosition.x - boxOffset - 0.5,
        0,
        -(robotStartPosition.y - boxOffset - 0.5),
      ]}
      scale={2.2}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 2 * (Math.PI / 2)]}
        >
          <group name="robotfbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <group name="Object_6" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="hero" rotation={[-Math.PI / 2, 0, 0]} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.hero_texture}
                    skeleton={nodes.Object_7.skeleton}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./Assets/robot/scene.gltf");
