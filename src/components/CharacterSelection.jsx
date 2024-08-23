import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { curve, heroBackground } from "../assets";
import Character from "./Character";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import Section from "./Section";

export default function CharacterSelection() {
  const navigate=useNavigate();
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [selectedAnimation, setSelectedAnimation] = useState("CharacterArmature|Run");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  
  const models = [
    "/models/Astronaut.glb",
    "/models/Adventurer.glb",
    "/models/Sci Fi Character.glb"
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

  const handleChooseCharacter = () => {
    setSelectedCharacter({
      model: models[selectedModelIndex],
      animation: selectedAnimation
    });
    // You can use this selectedCharacter state for further reference
    console.log("Selected character:", selectedCharacter);
    navigate('/character-selection/add', { state: { selectedCharacter } });
  };

  return (
    <Section
      style={{
        width:"400px",
        height:'500px'
      }}
      className="pt-[6rem] -mt-[8rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-10 max-w-[62rem] mx-auto text-center mb-8">
          <h1 className="h1 mb-4">
            <span className="inline-block relative">
              Select Character{" "}
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

        <BottomLine className="relative z-10 mb-8" />

        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem] overflow-hidden">
              <Canvas 
                key={models[selectedModelIndex]}
                style={{ height: "70vh", background: "transparent" }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 5]} intensity={1} />
                <Character style={{position:"relative", display:"flex",justifyContent:"center", alignItems:"center"}} modelPath={models[selectedModelIndex]} animationName={selectedAnimation} />
                
                {/* Animation buttons inside Canvas */}
                <Html position={[-1.75, -2.5, 0]}>
                  <div className="animation-selection flex justify-center space-x-4" >
                    <button onClick={() => setSelectedAnimation("CharacterArmature|Run")} className="bg-white text-black px-6 py-4 text-xl rounded">Run</button>
                    <button onClick={() => setSelectedAnimation("CharacterArmature|Walk")} className="bg-white text-black px-6 py-4 text-xl rounded">Walk</button>
                    <button onClick={() => setSelectedAnimation("CharacterArmature|Wave")} className="bg-white text-black px-6 py-4 text-xl rounded">Wave</button>
                  </div>
                </Html>
              </Canvas>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between" style={{marginBottom:"300px"}}>
                <button onClick={handlePrevModel} className="bg-white text-black px-6 py-4 rounded text-balance text-3xl">←</button>
                <button onClick={handleNextModel} className="bg-white text-black px-6 py-4 rounded text-3xl" >→</button>
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

        {/* Choose Character button */}
        {/* <Html position={[-10,-10,0]}> */}
        <div className="relative z-1 mt-10">
          <div className="flex justify-center">
            <button style={{position:"relative",top:"-80px",
                            size:"30px", backgroundColor:"white", color:"black", 
                            fontFamily:"sans-serif",fontSize:"30px", 
                            paddingBottom:"1rem",paddingTop:"1rem",paddingLeft:"2rem",paddingRight:"2rem",
                            boxSizing:"border-box",borderRadius:"0.25rem",fontWeight:"bold" }} 
            onClick={handleChooseCharacter} className="choose-character">
            Choose this Character
            </button>
          </div>
        </div>
        {/* </Html> */}
      </div>

      <Gradient />
    </Section>
  );
}