"use client";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useEffect } from "react";
import { Metadata } from "next";

const AboutPage = () => {

  useEffect(() => {
    document.title = "VoteGuard | About";
  }, []);

  return (
    <>
      <Breadcrumb
        pageName="About Us"
        description="VoteGuard is a secure and transparent e-voting platform designed to empower academic institutions with reliable and user-friendly digital voting solutions. Our system ensures confidentiality, integrity, and accessibility for all users, fostering trust and fairness in every election."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;