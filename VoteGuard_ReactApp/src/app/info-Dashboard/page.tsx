import { Package } from "@/types/package";

const packageData: Package[] = [
    {
        name: "Voting topic",
        votingDate: `Jan 13,2023`,
        status: "voted",
    },
    {
        name: "Voting topic",
        votingDate: `Jan 13,2023`,
        status: "voted",
    },
    {
        name: "Voting topic",
        votingDate: `Jan 13,2023`,
        status: "Unvoted",
    },
    {
        name: "Voting topic",
        votingDate: `Jan 13,2023`,
        status: "Unvoted",
    }, {
        name: "Voting topic",
        votingDate: `Jan 13,2023`,
        status: "voted",
    },
  
];

const TableThree = () => {
    return (
        <>
            <section id="about" className="pt-16 md:pt-20 lg:pt-28 mb-20 min-h-[500px]">
                <div className="container">
                    <div className=" border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28 mb-1 overscroll-contain max-h-[600px] overflow-scroll">
                        <div className="max-w-full ">
                            <table className="w-full table-auto ">
                                <thead>

                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="text-title-md font-bold text-black dark:text-white min-w-[220px] px-10 py-4">
                                            Voting topic
                                        </th>
                                        <th className="text-title-md font-bold text-black min-w-[220px] px-4 py-4 dark:text-white">
                                            voting Date
                                        </th>
                                        <th className="text-title-md font-bold text-black min-w-[220px] px-4 py-4 dark:text-white">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packageData.map((packageItem, key) => (
                                        <tr key={key}>
                                            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11 ">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    {packageItem.name}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {packageItem.votingDate}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                <p
                                                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${packageItem.status === "voted" ?
                                                        "bg-[#219653] text-[#219653]"
                                                        : "bg-[#D34053] text-[#D34053]"
                                                        }`}
                                                >
                                                    {packageItem.status}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-1">

                        </div>

                    </div>

                </div>
            </section>
        </>
    );
};

export default TableThree;