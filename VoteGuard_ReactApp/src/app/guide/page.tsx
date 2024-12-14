"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useEffect } from "react";

const Guide = () => {
  useEffect(() => {
    document.title = "VoteGuard | Guide";
  }, []);

  return (
    <>
      <Breadcrumb
        pageName="Guidance Manual"
        description="Get to know how to securely participate in voting events with our comprehensive guide, offering step-by-step instructions on using the e-voting platform."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-center">How to Use the VoteGuard Platform</h1>
            <div className="space-y-6">
              <div className="step py-6">
                <h2 className="text-xl font-semibold mb-2">1. Log In</h2>
                <p>
                  Navigate to the <strong>login page</strong>, enter your credentials, and authenticate your identity using <strong>biometric authentication</strong> (e.g., fingerprint or facial recognition).
                </p>
              </div>

              <div className="step py-6">
                <h2 className="text-xl font-semibold mb-2">2. Access the Dashboard</h2>
                <p>
                  After logging in, you will be redirected to your <strong>dashboard</strong>, where you can view ongoing and upcoming voting events.
                </p>
              </div>

              <div className="step py-6">
                <h2 className="text-xl font-semibold mb-2">3. Select a Voting Event</h2>
                <p>
                  From your dashboard, click on the <strong>voting event</strong> you wish to participate in.
                </p>
              </div>

              <div className="step py-6">
                <h2 className="text-xl font-semibold mb-2">4. Cast Your Vote</h2>
                <p>
                  On the <strong>voting page</strong>, review the event details and available options. Make your choice by selecting your preferred candidate or option.
                </p>
              </div>

              <div className="step py-6">
                <h2 className="text-xl font-semibold mb-2">5. Submit Your Choice</h2>
                <p>
                  Confirm your selection and click <strong>"Submit"</strong> to securely record your vote.
                </p>
              </div>

              <div className="step py-6">
                <h2 className="text-xl font-semibold mb-2">6. Return to Dashboard</h2>
                <p>
                  After submitting your vote, you will be redirected to your <strong>dashboard</strong>, where you can see the status of the voting event.
                </p>
              </div>

              <div className="step py-6">
                <h2 className="text-xl font-semibold mb-2">7. View Your Voting History</h2>
                <p>
                  To view past participation, click on <strong>"History"</strong> in the navigation bar. This section provides a detailed log of all your voting activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Guide;