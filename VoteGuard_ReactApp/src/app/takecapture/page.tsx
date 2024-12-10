"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";

const TakePicture = () => {
  const router = useRouter();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showOption, setShowOption] = useState(true); 
  const [mode, setMode] = useState(""); 

  
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  /
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImage = (dataURL, fileName = "captured_image.jpg") => {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = fileName; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = () => {
    if (capturedImage || uploadedImage) {
      const imageToSave = capturedImage || uploadedImage;
      saveImage(imageToSave, capturedImage ? "captured_image.jpg" : "uploaded_image.jpg"); 
      router.push("/electionpage"); 
    } else {
      alert("Please capture or upload an image first!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-8 lg:p-16 text-white">
      {showOption ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Choose an Option</h1>
          <button
            onClick={() => {
              setShowOption(false);
              setMode("capture");
            }}
            className="bg-blue-800 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700 transition-all duration-200 mb-4"
          >
            Capture Photo
          </button>
          <button
            onClick={() => {
              setShowOption(false);
              setMode("upload");
            }}
            className="bg-green-600 text-white py-2 px-4 rounded font-semibold hover:bg-green-500 transition-all duration-200"
          >
            Upload Photo
          </button>
        </div>
      ) : (
        <div>
          {mode === "capture" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Take a Picture</h1>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full max-w-md rounded-lg shadow-lg mb-6"
              />
              <button
                onClick={capture}
                className="bg-blue-800 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700 transition-all duration-200 mb-6"
              >
                Capture Photo
              </button>
            </>
          )}
          {mode === "upload" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Upload a Picture</h1>
              <div className="w-full max-w-md mb-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-gray-700 bg-white py-2 px-4 rounded shadow-lg"
                />
              </div>
            </>
          )}

          {/* Display Selected Image */}
          {(capturedImage || uploadedImage) && (
            <div className="flex flex-col items-center w-full max-w-3xl">
              <h2 className="text-xl font-bold mb-4">Selected Image:</h2>
              <img
                src={capturedImage || uploadedImage}
                alt="Selected"
                className="w-full max-w-md rounded-lg shadow-lg mb-6"
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-800 text-white py-2 px-4 rounded font-semibold hover:bg-blue-500 transition-all duration-300 mb-6"
              >
                Submit
              </button>
            </div>
          )}
          <button
            onClick={() => setShowOption(true)}
            className="bg-gray-500 text-white py-2 px-4 rounded font-semibold hover:bg-gray-400 transition-all duration-200"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default TakePicture;
