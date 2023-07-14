import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export function Coin({position,deleteCoorBattery,isStarToDelete,resetFlag,setResetFlag}) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./Assets/coin/scene.gltf");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]].play();
  }, [resetFlag]);
 
  useEffect(() => {
    if(shouldAnimate()){
      isStarToDelete.current = true;
    }
  }, [deleteCoorBattery]);

  const resetStar = () => {
    isStarToDelete.current = false;
  };
  useEffect(() => {
    if (resetFlag) {
      resetStar();
       actions[names[0]].play();
    }
  }, [resetFlag]);

  const shouldAnimate = () => {
    return (
      deleteCoorBattery.length &&
      position[0] === deleteCoorBattery[0] &&
      position[2] === deleteCoorBattery[1]
    );
  };

  const transition = isStarToDelete.current ? { delay:1.5, duration: 3, onStart: () => {
    actions[names[0]].play();
  }, } : null;
  return (
    <group ref={group} scale={3.6} position={[0, 0.5, 0]} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Root">
          {isStarToDelete.current ? (
              <motion.group
                name="star"
                scale={8}
                animate={{ y: 7, z: 2 }}
                transition={transition}
                initial={{ y: 0, z: 0 }}
              >
                <mesh
                  name="star_0"
                  geometry={nodes.star_0.geometry}
                  material={materials.glassesFrames}
                />
                <mesh
                  name="star_1"
                  geometry={nodes.star_1.geometry}
                  material={materials.lens}
                />
                <mesh
                  name="star_2"
                  geometry={nodes.star_2.geometry}
                  material={materials.Star}
                />
              </motion.group>
            ) : (
              <group name="star" scale={8}>
                <mesh
                  name="star_0"
                  geometry={nodes.star_0.geometry}
                  material={materials.glassesFrames}
                />
                <mesh
                  name="star_1"
                  geometry={nodes.star_1.geometry}
                  material={materials.lens}
                />
                <mesh
                  name="star_2"
                  geometry={nodes.star_2.geometry}
                  material={materials.Star}
                />
              </group>
            )}
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./Assets/coin/scene.gltf");