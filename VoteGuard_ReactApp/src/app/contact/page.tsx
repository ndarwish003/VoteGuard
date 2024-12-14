"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { useEffect } from "react";

const ContactPage = () => {

  useEffect(() => {
    document.title = "VoteGuard | Contact Us";
  }, []);

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
