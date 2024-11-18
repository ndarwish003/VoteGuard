"use client";
import { FaHome, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r blue-200 py-12">
      <div className="flex items-center justify-between w-4/5">
        {/* Image Section */}
        <div className="h-64 w-64 bg-blue-200 shadow-xl flex items-center justify-center rounded-full overflow-hidden transform transition-all hover:scale-105 duration-300">
          <img
            src="https://www.freeiconspng.com/uploads/handshake-icon-33.png"
            alt="People shaking hands"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Contact Info Section */}
        <div className="text-left bg-white p-10 rounded-xl shadow-2xl w-2/3">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-8 text-center">Thank You!</h1>
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <FaHome className="h-10 w-10 text-blue-600" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Address</h3>
                <p className="text-gray-600"># street number, city, state</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <FaPhone className="h-10 w-10 text-blue-600" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Contact Us</h3>
                <p className="text-gray-600">0123456789</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <FaEnvelope className="h-10 w-10 text-blue-600" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Email Address</h3>
                <p className="text-gray-600">emailaddress123@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
