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
  },
];

const TableThree = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Voting topic
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                voting Date
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
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
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${packageItem.status === "voted" ? "bg-success text-success"
                      : "bg-danger text-danger"
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
  );
};

export default TableThree;
