"use client";
import dynamic from "next/dynamic";
import React from "react";
import CardDataStats from "../../components/CardDataStats";


const EventList: React.FC = () => {
    return (
        <>
            <section id="about" className="pt-16 md:pt-20 lg:pt-28 mb-20">
                <div className="container flex gap-20 ">
                    <div className=" border-body-color/[.15] pb-1 dark:border-white/[.15] md:pb-20 lg:pb-28  mb-1 ">
                        <button
                            className=" rounded border border-stroke px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="submit"
                        >
                            <CardDataStats title="VOTING TITLE" date="date: 9.11.2024" time='voting time :5h' className='' >

                            </CardDataStats>
                        </button>

                    </div>

                    <div className=" border-body-color/[.15] pb-1 dark:border-white/[.15] md:pb-20 lg:pb-28  mb-1">
                        <button
                            className=" rounded border border-stroke px-6 font-medium bg-primary text-gray hover:bg-opacity-90"
                            type="submit"
                        >
                            <CardDataStats title="VOTING TITLE" date="NOW" time='voting time :5h' className='' >

                            </CardDataStats>
                        </button>

                    </div>

                    <div className=" border-body-color/[.15] pb-1 dark:border-white/[.15] md:pb-20 lg:pb-28  mb-1">
                        <button
                            className=" rounded border border-stroke px-6 font-medium bg-primary text-gray hover:bg-opacity-90"
                            type="submit"
                        >
                            <CardDataStats title="VOTING TITLE" date="NOW" time='voting time :5h' className='' >

                            </CardDataStats>
                        </button>

                    </div>


                </div>
            </section>

        </>
    );
};

export default EventList;
