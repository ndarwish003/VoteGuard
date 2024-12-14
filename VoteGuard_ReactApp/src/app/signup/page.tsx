"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [gender, setGender] = useState('');
  const [idError, setIdError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setconfirmPasswordError] = useState('');
  const [error, setError] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  
  const togglePrivacyModal = () => {
    setShowPrivacyModal((prev) => !prev);
  };
  
  // ID validation function
  const validateId = (id: string): string => {
    
    const idPattern = /^2\d{9}$/;  // Checks for 10 digits, starting with '2'
    
    if (!idPattern.test(id)) 
    {
      return "ID must be exactly 10 digits and start with '2'.";
    }

    return "";
  };

  // Email validation function: checks if the email is of the format "s{id}@ku.edu.kw"
  const validateEmail = (email: string, id: string): string => {
    
    const expectedEmail = `s${id}@ku.edu.kw`;
    
    if (email !== expectedEmail) 
    {
      return `Email must be "s{your_id}@ku.edu.kw"`;
    }

    return "";
  };

  // Password strength validation function
  const validatePasswordStrength = (password: string): string => {
    const minLength = 8;
    const maxLength = 16;
    const passwordStrengthPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*_]{8,16}$/;

    if (password.length < minLength || password.length > maxLength) 
    {
      return `Password must be between ${minLength} and ${maxLength} characters long.`;
    }

    if (!passwordStrengthPattern.test(password)) 
    {
      return "Password must include at least one letter, one number, and one special character.";
    }

    return "";
  };

  const validateConfirmPwd = (confirmPwd: string) : string => {
    if (password !== confirmPwd) 
    {
        setconfirmPasswordError("Passwords do not match.");
        return;
    }

    return "";
  }

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    setIdError(validateId(value));  // Validate ID on change
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value, id));  // Validate email on change
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePasswordStrength(value));  // Validate password on change
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setconfirmPasswordError(validateConfirmPwd(value));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fname || !lname || !id || !email || !password || !confirmPassword || !gender) 
    {
      setError("Please fill in all fields.");
      return;
    }
    const checkbox = document.getElementById("checkboxLabel") as HTMLInputElement;
    const privacyPolicyError = document.getElementById('privacyPolicyError') as HTMLDivElement;
  
    // Hide the error message initially
    privacyPolicyError.style.display = 'none';
  
    // Validate the checkbox
    if (!checkbox.checked) {
      setError("You must agree to the privacy policy.");
      privacyPolicyError.style.display = 'block'; // Show error message if not checked
      return; // Prevent form submission if validation fails
    }

    if (password !== confirmPassword) 
    {
      setconfirmPasswordError("Passwords do not match.");
      return;
    }

    if (!idError && !emailError && !passwordError) 
    {
      try 
      {
        const response = await fetch("http://127.0.0.1:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fname, lname, id, email, gender, password }),
        });

        const result = await response.json();

        if (response.ok) 
        {
          console.log("Success:", result);
          router.push("/idCardScanner");
        } 
        else 
        {
          setError(result.message || "Signup failed!");
        }
      } 
      
      catch (err) 
      {
        console.error("Error:", err);
        setError("An unexpected error occurred.");
      }
    } 
    
    else 
    {
      setError("Please enter your credentials correctly submitting.");
    }
  };

  useEffect(() => {
    document.title = "VoteGuard | Sign Up";
  }, []);
  
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[700px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your account
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-8 mt-10 flex gap-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="firstName"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="Enter your first name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="lastName"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        placeholder="Enter your last name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  <div className="mb-8 flex gap-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="ID"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        ID Number
                      </label>
                      <input
                        type="text"
                        name="ID"
                        required
                        placeholder="Enter your ID number"
                        value={id}
                        onChange={handleIdChange}
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                    <div className="w-1/2">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      University Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your university email"
                      value={email}
                      onChange={handleEmailChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    </div>
                  </div>

                  <div className="mb-8 flex gap-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="gender"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      >
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="password"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Password
                      </label>
                      <input
                      type="password"
                      name="password"
                      required
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </div>
                  </div>

                  <div className="mb-8 flex gap-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="confirmPassword"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                        placeholder="Confirm your password"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                      {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
                    </div>
                  </div>
                  <div className="mb-8 flex">

                    <label
                      htmlFor="checkboxLabel"
                      className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabel"
                          className="sr-only"
                        />
                        <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                          <span className="opacity-0">
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                fill="#3056D3"
                                stroke="#3056D3"
                                strokeWidth="0.4"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <label htmlFor="privacy" className="text-sm text-dark dark:text-white">
                      By creating an account, you agree to the{" "}
                      <span
                        className="text-primary cursor-pointer hover:underline"
                        onClick={togglePrivacyModal}
                      >
                        Privacy Policy
                      </span>
                    </label>
                    </label>

                  </div>
                  <div id="privacyPolicyError" style={{ color: 'red', display: 'none', marginBottom:'20px' }}>You must agree to the privacy policy.</div>
                  <div className="mb-6">
                      <button className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90" onClick={handleSubmit}>
                        Sign up
                      </button>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  Already using VoteGuard?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
      {showPrivacyModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white dark:bg-dark rounded-lg shadow-lg max-w-lg w-full p-6 relative">
          {/* Close "X" button in the top-right corner */}
          <button
            className="absolute top-2 right-2 text-xl text-gray-600 dark:text-white hover:text-red-600"
            onClick={() => setShowPrivacyModal(false)}
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-center mb-4 text-dark dark:text-white">
            Privacy Policy
          </h2>

          <div className="text-black dark:text-white overflow-y-auto max-h-64">
          <p>
    <br /><strong>Effective Date: 23/12/2024</strong><br /><br />

    At VoteGuard, your privacy and security are our top priority. This Privacy Policy explains how we collect, use, and protect your personal information, including sensitive data like biometric images, and how we ensure its security. By using our platform, you agree to the terms outlined in this policy.
</p>

<br /> <br /><h2>1. Information We Collect</h2>
<p>VoteGuard collects the following types of information from users:</p> <br />
<ul>
    <li><strong>(a) Personal Identification Information:</strong> This includes your full name, university ID, and university email address. This information is essential for verifying your identity and providing access to the system. Note that these details cannot be changed.</li>
    <li><strong>(b) Credentials for Authentication:</strong> We collect and store passwords to authenticate your identity securely. All passwords are encrypted and never stored in plain text. You can update your password at any time.</li>
    <li><strong>(c) Profile Image:</strong> You have the option to upload and update your profile image. This image is used to personalize your account. However, ensure that it's not an image of yourself.</li>
    <li><strong>(d) Biometric Data:</strong> To enhance security, we collect biometric image data (i.e., an image of yourself) for identity verification and authentication purposes. This biometric data is used only to confirm your identity during login and is securely stored and encrypted.</li>
</ul>

<br /> <br /><h2>2. How We Use Your Data</h2>
<p>The data we collect is used for the following purposes:</p> <br />
<ul>
    <li><strong>(a) Account Creation and Authentication:</strong> We use your personal details (name, university ID, and email) to create your account and authenticate you securely using your password and biometric data.</li>
    <li><strong>(b) Biometric Authentication:</strong> Your biometric image data is used solely for the purpose of verifying your identity during login and to enhance the security of your account.</li>
    <li><strong>(c) Security and Fraud Prevention:</strong> We use your data, including biometric information, to safeguard the platform from unauthorized access, fraud, and other malicious activities.</li>
    <li><strong>(d) Voting Process:</strong> Your credentials are used to ensure that only authorized users can vote, and the votes are securely recorded. Note that your information remains globally anonymous.</li>
</ul>

<br /> <br /><h2>3. Encryption and Data Security</h2>
<p>We take your privacy and security seriously. All sensitive data, including passwords and biometric images, is encrypted both in transit and at rest. Specifically:</p> <br />
<ul>
    <li><strong>(a) Passwords:</strong> Passwords are hashed and stored securely in an encrypted format. We never store passwords in plain text.</li>
    <li><strong>(b) Biometric Data:</strong> Your biometric images are encrypted before being stored. This data is used exclusively for authentication and is not shared with third parties.</li>
    <li><strong>(c) Data Backup:</strong> We implement regular backup procedures to prevent data loss, and we use secure storage methods to protect all user data.</li>
    <li><strong>(d) No Advertising:</strong> We do not sell, rent, or trade your personal data to third parties for advertising purposes. The system operates in a closed environment.</li>
</ul>

<br /> <br /><h2>4. Your Rights Regarding Your Data</h2> <br />
<p>You can access and update your personal information (e.g., password, profile image) at any time by logging into your account. However, you cannot change your university ID, university email, or full name once they have been set.</p>

<br /> <br /><h2>5. Cookies</h2> <br />
<p>We may use cookies and other tracking technologies to enhance your experience on the platform. You can manage or disable cookies through your browser settings.</p>

<br /> <br /><h2>6. Changes to This Privacy Policy</h2> <br />
<p>We reserve the right to update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Effective Date" at the top of the policy will be updated. We encourage you to review this policy periodically.</p>

          </div>

        </div>
      </div>
    )}

    </>
  );
};

export default SignupPage;