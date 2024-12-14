"use client";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollingElements, setScrollingElements] = useState({
    features: 0,
    aboutOne: 0,
    aboutTwo: 0,
    testimonials: 0,
  });

  useEffect(() => {
    document.title = "VoteGuard | Home";

    const handleScroll = () => {
      const features = document.getElementById("features");
      const aboutOne = document.getElementById("aboutOne");
      const aboutTwo = document.getElementById("aboutTwo");
      const testimonials = document.getElementById("testimonials");

      const calculateOpacity = (element) => {
        if (element) 
        {
          return Math.max(0, Math.min(1, (window.scrollY + window.innerHeight - element.offsetTop) / (element.offsetHeight / 2)));
        }
        return 0;
      };

      setScrollingElements((prev) => ({
        ...prev,
        features: calculateOpacity(features),
        aboutOne: calculateOpacity(aboutOne),
        aboutTwo: calculateOpacity(aboutTwo),
        testimonials: calculateOpacity(testimonials),
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ScrollUp />
      <Hero />
      <Features id="features" style={{ opacity: scrollingElements.features, transition: 'opacity 0.3s ease-out' }} />
      <AboutSectionOne id="aboutOne" style={{ opacity: scrollingElements.aboutOne, transition: 'opacity 0.5s ease-out' }} />
      <AboutSectionTwo id="aboutTwo" style={{ opacity: scrollingElements.aboutTwo, transition: 'opacity 0.5s ease-out' }} />
      <Testimonials id="testimonials" style={{ opacity: scrollingElements.testimonials, transition: 'opacity 0.5s ease-out' }} />
    </>
  );
}