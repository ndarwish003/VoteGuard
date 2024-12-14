"use client";
import { useState, useEffect } from "react";

const Profile = () => {
    useEffect(() => {
        document.title = "VoteGuard | Profile";
    }, []);

    // State for handling password change
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [pwdError, setPwdError] = useState('');

    // State for handling profile photo change
    const [isChangingPhoto, setIsChangingPhoto] = useState(false);
    const [profilePic, setProfilePic] = useState('images/Unknown_person.jpg');
    const [isPhotoChanged, setIsPhotoChanged] = useState(false);

    const [showThankYouForPwd, setshowThankYouForPwd] = useState(false);
    const [showThankYouForProfile, setshowThankYouForProfile] = useState(false);


    const handlePasswordChangeClick = () => {
        setIsChangingPassword(true);
    };

    const handleSavePassword = (e) => {
        e.preventDefault();
        if (newPassword === confirmNewPassword) 
        {
            setIsPasswordChanged(true);
            setIsChangingPassword(false);
            setshowThankYouForPwd(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } 
        else 
        {
            setPwdError("Passwords do not match");
        }
    };

    const handleCancelPasswordChange = () => {
        setIsChangingPassword(false);
    };

    const handleChangePhotoClick = () => {
        setIsChangingPhoto(true);
    };

    const handleSavePhoto = (newPic) => {
        setProfilePic(newPic);
        setIsPhotoChanged(true);
        setIsChangingPhoto(false);
        setshowThankYouForProfile(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelPhotoChange = () => {
        setIsChangingPhoto(false);
    };

    const dismissThankYouForPwd = () => {
        setshowThankYouForPwd(false);
    };
    const dismissThankYouForProfile = () => {
        setshowThankYouForProfile(false);
    };
    return (
        <>
            <section
                id="about"
                className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]"
            >
                <div className="container">
                {showThankYouForPwd && (
                    <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md flex justify-between items-center">
                    <span>Password updated successfully!</span>
                    <button
                        className="text-red-500 hover:underline ml-4"
                        onClick={dismissThankYouForPwd}
                    >
                        Dismiss
                    </button>
                    </div>
                )}
                {showThankYouForProfile && (
                    <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md flex justify-between items-center">
                    <span>Profile image updated successfully!</span>
                    <button
                        className="text-red-500 hover:underline ml-4"
                        onClick={dismissThankYouForProfile}
                    >
                        Dismiss
                    </button>
                    </div>
                )}
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-8">Profile</h1>
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-5 xl:col-span-3">
                            <div className="shadow-three mx-auto rounded-sm bg-white px-6 py-10 dark:bg-dark">
                                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                        Personal Information
                                    </h3>
                                </div>
                                <div className="p-7">
                                    <form action="#">
                                        <div className="mb-8 flex flex-col gap-5.5 sm:flex-row">
                                            <div className="w-full sm:w-1/2">
                                                <label className="mb-3 block text-sm text-dark dark:text-white" htmlFor="fullName">
                                                    Full Name
                                                </label>
                                                <input
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-[75%] rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                    type="text"
                                                    name="fullName"
                                                    id="fullName"
                                                    placeholder="Your full name"
                                                    defaultValue="Khaled"
                                                    disabled
                                                />
                                            </div>
                                            <div className="w-[75%] sm:w-1/2">
                                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                    ID
                                                </label>
                                                <input
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                    type="text"
                                                    name="id"
                                                    id="id"
                                                    placeholder="Your ID"
                                                    defaultValue="2182161465"
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="emailAddress">
                                                Email Address
                                            </label>
                                            <input
                                                className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                type="email"
                                                name="emailAddress"
                                                id="emailAddress"
                                                placeholder="Your email"
                                                defaultValue="s2182161465@ku.edu.kw"
                                                disabled
                                            />
                                        </div>

                                        {/* Password section */}
                                        {!isChangingPassword ? (
                                            <div className="mb-8">
                                                <button
                                                    onClick={handlePasswordChangeClick}
                                                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 mt-6"
                                                >
                                                    Change Password
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="mb-8">
                                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="newPassword">
                                                        New Password
                                                    </label>
                                                    <input
                                                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                        type="password"
                                                        name="newPassword"
                                                        id="newPassword"
                                                        placeholder="New password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                </div>

                                                <div className="mb-8">
                                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="confirmNewPassword">
                                                        Confirm New Password
                                                    </label>
                                                    <input
                                                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                        type="password"
                                                        name="confirmNewPassword"
                                                        id="confirmNewPassword"
                                                        placeholder="Confirm new password"
                                                        value={confirmNewPassword}
                                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                    />
                                                    {pwdError && <p style={{ color: 'red' }}>{pwdError}</p>}
                                                </div>

                                                <div className="flex justify-end gap-4 mt-5 flex justify-center">
                                                    <button
                                                        onClick={handleCancelPasswordChange}
                                                        className="flex justify-center rounded border border-stroke mr-8 px-6 py-2 font-medium text-black hover:bg-gray-200 dark:border-strokedark dark:text-white"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            handleSavePassword(e); 
                                                        }}
                                                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Profile Photo Section */}
                        <div className="col-span-5 xl:col-span-2 flex justify-center">
                            <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                        Your Photo
                                    </h3>
                                </div>
                                <div className="p-7 flex justify-center">
                                    <form action="#">
                                        <div className="mb-4 flex justify-center">
                                            <div>
                                                <img
                                                    src={profilePic}
                                                    alt="Profile"
                                                    className="w-40 h-40 rounded-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        {!isChangingPhoto ? (
                                            <button
                                                onClick={handleChangePhotoClick}
                                                className=" rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 mt-6"
                                            >
                                                Change Profile Photo
                                            </button>
                                        ) : (
                                            <div>
                                                <div
                                                id="FileUpload"
                                                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                                                >
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                                    onChange={(e) => handleSavePhoto(URL.createObjectURL(e.target.files[0]))}
                                                />
                                                <div className="flex flex-col items-center justify-center space-y-3">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                        fill="#3C50E0"
                                                        />
                                                        <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                        fill="#3C50E0"
                                                        />
                                                        <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                        fill="#3C50E0"
                                                        />
                                                    </svg>
                                                    </span>
                                                    <p>
                                                    <span className="text-primary hover:underline">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="mt-1.5">PNG, JPG</p>
                                                </div>
                                                </div>
                                                <div className="flex justify-center gap-4 mt-5">
                                                    <button
                                                        onClick={handleCancelPhotoChange}
                                                        className="flex justify-center rounded border border-stroke mr-8 px-6 py-2 font-medium text-black hover:bg-gray-200 dark:border-strokedark dark:text-white"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;