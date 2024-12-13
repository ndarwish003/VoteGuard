//Admin-Dashboard-users
"use client";
import React, { useState } from "react";
import { FaUserPlus, FaBan, FaSearch, FaFilter, FaUserEdit, FaHistory, FaVoteYea } from "react-icons/fa";

const AdminDashboardUsers: React.FC = () => {
    const initialUsers = [
        {
            id: "1234567890",
            username: "john_doe",
            email: "john@example.com",
            department: "IT",
            isVerified: true,
            isOnline: true,
            loginHistory: [
                { action: "login", timestamp: "2024-01-10 09:00:00" },
                { action: "logout", timestamp: "2024-01-10 17:00:00" }
            ],
            votedEvents: ["Company Picnic 2024", "Annual Meeting 2024"],
            accountChanges: [
                { type: "email", oldValue: "john.old@example.com", newValue: "john@example.com", timestamp: "2024-01-05 14:30:00" },
                { type: "password", timestamp: "2024-01-07 11:20:00" },
                { type: "profile_photo", timestamp: "2024-01-08 16:45:00" }
            ]
        },
        {
            id: "2173984361",
            username: "jane_smith",
            email: "jane@example.com",
            department: "HR",
            isVerified: true,
            isOnline: false,
            loginHistory: [
                { action: "login", timestamp: "2024-01-10 08:30:00" },
                { action: "logout", timestamp: "2024-01-10 16:30:00" }
            ],
            votedEvents: ["Annual Meeting 2024"],
            accountChanges: [
                { type: "password", timestamp: "2024-01-06 10:15:00" }
            ]
        },
        {
            id: "2181147640",
            username: "mike_wilson",
            email: "mike@example.com",
            department: "Finance",
            isVerified: false,
            isOnline: false,
            loginHistory: [],
            votedEvents: [],
            accountChanges: []
        }
    ];

    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });
    const [showActivityModal, setShowActivityModal] = useState(false);

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        id: "",
        department: ""
    });

    const handleViewActivity = (user) => {
        setSelectedUser(user);
        setShowActivityModal(true);
    };

    const [errors, setErrors] = useState({});

    const validateNewUser = () => {
        const errors = {};
        if (!newUser.username) errors.username = "Username is required";
        if (!newUser.email) errors.email = "Email is required";
        if (!newUser.id) errors.id = "User ID is required";
        if (!newUser.department) errors.department = "Department is required";

        const isDuplicate = users.some(
            user =>
                user.username === newUser.username ||
                user.email === newUser.email ||
                user.id === newUser.id
        );

        if (isDuplicate) {
            errors.duplicate = "Username, Email or ID already exists";
        }

        return errors;
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        const validationErrors = validateNewUser();

        if (Object.keys(validationErrors).length === 0) {
            setUsers([...users, { ...newUser, isVerified: false, isOnline: false, loginHistory: [], votedEvents: [], accountChanges: [] }]);
            setShowAddModal(false);
            setNewUser({ username: "", email: "", id: "", department: "" });
            setNotification({ show: true, message: "User added successfully!", type: "success" });
            setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
        } else {
            setErrors(validationErrors);
        }
    };

    const handleBlockUser = () => {
        setUsers(users.filter(user => user.id !== selectedUser.id));
        setShowBlockModal(false);
        setNotification({ show: true, message: "User blocked successfully!", type: "success" });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = (
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesDepartment = filterDepartment === "all" || user.department === filterDepartment;
        return matchesSearch && matchesDepartment;
    });


    return (
        <section id="about" className="pt-16 md:pt-20 lg:pt-28 mb-20">
            <div className="container">
                <div className="min-h-screen bg-gray-100 p-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-6">

                            <div className="flex items-center space-x-2">
                                <h1 className="text-3xl font-bold text-gray-900">User Management Dashboard</h1>
                            </div>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
                            >
                                <FaUserPlus />
                                <span>Add User</span>
                            </button>
                        </div>

                        {notification.show && (
                            <div className={`p-4 mb-4 rounded-lg ${notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {notification.message}
                            </div>
                        )}

                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                                <div className="flex items-center space-x-4 w-full md:w-auto">
                                    <div className="relative flex-1 md:flex-none">
                                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search users..."
                                            className="pl-10 pr-4 py-2 border rounded-lg w-full"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="relative flex-1 md:flex-none">
                                        <FaFilter className="absolute left-3 top-3 text-gray-400" />
                                        <select
                                            className="pl-10 pr-4 py-2 border rounded-lg w-full appearance-none"
                                            value={filterDepartment}
                                            onChange={(e) => setFilterDepartment(e.target.value)}
                                        >
                                            <option value="all">All Departments</option>
                                            <option value="IT">IT</option>
                                            <option value="HR">HR</option>
                                            <option value="Finance">Finance</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block User</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.department}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isVerified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                        {user.isVerified ? "Verified" : "Unverified"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleViewActivity(user)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                        title="View Activity"
                                                    >
                                                        <FaHistory className="h-5 w-5" />
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowBlockModal(true);
                                                        }}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <FaBan className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {showAddModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                                <h2 className="text-2xl font-bold mb-4">Add New User</h2>
                                <form onSubmit={handleAddUser}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Username</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                value={newUser.username}
                                                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                            />
                                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                value={newUser.email}
                                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">User ID</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                value={newUser.id}
                                                onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
                                            />
                                            {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Department</label>
                                            <select
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                value={newUser.department}
                                                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                                            >
                                                <option value="">Select Department</option>
                                                <option value="IT">IT</option>
                                                <option value="HR">HR</option>
                                                <option value="Finance">Finance</option>
                                            </select>
                                            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                                        </div>
                                        {errors.duplicate && <p className="text-red-500 text-sm">{errors.duplicate}</p>}
                                    </div>
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowAddModal(false);
                                                setErrors({});
                                                setNewUser({ username: "", email: "", id: "", department: "" });
                                            }}
                                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Add User
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {showBlockModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                                <h2 className="text-2xl font-bold mb-4">Block User</h2>
                                <p className="mb-6">Are you sure you want to block {selectedUser?.username}?</p>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowBlockModal(false)}
                                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleBlockUser}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                    >
                                        Block User
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showActivityModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                                <h2 className="text-2xl font-bold mb-4">User Activity - {selectedUser.username}</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                                            <FaHistory className="mr-2" /> Login History
                                        </h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            {selectedUser.loginHistory.length > 0 ? (
                                                selectedUser.loginHistory.map((log, index) => (
                                                    <div key={index} className="mb-2">
                                                        <span className="font-medium">{log.action}: </span>
                                                        {log.timestamp}
                                                    </div>
                                                ))
                                            ) : (

                                                <div className="text-gray-500">No activity</div>

                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                                            <FaVoteYea className="mr-2" /> Voted Events
                                        </h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            {selectedUser.votedEvents.length > 0 ? (
                                                selectedUser.votedEvents.map((event, index) => (
                                                    <div key={index} className="mb-2">{event}</div>
                                                ))
                                            ) : (
                                                <div className="text-gray-500">No voting activity</div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                                            <FaUserEdit className="mr-2" /> Account Changes
                                        </h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            {selectedUser.accountChanges.length > 0 ? (
                                                selectedUser.accountChanges.map((change, index) => (
                                                    <div key={index} className="mb-2">
                                                        <span className="font-medium">{change.type}: </span>
                                                        {change.type === "email" ? (
                                                            <span>{change.oldValue} → {change.newValue}</span>
                                                        ) : (
                                                            <span>Changed on {change.timestamp}</span>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-gray-500">No account changes</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={() => setShowActivityModal(false)}
                                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section >
    );
};


export default AdminDashboardUsers;
