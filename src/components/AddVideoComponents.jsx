import React, { useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { curve, heroBackground } from "../assets";
import { BackgroundCircles, Gradient } from "./design/Hero";

export default function AddVideoComponent() {
    const [videoFile, setVideoFile] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [stream, setStream] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const location = useLocation();
    const { selectedCharacter } = location.state || {};

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'video/mp4') {
        setVideoFile(file);
      } else {
        alert('Please select a valid .mp4 file');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const startCapture = useCallback(async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const videoStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
      const combinedStream = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()]);
      
      setStream(combinedStream);
      videoRef.current.srcObject = combinedStream;
      
      const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => prev.concat(event.data));
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  }, []);

  const stopCapture = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }, [stream]);

  const handleAddVideo = useCallback(() => {
    if (isRecording) {
      stopCapture();
    } else if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      setVideoFile(new File([blob], "recorded-video.webm", { type: 'video/webm' }));
      setRecordedChunks([]);
    } else {
      startCapture();
    }
  }, [isRecording, recordedChunks, startCapture, stopCapture]);

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative w-screen h-screen bg-n-8 flex flex-col justify-center items-center">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <img
        src={heroBackground}
        className="w-full h-full object-cover opacity-50"
        alt="background"
      />
    </div>

    {/* Background Circles */}
    <div className="absolute w-screen h-screen inset-0 z-10 overflow-hidden">
      <BackgroundCircles />
    </div>

    {/* Content */}
    <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-4xl">
      <h1 className="text-6xl font-bold text-white text-center">
        <span className="inline-block relative">
          Add Video for Your Character
          <img
            src={curve}
            className="absolute top-full left-0 w-full"
            alt="Curve"
          />
        </span>
      </h1>

      <div className="bg-n-8 bg-opacity-100 p-12 rounded-3xl w-full mt-12">
        <div className="flex flex-col items-center space-y-6">
          <input
            type="file"
            accept="video/mp4"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <button
            onClick={handleChooseFile}
            className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg w-full max-w-md"
          >
            Choose .mp4 File
          </button>
          {videoFile && (
            <p className="text-white text-lg">Selected file: {videoFile.name}</p>
          )}
          <button
            onClick={handleAddVideo}
            className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg w-full max-w-md"
          >
            {isRecording ? 'Stop Recording' : (recordedChunks.length > 0 ? 'Save Recorded Video' : 'Start Recording')}
          </button>
          <div className="w-full max-w-md aspect-video bg-black rounded-xl overflow-hidden">
            <video 
              ref={videoRef} 
              style={{ display: isRecording ? 'block' : 'none' }} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Gradient */}
    <Gradient className="absolute inset-0 z-30 pointer-events-none" />
  </div>
);
}