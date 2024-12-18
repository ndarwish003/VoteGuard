"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdmin } from "context/AuthContext";

const SigninPage = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const router = useRouter(); 
  const {setAdmin} = useAdmin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" && password === "") 
    {
      setError("Please enter your credentials.");
      return;
    }
    
    // These are dummy data used for demonstrating the prototype
    // However, the real system will retrieve and handle user credentials via the database
    if (email === "s2182161465@ku.edu.kw" && password === "password") 
    {
      router.push("/BiometricAuth");
    }

    else if (email === "admin1@voteguard.com" && password === "admin1") 
    {
      setAdmin(true);
      router.push("/Admin-Dashboard");
    }
    
    else 
    {
      setError("Invalid email or password."); 
      return;
    }
      
  };

  useEffect(() => {
    document.title = "VoteGuard | Sign In";
  }, []);
  
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-10 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign in to your account
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-8 mt-10">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your Email"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Update email state
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Update password state
                    />
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div> // Show error if invalid credentials
                  )}
                  <div className="mb-6">
                      <button
                        type="submit"
                        className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
                        onClick={handleSubmit}
                      >
                        Sign in
                      </button>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  Don’t have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;