"use client";
import dynamic from "next/dynamic";
import React from "react";
import CardDataStats from "../CardDataStats";

// const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
//   ssr: false,
// });

const EventList: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-10">

        <CardDataStats title="VOTING TITLE" date="date: 9.11.2024" time='voting time :5h' className='' >

        </CardDataStats>
      </div>

      <div >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-1">

          <CardDataStats title="VOTING TITLE" date="NOW" time='voting time :5h' className='bg-cyan-500 text-black-2 hover:p-9 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>

          </CardDataStats>
        </div>

      </div>
    </>
  );
};

export default EventList;

// 
