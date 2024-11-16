import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  date: string;
  time: string;
  className: string;

}
// mt-4 flex items-end justify-between
const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  date,
  time,
  className,
}) => {
  return (
    <div className={`font-bold text-black dark:text-white   ${className}`} >


      <div className=" ">
        <div className="p-7 text-left">
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
