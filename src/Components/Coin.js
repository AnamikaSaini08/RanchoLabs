import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export function Coin(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./Assets/coin/scene.gltf");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]].play();
  }, []);

  return (
    <group ref={group} scale={3} position={[0, 0.5, -1]} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Root">
            <motion.group name="star" scale={8}  initial={{y:0.27}}
                animate={{y:4}}
                transition={{
                  delay:2,
                  duration:3
                }}>
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
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./Assets/coin/scene.gltf");
