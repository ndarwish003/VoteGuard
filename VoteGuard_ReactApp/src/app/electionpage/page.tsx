"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const VotingForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [voteStatus, setVoteStatus] = useState("");
  const [undoTimer, setUndoTimer] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage confirmation dialog visibility
  const router = useRouter();

  const options = [
    {
      id: "option1",
      label: "Option 1",
      image: "https://th.bing.com/th/id/R.54d2fa733864f398bfc32b58f59199c7?rik=pEWjjhSaGkaH9A&pid=ImgRaw&r=0",
    },
    {
      id: "option2",
      label: "Option 2",
      image: "https://th.bing.com/th/id/R.54d2fa733864f398bfc32b58f59199c7?rik=pEWjjhSaGkaH9A&pid=ImgRaw&r=0",
    },
    {
      id: "option3",
      label: "Option 3",
      image: "https://th.bing.com/th/id/R.54d2fa733864f398bfc32b58f59199c7?rik=pEWjjhSaGkaH9A&pid=ImgRaw&r=0",
    },
    {
      id: "option4",
      label: "Option 4",
      image: "https://th.bing.com/th/id/R.54d2fa733864f398bfc32b58f59199c7?rik=pEWjjhSaGkaH9A&pid=ImgRaw&r=0",
    },
  ];

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const handleVote = () => {
    if (selectedOption) {
      setVoteStatus(`You have successfully voted for ${selectedOption}!`);
      setIsSubmitted(true);
      setUndoTimer(true);
      const timerId = setTimeout(() => {
        setUndoTimer(false);
        router.push("/User-Dashboard");
      }, 5000);
      setTimer(timerId);
    } else {
      setVoteStatus("Please select an option before submitting your vote.");
    }
  };

  const handleUndo = () => {
    setVoteStatus("");
    setSelectedOption("");
    setUndoTimer(false);
    setIsSubmitted(false);
    clearTimeout(timer);
  };

  const handleConfirmation = () => {
    // Show confirmation dialog when submitting
    if (selectedOption) {
      setShowConfirmation(true);
    } else {
      setVoteStatus("Please select an option before submitting your vote.");
    }
  };

  const handleConfirmYes = () => {
    // Call handleVote when user confirms
    handleVote();
    // Redirect to '/thank-you' after confirming
    router.push("/User-Dashboard?thankYou=true");
  };

  const handleConfirmNo = () => {
    // Hide confirmation dialog when user clicks "No"
    setShowConfirmation(false);
  };

  return (
    <div className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[700px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Register Your Vote
              </h3>
              <div className="flex justify-end text-sm text-gray-600 pr-4 pt-2 sm:text-1xl dark:text-white">
                {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
              </div>

              <div className="px-5 py-6">
                <div className="border p-4 rounded mb-4">
                  <p className=" sm:text-2xl text-center text-gray-600 mb-2 dark:text-white">
                    <strong>Ballot Question</strong>
                  </p>

                  <div className="space-y-4">
                    {options.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedOption === option.label
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                        onClick={() => setSelectedOption(option.label)}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="voteOption"
                            value={option.label}
                            checked={selectedOption === option.label}
                            onChange={() => setSelectedOption(option.label)}
                            className="form-radio h-5 w-5 text-blue-600 mr-3"
                          />
                          <span className="text-gray-700 font-medium">{option.label}</span>
                        </div>

                        <img
                          src={option.image}
                          alt={option.label}
                          className="w-12 h-12 rounded-full ml-4"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {voteStatus && (
                  <div
                    className={`text-center p-4 mb-4 ${
                      voteStatus.includes("successfully") ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <strong>{voteStatus}</strong>
                  </div>
                )}

                {undoTimer && (
                  <div className="text-center mb-4">
                    <button
                      onClick={handleUndo}
                      className="bg-yellow-500 text-white py-2 px-4 rounded"
                    >
                      Undo
                    </button>
                  </div>
                )}

                {!isSubmitted && (
                  <button
                    onClick={handleConfirmation}
                    className="w-full bg-primary text-white py-3 rounded text-center font-semibold hover:bg-primary/90 transition-all duration-200"
                  >
                    SUBMIT YOUR VOTE
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center dark:text-black">
            <p className="text-xl mb-4 dark:text-black">Are you sure you'd like to proceed with your vote?</p>
            <div className="flex justify-around">
              <button
                onClick={handleConfirmYes}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400"
              >
                Yes
              </button>
              <button
                onClick={handleConfirmNo}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute left-0 top-0 z-[-1]">
        <svg
          width="1440"
          height="969"
          viewBox="0 0 1440 969"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_95:1005"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1440"
            height="969"
          >
            <rect width="1440" height="969" fill="#090E34" />
          </mask>
          <g mask="url(#mask0_95:1005)">
            <path
              opacity="0.1"
              d="M1086.96 297.042C1037.58 386.143 970.19 444.366 905.262 513.17C840.335 581.973 768.86 661.014 676.022 699.704C583.184 738.395 479.563 736.697 374.43 691.289C269.296 645.88 155.982 556.679 55.4869 462.946C-45.0082 369.214 -68.2058 269.507 -73.3952 169.325L-73.3951 0.337051L1440 0.337051L1440 297.042L1086.96 297.042Z"
              fill="url(#paint0_linear_95:1005)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default VotingForm;