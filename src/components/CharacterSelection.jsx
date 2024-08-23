import { Canvas } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { curve, heroBackground } from "../assets";
import Character from "./Character";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import Section from "./Section";

export default function CharacterSelection() {
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [selectedAnimation, setSelectedAnimation] = useState("CharacterArmature|Run");
  
  const models = [
    "/models/Astronaut.glb",
    "/models/Adventurer.glb",
    // Add more models here
  ];

  const parallaxRef = useRef(null);

  const handlePrevModel = () => {
    setSelectedModelIndex((prevIndex) => 
      prevIndex === 0 ? models.length - 1 : prevIndex - 1
    );
  };

  const handleNextModel = () => {
    setSelectedModelIndex((prevIndex) => 
      (prevIndex + 1) % models.length
    );
  };

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            <span className="inline-block relative">
              3D GANS{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
        </div>

        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem] overflow-hidden">
              <Canvas 
                key={models[selectedModelIndex]}
                style={{ height: "70vh", background: "transparent" }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 5]} intensity={1} />
                <Character modelPath={models[selectedModelIndex]} animationName={selectedAnimation} />
              </Canvas>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <button onClick={handlePrevModel} className="bg-white text-black px-4 py-2 rounded">←</button>
                <button onClick={handleNextModel} className="bg-white text-black px-4 py-2 rounded">→</button>
              </div>
            </div>
          </div>

          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%] z-0 opacity-50">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          <BackgroundCircles />
        </div>

        <div className="relative z-1 mt-10">
          <div className="animation-selection flex justify-center space-x-4">
            <button onClick={() => setSelectedAnimation("CharacterArmature|Run")} className="bg-white text-black px-4 py-2 rounded">Run</button>
            <button onClick={() => setSelectedAnimation("CharacterArmature|Walk")} className="bg-white text-black px-4 py-2 rounded">Walk</button>
            <button onClick={() => setSelectedAnimation("CharacterArmature|Wave")} className="bg-white text-black px-4 py-2 rounded">Wave</button>
          </div>
        </div>
      </div>

      <Gradient />
      <BottomLine />
    </Section>
  );
}