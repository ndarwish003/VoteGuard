import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VoteGuard | Contact Us",
  description: "Contact Us Page",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Feel free to reach out to us with any questions or feedback. Our team is here to assist you!"
      />
      <Contact />
    </>
  );
};

export default ContactPage;
