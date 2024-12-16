"use client";
import React, { useState, useEffect } from "react";
import {
    FaChevronLeft,
    FaChevronRight,
    FaTrash,
    FaSearch,
    FaUsers,
    FaPlus,
    FaMinus,
    FaCalendarPlus,
    FaEdit,
    FaClock,
} from "react-icons/fa";

const AdminDashboard: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);

    const staticEvents = {
        upcoming: {
            id: 999,
            title: "Annual Board Meeting 2024",
            description: "Yearly planning and strategy discussion",
            startDate: "2024-01-15",
            startTime: "09:00",
            endDate: "2024-01-15",
            endTime: "17:00",
            options: [
                { id: 1, text: "Budget Approval" },
                { id: 2, text: "Growth Strategy" },
                { id: 3, text: "Department Reports" }
            ],
            participants: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "Robert Brown"],
            createdAt: "2023-12-20T10:00:00Z"
        },
        inProgress: [{
            id: 998,
            title: "Q4 Strategy Review",
            description: "Review of Q4 performance and future plans",
            startDate: "2023-12-25",
            endDate: "2023-12-26",
            totalVoters: 50,
            currentVotes: 30,
            options: [
                { id: 1, text: "Expand Marketing", votes: 15, percentage: 50 },
                { id: 2, text: "Increase R&D", votes: 10, percentage: 33.33 },
                { id: 3, text: "New Hiring", votes: 5, percentage: 16.67 }
            ]
        }, {
            id: 9,
            title: "event",
            description: "Review of Q4 performance and future plans",
            startDate: "2023-12-25",
            endDate: "2023-12-26",
            totalVoters: 200,
            currentVotes: 107,
            options: [
                { id: 1, text: "Expand Marketing", votes: 25, percentage: 50 },
                { id: 2, text: "Increase R&D", votes: 30, percentage: 33.33 },
                { id: 3, text: "New Hiring", votes: 52, percentage: 16.67 }
            ]
        }
        ],
        completed: [{
            id: 997,
            title: "Tech Stack Decision",
            description: "Final vote on new tech stack",
            completedDate: "2023-12-15",
            totalVotes: 45,
            options: [
                { id: 1, text: "React/Node.js", votes: 25, percentage: 55.56, isWinner: true },
                { id: 2, text: "Python/Django", votes: 12, percentage: 26.67, isWinner: false },
                { id: 3, text: "Java Spring", votes: 8, percentage: 17.77, isWinner: false }
            ],
            voterDetails: [
                { name: "John Doe", vote: true, timestamp: "2023-12-14T10:30:00Z", id: '2181147640' },
                { name: "Jane Smith", vote: true, timestamp: "2023-12-14T11:15:00Z", id: '1234567890' },
                { name: "Mike Johnson", vote: true, timestamp: "2023-12-14T12:00:00Z", id: '9876994532' },
                { name: "Sarah Williams", vote: false, timestamp: "2023-12-14T13:45:00Z", id: '4012763598' },
                { name: "hajer alresheedi", vote: false, timestamp: "2023-12-14T13:45:00Z", id: '2181147640' }
            ]
        }]
    };

    useEffect(() => {
        document.title = 'Admin Dashboard';
        setEvents([staticEvents.upcoming]);
    }, []);

    const handleFormSubmit = (formData: any, selectedUsers: any[]) => {
        if (editingEvent) {
            const updatedEvents = events.map((event) =>
                event.id === editingEvent.id
                    ? {
                        ...formData,
                        id: event.id,
                        participants: selectedUsers,
                        updatedAt: new Date().toISOString(),
                    }
                    : event
            );
            setEvents(updatedEvents);
            setEditingEvent(null);
        } else {
            const newEvent = {
                id: events.length + 1,
                ...formData,
                participants: selectedUsers,
                createdAt: new Date().toISOString(),
            };
            setEvents([...events, newEvent]);
        }
        setShowForm(false);
    };

    const handleEditEvent = (event: any) => {
        setEditingEvent(event);
        setShowForm(true);
    };

    const handleDeleteEvent = (eventId: number) => {
        setEvents(events.filter((event) => event.id !== eventId));
    };

    return (
        <section id="about" className="pt-16 md:pt-20 lg:pt-28 mb-20 mt-20">
            <div className="container">
                <div className="min-h-screen bg-gray-100 p-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">
                                Voting Events Dashboard
                            </h1>
                            <button
                                onClick={() => setShowForm(true)}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                <FaCalendarPlus className="mr-2" />
                                Create New Event
                            </button>
                        </div>

                        {/* Dashboard Overview Card */}
                        <div className="mb-6 bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-700">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
                                    <p className="text-gray-600">Quick summary of voting events</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaUsers className="text-blue-600 text-2xl" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-500 text-sm">upcoming Events</p>
                                    <p className="text-2xl font-bold text-gray-800">{events.length}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-500 text-sm">in progress Events</p>
                                    <p className="text-2xl font-bold text-gray-800">{staticEvents.inProgress.length}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-500 text-sm">Completed Events</p>
                                    <p className="text-2xl font-bold text-gray-800">{staticEvents.completed.length}</p>
                                </div>
                            </div>
                        </div>

                        {/* --------------------------------------- */}
                        {/* Upcoming Events Section */}
                        
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 ">
                            {events.map((event) => (
                                <div key={event.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                                    <div className="flex justify-between items-start mb-4 ">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                                            <p className="text-gray-600">{event.description}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditEvent(event)}
                                                className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                <FaEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEvent(event.id)}
                                                className="p-2 text-red-600 hover:text-red-800 transition-colors"
                                            >
                                                <FaTrash size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Start:</span> {event.startDate} {event.startTime}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">End:</span> {event.endDate} {event.endTime}
                                        </p>
                                        <div className="border-t pt-2 mt-2">
                                            <p className="text-sm font-medium text-gray-700 mb-1">Options:</p>
                                            <ul className="list-disc list-inside text-sm text-gray-600">
                                                {event.options.map((option) => (
                                                    <li key={option.id}>{option.text}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Participants:</span> {event.participants.length}
                                        </p>
                                        {event.updatedAt && (
                                            <p className="text-xs text-gray-400 italic">
                                                Last updated: {new Date(event.updatedAt).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* --------------------------------------- */}
                        {/* In Progress Events Section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">In Progress Events</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {staticEvents.inProgress.map((event) => (
                                    <div key={event.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500" >
                                        <div className="flex justify-between items-start mb-4">

                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                                                <p className="text-gray-600">{event.description}</p>
                                            </div>
                                            <div className="bg-amber-200 p-2 rounded-full">
                                                <FaClock className="text-amber-600" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                                <span>Progress: {event.currentVotes}/{event.totalVoters} votes</span>
                                                <span>{(event.currentVotes / event.totalVoters * 100).toFixed(1)}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{ width: `${(event.currentVotes / event.totalVoters * 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            {event.options.map(option => (
                                                <div key={option.id} className="space-y-1">
                                                    <div className="flex justify-between text-black">
                                                        <span>{option.text}</span>
                                                        <span>{option.votes} votes ({(option.votes / event.currentVotes * 100).toFixed(1)}%)</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                        <div
                                                            className="bg-green-500 h-1.5 rounded-full"
                                                            style={{ width: `${(option.votes / event.currentVotes * 100).toFixed(1)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* --------------------------------------- */}
                        {/* Completed Events Section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Completed Events</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {staticEvents.completed.map((event) => (
                                    <div key={event.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                                                <p className="text-gray-600">{event.description}</p>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600">Completed on: {event.completedDate}</p>
                                            <p className="text-sm text-gray-600">Total Votes: {event.totalVotes}</p>
                                        </div>

                                        <div className="space-y-3">
                                            {event.options.map(option => (
                                                <div key={option.id} className={`p-3 rounded-lg ${option.isWinner ? "bg-green-50 border border-green-200" : "bg-gray-50"}`}>
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium text-black">{option.text}</span>
                                                        <span className="text-black">{option.votes} votes ({(option.votes / event.totalVotes * 100).toFixed(1)}%)</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                                        <div
                                                            className={`h-1.5 rounded-full ${option.isWinner ? "bg-green-500" : "bg-gray-400"}`}
                                                            style={{ width: `${option.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    {option.isWinner && (
                                                        <span className="text-green-600 text-sm mt-2 inline-block">Winner</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {showForm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                                    <VotingEventForm
                                        onSubmit={handleFormSubmit}
                                        onClose={() => {
                                            setShowForm(false);
                                            setEditingEvent(null);
                                        }}
                                        initialData={editingEvent}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

const VotingEventForm = ({ onSubmit, onClose, initialData }: any) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(
        initialData || {
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            options: [
                { id: 1, text: "" },
                { id: 2, text: "" },
            ],
        }
    );

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [errors, setErrors] = useState({});

    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };


    const dummyUsers = [
        { id: '2181147640', name: "John Doe",},
        { id: '1234567890', name: "Jane Smith",},
        { id: '3981273649', name: "Mike Johnson",},
        { id: '4023729373', name: "Sarah Williams", },
        { id: '5239057029', name: "Tom Brown",}
    ];

    const [filteredUsers, setFilteredUsers] = useState(dummyUsers);

    useEffect(() => {
        let filtered = dummyUsers;
        
        if (searchQuery) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.id.includes(searchQuery)
            );
        }
        setFilteredUsers(filtered);
    }, [ searchQuery]);

    const validateStep1 = () => {
        const errors = {};
        if (!formData.title) errors.title = "Title is required";
        if (!formData.description) errors.description = "Description is required";
        if (!formData.startDate) errors.startDate = "Start date is required";
        if (!formData.endDate) errors.endDate = "End date is required";
        if (!formData.startTime) errors.startTime = "Start time is required";
        if (!formData.endTime) errors.endTime = "End time is required";

        if (formData.startDate && formData.endDate) {
            const startDateTime = new Date(`${formData.startDate} ${formData.startTime}`);
            const endDateTime = new Date(`${formData.endDate} ${formData.endTime}`);
            const diffInMinutes = (endDateTime - startDateTime) / (1000 * 60);

            if (startDateTime >= endDateTime) {
                errors.endDate = "End date/time must be after start date/time";
            }
            if (diffInMinutes < 30) {
                errors.endTime = "There must be at least 30 minutes between start and end times";
            }
        }

        const validOptions = formData.options.filter(opt => opt.text.trim());
        if (validOptions.length < 2) {
            errors.options = "At least 2 options are required";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleAddOption = () => {
        setFormData({
            ...formData,
            options: [...formData.options, { id: formData.options.length + 1, text: "" }]
        });
    };

    const handleRemoveOption = (id) => {
        if (formData.options.length > 2) {
            setFormData({
                ...formData,
                options: formData.options.filter(opt => opt.id !== id)
            });
        }
    };

    const handleSelectAll = () => {
        setSelectedUsers(filteredUsers);
    };

    const handleDeselectAll = () => {
        setSelectedUsers([]);
    };

    const toggleUser = (user) => {
        setSelectedUsers(prev =>
            prev.find(u => u.id === user.id)
                ? prev.filter(u => u.id !== user.id)
                : [...prev, user]
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-black">
                    {step === 1 ? "Event Details" : "Select Participants"}
                </h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
            </div>

            {step === 1 ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            rows="3"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                min={getCurrentDate()}
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="mt-1 block w-full rounded-md text-black bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Time</label>
                            <input
                                type="time"
                                value={formData.startTime}
                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                className="mt-1 block w-full text-black rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                min={formData.startDate || getCurrentDate()}
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                className="mt-1 block w-full text-black rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Time</label>
                            <input
                                type="time"
                                value={formData.endTime}
                                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                className="mt-1 block w-full text-black rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                        {formData.options.map((option, index) => (
                            <div key={option.id} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) => {
                                        const newOptions = [...formData.options];
                                        newOptions[index].text = e.target.value;
                                        setFormData({ ...formData, options: newOptions });
                                    }}
                                    className="block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder={`Option ${index + 1}`}
                                />
                                {formData.options.length > 2 && (
                                    <button
                                        onClick={() => handleRemoveOption(option.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaMinus />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddOption}
                            className="mt-2 flex items-center text-blue-600 hover:text-blue-700"
                        >
                            <FaPlus className="mr-1" /> Add Option
                        </button>
                        {errors.options && <p className="text-red-500 text-sm mt-1">{errors.options}</p>}
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search users..."
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-2">
                                <FaUsers className="text-gray-500" />
                                <span className="text-sm text-gray-600">{selectedUsers.length} users selected</span>
                            </div>
                            <div className="space-x-4">
                                <button
                                    onClick={handleSelectAll}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Select All
                                </button>
                                <button
                                    onClick={handleDeselectAll}
                                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                                >
                                    Clear Selection
                                </button>
                            </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Select
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredUsers.map(user => (
                                        <tr
                                            key={user.id}
                                            onClick={() => toggleUser(user)}
                                            className={` ${selectedUsers.find(u => u.id === user.id)
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 hover:border-blue-300"
                                                } cursor-pointer transition-all duration-200`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.some(u => u.id === user.id)}
                                                    onChange={() => { }}
                                                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div >
                </div >
            )}

            <div className="flex justify-between mt-6 pt-4 border-t">
                {step === 2 && (
                    <button
                        onClick={() => setStep(1)}
                        className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        <FaChevronLeft className="mr-2" /> Back
                    </button>
                )}
                <div className="ml-auto">
                    <button
                        onClick={step === 1 ? handleNext : () => onSubmit(formData, selectedUsers)}
                        className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                        {step === 1 ? (
                            <>
                                Next <FaChevronRight className="ml-2" />
                            </>
                        ) : (
                            <h2 className="text-2xl font-bold text-white">
                                {initialData ? "Edit Event" : "Create"}
                            </h2>
                        )}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default AdminDashboard;