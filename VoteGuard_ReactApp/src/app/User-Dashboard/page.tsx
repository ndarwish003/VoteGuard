"use client"; 
import React from "react"; 
import CardDataStats from "../../components/CardDataStats";  

const EventList: React.FC = () => { 
    return ( 
        <>             
            <section id="about" className="pt-16 md:pt-20 lg:pt-28 mb-20">                 
                <div className="container">                     
                    {/* Dashboard Title */}                     
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-8">                         
                        Dashboard                     
                    </h1>                      
                    {/* Card List */}                     
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Add grid classes here */}                         
                        {/* Card 1 */}                         
                        <div className="border border-black dark:border-white border-body-color/[.15] rounded-md p-6 max-w-xs mx-auto">                             
                            <button                                 
                                className="w-full rounded border border-stroke px-6 font-medium text-black hover:shadow-md dark:border-strokedark dark:text-white"                                 
                                type="submit"                             
                            >                                 
                                <CardDataStats                                     
                                    title="VOTING TITLE"                                     
                                    date="date: 9.11.2024"                                     
                                    time="voting time: 5h"                                     
                                    className=""                                 
                                />                             
                            </button>                         
                        </div>                          
                        {/* Card 2 */}                         
                        <div className="border border-black dark:border-white border-body-color/[.15] rounded-md p-6 max-w-xs mx-auto">                             
                            <button                                 
                                className="w-full rounded border border-stroke px-6 font-medium bg-primary text-gray hover:bg-opacity-90"                                 
                                type="submit"                             
                            >                                 
                                <CardDataStats                                     
                                    title="VOTING TITLE"                                     
                                    date="NOW"                                     
                                    time="voting time: 5h"                                     
                                    className=""                                 
                                />                             
                            </button>                         
                        </div>                          
                        {/* Card 3 */}                         
                        <div className="border border-black dark:border-white border-body-color/[.15] rounded-md p-6 max-w-xs mx-auto">                             
                            <button                                 
                                className="w-full rounded border border-stroke px-6 font-medium bg-primary text-gray hover:bg-opacity-90"                                 
                                type="submit"                             
                            >                                 
                                <CardDataStats                                     
                                    title="VOTING TITLE"                                     
                                    date="NOW"                                     
                                    time="voting time: 5h"                                     
                                    className=""                                 
                                />                             
                            </button>                         
                        </div>                     
                    </div>                 
                </div>             
            </section>         
        </>     
    ); 
};

export default EventList;