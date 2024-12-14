"use client";
import { useState, useEffect } from "react";

const TableThree = () => {
  const [votedEvents, setVotedEvents] = useState([]); 

  useEffect(() => {

    const storedVotedEvents = localStorage.getItem('votedEvents');

    if (storedVotedEvents) 
    {
      setVotedEvents(JSON.parse(storedVotedEvents)); 
    }

    document.title = "VoteGuard | History";
  }, []); 

  
  useEffect(() => {
  }, []);
  return (
    <>
      <section 
        id="about" 
        className="pt-16 md:pt-20 lg:pt-28 mb-20 min-h-[500px]"
      >
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-8">
            History
          </h1>
          {/* Wrapper with overflow auto for scroll containment */}
          <div className="border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28 mb-1 overscroll-contain max-h-[600px] overflow-auto">
            {/* Responsive table wrapper */}
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse table-fixed">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="text-title-md font-bold text-black dark:text-white px-10 py-4">
                      Voting Topic
                    </th>
                    <th className="text-title-md font-bold text-black px-4 py-4 dark:text-white">
                      Voting Date
                    </th>
                    <th className="text-title-md font-bold text-black px-4 py-4 dark:text-white">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {votedEvents.map((event, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {event.title} 
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {event.date}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium bg-[#219653] text-[#219653]"> 
                          Voted 
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty section for additional content */}
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-1"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TableThree;