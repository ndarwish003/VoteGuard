import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VoteGuard | Guide",
  description: "Guide Page",
};

const Guide = () => {
  return (
    <>
      <Breadcrumb
        pageName="Guidance Manual"
        description="Get to know how to securely participate in voting events with our comprehensive guide, offering step-by-step instructions on using the e-voting platform."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
        </div>
      </section>
    </>
  );
};

export default Guide;
