import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  date: string;
  time: string;
  className: string;

}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  date,
  time,
  className,
}) => {
  return (
    <div className={` rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark ${className}`} >


      <div className="mt-4 flex items-end justify-between ">
        <div className="">
          <h4 className="text-title-md font-bold text-black dark:text-white ">
            {title}
          </h4>
          <p className="text-sm font-medium">{date}</p>
          <span className="text-sm font-medium">
            {time}
          </span>
        </div>

      </div>
    </div >
  );
};

export default CardDataStats;
