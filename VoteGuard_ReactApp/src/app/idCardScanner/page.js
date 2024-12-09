"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

const preprocessImage = (image) => {
  return image; // Placeholder for image preprocessing logic if needed
};

const IdCardScanner = () => {
  const router = useRouter(); // Initialize useRouter
  const webcamRef = useRef(null);
  const [scannedText, setScannedText] = useState("");
  const [cardDetails, setCardDetails] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleScanning = () => {
    setIsScanning((prev) => !prev);
    setScannedText("");
    setCardDetails(null);
    setError("");
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      processImage(imageSrc);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        processImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = (image) => {
    setLoading(true);
    const preprocessedImage = preprocessImage(image);
    Tesseract.recognize(preprocessedImage, "eng+ara", { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => {
        setScannedText(text);
        saveCardDetails(text);
      })
      .catch(() => {
        setError("Failed to process the image. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveCardDetails = (text) => {
    const details = extractDetailsFromText(text);
    setCardDetails(details);
  };

  const extractDetailsFromText = (text) => {
    const lines = text.split("\n");
    const name = extractField(lines, "الاسم:") || "Unknown";
    const college = extractField(lines, "الكلية:") || "Unknown";
    const studentId = extractPattern(text, /\b\d{10}\b/) || "Unknown";
    const civilId = extractPattern(text, /\b\d{12,15}\b/) || "Unknown";
    const issueDate = extractPattern(text, /\d{4}\/\d{4}|\d{2}\/\d{2}\/\d{4}|\d{2}-\d{2}-\d{4}/) || "Unknown";
    const university = text.includes("جامعة الكويت") ? "جامعة الكويت" : "Unknown";
    const studentType = text.includes("هوية طالب") ? "طالب" : "Unknown";

    return { studentType, university, name, college, studentId, civilId, issueDate };
  };

  const extractField = (lines, field) => {
    const line = lines.find((line) => line.includes(field)) || "";
    return line.replace(field, "").trim();
  };

  const extractPattern = (text, pattern) => {
    const match = text.match(pattern);
    return match ? match[0] : null;
  };

  const handleSubmit = () => {
    // Navigate to the next page
    router.push("/takecapture");
  };

  const isDetailsComplete = (details) => {
    return (
      details &&
      details.studentType === "طالب" &&
      details.university === "جامعة الكويت" &&
      details.name !== "Unknown" &&
      details.college !== "Unknown" &&
      details.studentId !== "Unknown" &&
      details.civilId !== "Unknown" &&
      details.issueDate !== "Unknown"
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-150 to-blue-250 py-12">
      <div className="flex flex-col items-center w-full max-w-md bg-blue-100 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">ID Card Scanner</h1>

        {isScanning ? (
          <div className="w-full">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg"
              videoConstraints={{ facingMode: "environment" }}
            />
            <button
              onClick={captureImage}
              disabled={loading}
              className="w-full mt-4 py-2 px-4 text-white bg-blue-900 rounded-lg disabled:bg-gray-400 hover:bg-blue-600"
            >
              {loading ? "Processing..." : "Capture ID Card"}
            </button>
          </div>
        ) : (
          <div className="w-full">
            <button
              onClick={toggleScanning}
              className="w-full py-2 px-4 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Start Scanning
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="w-full py-2 px-4 text-gray-700 bg-white border border-gray-300 rounded-lg"
            />
          </div>
        )}

        {cardDetails && (
          <div className="mt-6 w-full bg-blue-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Scanned Details</h2>
            <table className="w-full text-sm text-right">
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-black">{cardDetails.studentType}</td>
                  <td className="py-2 px-4 border-b text-black">: هوية</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-black">{cardDetails.university}</td>
                  <td className="py-2 px-4 border-b text-black">: جامعة</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-black">{cardDetails.name}</td>
                  <td className="py-2 px-4 border-b text-black">: الاسم</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-black">{cardDetails.college}</td>
                  <td className="py-2 px-4 border-b text-black">: الكلية</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-black">{cardDetails.studentId}</td>
                  <td className="py-2 px-4 border-b text-black">: رقم الطالب</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-black">{cardDetails.civilId}</td>
                  <td className="py-2 px-4 border-b text-black">: الرقم المدني</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-black">{cardDetails.issueDate}</td>
                  <td className="py-2 px-4 border-b text-black">: تاريخ الانتهاء</td>
                </tr>
              </tbody>
            </table>
            {isDetailsComplete(cardDetails) && (
              <button
                onClick={handleSubmit}
                className="mt-4 w-full py-2 px-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 w-full bg-red-100 p-2 text-sm text-red-600 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdCardScanner;
