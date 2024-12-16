"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import { AuthContext } from "context/AuthContext";

const BiometricAuth = () => {
  const { login } = useContext(AuthContext);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();
  const [authResult, setAuthResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const captureImage = async () => {
    setIsLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      try {
       
        if (!isRealPerson(imageSrc)) {
          alert("Please hold the camera steady and look directly at the lens.");
          setIsLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/authenticate", {
          method: "POST",
          body: JSON.stringify({ image: imageSrc }),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Authentication failed. Please try again.");
        }
        const result = await response.json();
        setAuthResult(result);

        
        if (result.authenticated) {
          login();
          router.push("/User-Dashboard");
        } 
      } catch (error) {
        console.error("Error during authentication:", error);
        alert("An error occurred during authentication. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading animation
      }
    }
  };


  const isRealPerson = (imageSrc) => {
    const img = new Image();
    img.src = imageSrc;

    const isStatic = analyzeImageForMovement(img);
    const eyeClosed = checkEyeClosure(img);

    return !isStatic && !eyeClosed;
  };

  const analyzeImageForMovement = (image) => {
    return false; 
  };

  const checkEyeClosure = (image) => {
    
    return false; 
  };

  useEffect(() => {

    document.title = "VoteGuard | Authentication";

    if (isLoading) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const scanLine = (y) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = "#007BFF";
        ctx.lineWidth = 2;
        ctx.stroke();

        if (y < canvas.height) {
          requestAnimationFrame(() => scanLine(y + 2));
        }
      };

      scanLine(0); // Start scanning from the top

      return () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Cleanup when unmounted
      };
    }
  }, [isLoading]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px", marginTop: "150px" }}>Biometric Authentication</h1>
      <div style={{ position: "relative", display: "inline-block" }}>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: "100%", maxWidth: "640px", border: "1px solid #ccc", borderRadius: "10px" }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        ></canvas>
      </div>
      <div>
        <button
          onClick={captureImage}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007BFF",
            color: "#FFF",
            borderRadius: "5px",
            border: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          {isLoading ? "Scanning..." : "Authenticate"}
        </button>
      </div>
      {authResult && (
        <div style={{ marginTop: "20px" }}>
          {authResult.authenticated ? (
            <h2 style={{ color: "#28A745" }}>Welcome, {authResult.name}!</h2>
          ) : (
            <h2 style={{ color: "#DC3545" }}>Authentication Failed. Please Try Again.</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default BiometricAuth;