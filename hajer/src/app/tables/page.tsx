import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import TableThree from "@/components/Tables/TableThree";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "USER Dashboard",
  description:
    "USER Dashboard",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">

        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
