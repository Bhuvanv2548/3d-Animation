import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

function Character({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={0.5} />;
}

export default function CharacterSelection() {
  const [selectedModel, setSelectedModel] = React.useState(
    "/models/Astronaut.glb"
  );

  return (
    <div>
      <div className="character-selection">
        <button onClick={() => setSelectedModel("/models/Astronaut.glb")}>
          Character 1
        </button>
        <button onClick={() => setSelectedModel("/models/Adventurer.glb")}>
          Character 2
        </button>
        {/* <button onClick={() => setSelectedModel('/models/character3.glb')}>Character 3</button> */}
      </div>
      <Canvas style={{ height: "100vh", background: "#272727" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Character modelPath={selectedModel} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
