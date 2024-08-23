import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

function Character({ modelPath, animationName }) {
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);
  const ref = useRef();

  useEffect(() => {
    if (animations.length > 0) {
        console.log("Available animations:", animations.map(anim => anim.name));
      }

    if (actions) {
      // Stop all animations first
      Object.values(actions).forEach(action => action.stop());

      // Play the selected animation
      const action = actions[animationName];
      if (action) {
        action.play();
      } else {
        console.error(`Animation "${animationName}" not found.`);
      }
    }
  }, [actions, animationName]);

  return <primitive object={scene} ref={ref} scale={0.5} />;
}

export default Character;
