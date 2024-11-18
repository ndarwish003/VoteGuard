"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

const IdCardScanner = () => {
  const router = useRouter(); // Initialize router
  const [scannedText, setScannedText] = useState('');
  const [cardDetails, setCardDetails] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const webcamRef = useRef(null);

  const toggleScanning = () => {
    setIsScanning((prev) => !prev);
    setScannedText('');
    setCardDetails(null);
    setError('');
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      processImage(imageSrc);
    }
  };

  const processImage = (image) => {
    setLoading(true);
    Tesseract.recognize(image, 'eng+ara', { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => {
        setScannedText(text);
        saveCardDetails(text);
      })
      .catch((err) => {
        setError('Failed to process the image. Please try again.');
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
    const lines = text.split('\n');
    const name = extractName(lines);
    const studentId = extractStudentId(text);
    const civilId = extractCivilId(text);
    const college = extractCollege(lines); 
    const issueDate = extractIssueDate(text); 

    return {
      name: name,
      studentId: studentId,
      civilId: civilId,
      college: college,
      issueDate: issueDate,
    };
  };

  const extractName = (lines) => {
    const nameLine = lines.find(line => line.includes('الاسم:')) || '';
    return nameLine.replace('الاسم:', '').trim() || 'Unknown';
  };

  const extractStudentId = (text) => {
    const studentIdMatch = text.match(/\b\d{10}\b/);
    return studentIdMatch ? studentIdMatch[0] : 'Unknown';
  };

  const extractCivilId = (text) => {
    const civilIdMatch = text.match(/\b\d{12,15}\b/); 
    return civilIdMatch ? civilIdMatch[0] : 'Unknown';
  };

  const extractCollege = (lines) => {
    const collegeLine = lines.find(line => line.includes('الكلية:')) || '';
    return collegeLine.replace('الكلية:', '').trim() || 'Unknown';
  };

  const extractIssueDate = (text) => {
    const dateMatch = text.match(/(\d{4}\/\d{4}|\d{2}\/\d{2}\/\d{4}|\d{2}-\d{2}-\d{4})/);
    if (dateMatch) {
      return dateMatch[0];
    }
    return 'Unknown';
  };

  const handleSubmit = () => {
    console.log('Submitting:', cardDetails);
    router.push("/takecapture");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-101 to-blue-100 py-12">
      <div className="flex flex-col items-center justify-center w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/3 bg-blue-200 p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">ID Card Scanner</h1>

       
        <div className="w-full mb-6">
          {isScanning ? (
            <div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpg"
                width="100%"
                videoConstraints={{
                  facingMode: 'environment',
                }}
              />
              <button
                onClick={captureImage}
                disabled={loading}
                className="w-full mt-4 py-2 px-4 text-lg font-semibold text-white bg-blue-500 rounded-lg disabled:bg-gray-400 hover:bg-blue-600"
              >
                {loading ? 'Processing...' : 'Capture ID Card'}
              </button>
            </div>
          ) : (
            <div>
              <p className=" text-gray-800 mb-8">Click below to start scanning...</p>
              <button
                onClick={toggleScanning}
                className="w-full py-2 px-4 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Start Scanning
              </button>
            </div>
          )}
        </div>

       
        {cardDetails && (
          <div className="w-full mt-6 p-4 bg-blue-200 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-right">هویة طالب</h3>
            <table className="w-full text-right table-auto">
              <tbody>
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

            
            <button
              onClick={handleSubmit}
              className="mt-4 w-full py-2 px-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        )}

       
        {error && (
          <div className="w-full mt-6 p-4 bg-red-500 text-white rounded-lg">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdCardScanner;
