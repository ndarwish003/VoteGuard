"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CardDataStats from "../../components/CardDataStats";

const EventList: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showThankYou, setShowThankYou] = useState(false);
  const [events, setEvents] = useState([
    { id: 1, title: "Election 1", date: "9.11.2024", time: "5h" },
    { id: 2, title: "Election 2", date: "10.11.2024", time: "3h" },
    { id: 3, title: "Election 3", date: "11.11.2024", time: "7h" },
    { id: 4, title: "Election 4", date: "19.11.2024", time: "5h" },
    { id: 5, title: "Election 5", date: "20.11.2024", time: "3h" },
    { id: 6, title: "CSC President Election", date: "23.12.2024", time: "3h" },
    { id: 7, title: "Drop CS365", date: "24.12.2024", time: "3h" },
    { id: 8, title: "Postpone CS101 Exam", date: "22.2.2025", time: "3h" },
  ]);

  useEffect(() => {
    
    document.title = "VoteGuard | Dashboard";
  
    if (searchParams.get("thankYou") === "true") {
      setShowThankYou(true);
    }

    // Load voted events from localStorage on component mount
    const storedVotedEvents = localStorage.getItem('votedEvents');
    if (storedVotedEvents) {
      const parsedEvents = JSON.parse(storedVotedEvents);
      // Filter events that have already been voted for
      setEvents((prevEvents) =>
        prevEvents.filter((event) => !parsedEvents.some((votedEvent) => votedEvent.id === event.id))
      );
    }
  }, [searchParams]);

  const handleVote = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      // Redirect to the election page first
      router.push(`/electionpage`);

      // Update voted events in localStorage
      const updatedVotedEvents = JSON.parse(localStorage.getItem('votedEvents') || '[]');
      updatedVotedEvents.push(event);
      localStorage.setItem('votedEvents', JSON.stringify(updatedVotedEvents));

      // Update events state (remove voted event)
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId));
    }
  };

  const dismissThankYou = () => {
    setShowThankYou(false);
  };

  return (
    <>
      <section id="about" className="pt-16 md:pt-20 lg:pt-28 mb-20" style={{marginBottom:'500px'}}>
        <div className="container">
          {/* Thank You Message */}
          {showThankYou && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md flex justify-between items-center">
              <span>Thank you for your vote!</span>
              <button
                className="text-red-500 hover:underline ml-4"
                onClick={dismissThankYou}
              >
                Dismiss
              </button>
            </div>
          )}

          <h1 className="text-3xl font-bold text-black dark:text-white mb-20 mt-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-20">
            {/* Added mb-8 for space below the grid */}
            {events.map((event) => (
              <div
                key={event.id}
                className="border border-black dark:border-white border-body-color/[.15] rounded-md p-6 max-w-xs mx-auto"
              >
                <button
                  className="w-full rounded px-3 font-medium text-black bg-gray-200 hover:bg-[#345beb] hover:text-white transition-all duration-300 ease-in-out dark:text-white dark:bg-gray-800 dark:hover:bg-[#345beb]"
                  onClick={() => handleVote(event.id)}
                >
                  <CardDataStats
                    title={event.title}
                    date={`date: ${event.date}`}
                    time={`voting time: ${event.time}`}
                    className=""
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventList;