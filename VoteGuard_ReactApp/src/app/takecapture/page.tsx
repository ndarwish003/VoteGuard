"use client";
import React, { useRef, useState, useEffect } from "react";
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

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setCapturedImage(null);
    setUploadedImage(null);
  };
  
  const handleSubmit = () => {
    if (capturedImage || uploadedImage) 
    {
      const imageToSave = capturedImage || uploadedImage;
      saveImage(imageToSave, capturedImage ? "captured_image.jpg" : "uploaded_image.jpg");
      router.push("/BiometricAuth");
    } 
    else 
    {
      alert("Please capture or upload an image first!");
    }
  };

  useEffect(() => {
    document.title = "VoteGuard | Take Capture";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 lg:p-16 text-white">
      {showOption ? (
        <div className="text-center">
          <h1 className="text-black dark:text-white text-3xl font-bold mb-10">Choose an option for your image capture</h1>
          <div className="space-x-8">
            <button
              onClick={() => {
                setShowOption(false);
                setMode("capture");
              }}
              className="bg-[#4A6CF7] text-white py-2 px-8 rounded font-semibold hover:bg-[#3e1aab] hover:shadow-lg transition-all duration-200 mb-4"
              >
              Capture Photo
            </button>
            <button
              onClick={() => {
                setShowOption(false);
                setMode("upload");
              }}
              className="bg-[#4A6CF7] text-white py-2 px-4 rounded font-semibold hover:bg-[#3e1aab] hover:shadow-lg transition-all duration-200 mb-4"
              >
              Upload Photo
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center w-full max-w-3xl">
          <button
      onClick={() => {
        setShowOption(true);
        setCapturedImage(null); // Reset captured image
        setUploadedImage(null); // Reset uploaded image
      }}
      className="absolute top-4 left-4 text-black mt-24 ml-16 text-black dark:text-white font-semibold hover:text-[#4A6CF7] hover:underline transition-all duration-200"
    >
      &larr; Back
    </button>
            {mode === "capture" && (
              <>
                <h1 className="text-black dark:text-white text-3xl font-bold mb-6">
                  Take a Picture
                </h1>

                {!capturedImage ? (
                  // Display Webcam
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full max-w-md rounded-lg shadow-lg mb-6"
                  />
                ) : (
                  // Display Captured Image
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full max-w-md rounded-lg shadow-lg mb-6"
                  />
                )}

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                  {!capturedImage ? (
                    <button
                      onClick={capture}
                      className="bg-[#4A6CF7] text-white py-2 px-4 rounded font-semibold hover:bg-[#3e1aab] hover:shadow-lg transition-all duration-200"
                    >
                      Capture Photo
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setCapturedImage(null)} // Reset image for recapturing
                        className="bg-primary text-white py-2 px-4 rounded font-semibold hover:bg-[#3e1aab] transition-all duration-200"
                      >
                        Recapture
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-[#5f62fa] text-white py-2 px-4 rounded font-semibold hover:bg-[#3e1aab] hover:shadow-lg transition-all duration-200"
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
              </>
            )}

{mode === "upload" && (
      <>
        <h1 className="flex justify-center text-black dark:text-white text-3xl font-bold mb-10">
          Upload a Picture
        </h1>
        <div className="w-full max-w-md mb-6 mx-auto">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-gray-700 bg-white py-2 px-4 rounded shadow-lg"
          />
        </div>
      </>
    )}
    {(uploadedImage) && (
      <div className="flex justify-center flex-col items-center w-full max-w-3xl mt-8">
        <h2 className="text-xl font-bold mb-4">Selected Image:</h2>
        <img
          src={capturedImage || uploadedImage}
          alt="Selected"
          className="w-full max-w-md rounded-lg shadow-lg mb-6"
        />
        <button
          onClick={handleSubmit}
          className="bg-[#5f62fa] text-white py-2 px-4 rounded font-semibold hover:bg-[#3e1aab] hover:shadow-lg transition-all duration-200 mb-4"
        >
          Submit
        </button>
      </div>
    )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TakePicture;