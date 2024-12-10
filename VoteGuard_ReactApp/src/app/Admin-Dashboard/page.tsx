// // //Admin-Dashboard
"use client"; // Include this if you're using client-side rendering in the file
import React, { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { FiEdit, FiX } from "react-icons/fi";

const AdminDashboard: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Annual Board Election",
            description: "Vote for new board members",
            startDate: "2024-02-01",
            dueDate: "2024-02-15",
            dueTime: "23:59",
            startTime: "09:00",
            options: ["John Doe", "Jane Smith", "Mike Johnson"],
            votes: { "John Doe": 10, "Jane Smith": 15, "Mike Johnson": 8 },
            status: "in_progress"
        },
        {
            id: 2,
            title: "Budget Approval",
            description: "Vote on the annual budget allocation",
            startDate: "2024-03-01",
            dueDate: "2024-03-10",
            dueTime: "23:59",
            startTime: "09:00",
            options: ["Approve", "Reject", "Revise"],
            votes: { "Approve": 25, "Reject": 5, "Revise": 12 },
            status: "upcoming"
        },
        {
            id: 3,
            title: "Community Project Selection",
            description: "Vote for the next community project",
            startDate: "2024-01-01",
            dueDate: "2024-01-15",
            dueTime: "23:59",
            startTime: "09:00",
            options: ["Park Renovation", "Library Extension", "Sports Complex"],
            votes: { "Park Renovation": 45, "Library Extension": 30, "Sports Complex": 25 },
            status: "finished"
        }
        , {
            id: 4,
            title: "Community Project Selection",
            description: "Vote for the next community project",
            startDate: "2024-01-01",
            dueDate: "2024-01-15",
            dueTime: "23:59",
            startTime: "09:00",
            options: ["Park Renovation", "Library Extension", "Sports Complex"],
            votes: { "Park Renovation": 43, "Library Extension": 32, "Sports Complex": 44 },
            status: "finished"
        }
    ]);

    const getEventStatus = (startDate, dueDate) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(dueDate);

        if (now < start) return "upcoming";
        if (now > end) return "finished";
        return "in_progress";
    };

    const handleSubmit = (eventData) => {
        if (editingEvent) {
            setEvents(events.map(event =>
                event.id === editingEvent.id ? { ...eventData, id: event.id, votes: event.votes, status: getEventStatus(eventData.startDate, eventData.dueDate) } : event
            ));
        } else {
            setEvents([...events, {
                ...eventData,
                id: Date.now(),
                votes: Object.fromEntries(eventData.options.map(opt => [opt, 0])),
                status: getEventStatus(eventData.startDate, eventData.dueDate)
            }]);
        }
        setShowModal(false);
        setEditingEvent(null);
    };

    const handleEdit = (event) => {
        if (event.status === "finished" || event.status === "in_progress") {
            alert("Cannot edit events that are in progress or finished");
            return;
        }
        setEditingEvent(event);
        setShowModal(true);
    };

    const handleDelete = (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            setEvents(events.filter(event => event.id !== eventId));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "upcoming": return "bg-blue-100 text-blue-800";
            case "in_progress": return "bg-green-100 text-green-800";
            case "finished": return "bg-gray-100 text-gray-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "upcoming": return "Upcoming";
            case "in_progress": return "In Progress";
            case "finished": return "Finished";
            default: return status;
        }
    };

    const getTotalVotes = (votes) => {
        return Object.values(votes).reduce((a, b) => (a + b || 0));
    };

    const getFinishedEvents = () => {
        return events
            .filter(event => event.status === "finished")
            .map(event => ({
                ...event,
                sortedResults: Object.entries(event.votes)
                    .sort(([, a], [, b]) => b - a)
            }));
    };

    const getInProgressEvents = () => {
        return events.filter(event => event.status === "in_progress");
    };
    // Added function to get upcoming events
    const getUpcomingEvents = () => {
        return events.filter(event => event.status === "upcoming");
    };

    return (
        <section id="about" className="pt-16 md:pt-20 lg:pt-28 mb-20">
            <div className="container">
                <div className="min-h-screen bg-gray-100 p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Voting Events Dashboard</h1>
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <FiPlus className="mr-2" /> Create New Event
                            </button>
                        </div>
                        {/* Upcoming Events Section */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {getUpcomingEvents().map((event) => (
                                    <div key={event.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(event)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                                >
                                                    <FiEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-4">{event.description}</p>
                                        <div className="space-y-3">
                                            <div className="text-sm text-gray-500">
                                                <p>Start Date: {new Date(event.startDate).toLocaleDateString()} || startTime:{event.startTime}</p>
                                                <p>End Date: {new Date(event.dueDate).toLocaleDateString()} || dueTime:{event.dueTime}</p>
                                            </div>
                                            <div className="pt-3 border-t">
                                                <p className="text-sm font-medium text-gray-700 mb-2">Options:</p>
                                                <ul className="space-y-1">
                                                    {event.options.map((option, index) => (
                                                        <li key={index} className="text-gray-600 text-sm">{option}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* In Progress Events Section */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">In Progress Events</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {getInProgressEvents().map((event) => (
                                    <div key={event.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                                        <p className="text-gray-600 mb-4">{event.description}</p>
                                        <div className="space-y-3">
                                            {event.options.map((option, index) => {
                                                const voteCount = event.votes[option];
                                                const totalVotes = getTotalVotes(event.votes);
                                                const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

                                                return (
                                                    <div key={index} className="space-y-1">
                                                        <div className="flex justify-between text-sm">
                                                            <span>{option}</span>
                                                            <span>{voteCount} votes ({percentage.toFixed(1)}%)</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-green-500 h-2 rounded-full"
                                                                style={{ width: `${percentage}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-4 text-sm text-gray-500">
                                            <p>Ends on: {new Date(event.dueDate).toLocaleDateString()} || dueTime:{event.dueTime}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Finished Events Results Section */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Finished Events Results</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {getFinishedEvents().map((event) => (
                                    <div key={event.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-500">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                                        <p className="text-gray-600 mb-4">{event.description}</p>
                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <p className="text-sm font-medium text-gray-600">
                                                    Total Votes: {getTotalVotes(event.votes)}
                                                </p>
                                                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                                    Completed on {new Date(event.dueDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {event.sortedResults.map(([option, votes], index) => {
                                                const percentage = (votes / getTotalVotes(event.votes)) * 100;
                                                const isWinner = index === 0;

                                                return (
                                                    <div key={index} className="mb-4">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-gray-800 flex items-center">
                                                                {isWinner && (
                                                                    <span className="mr-2 text-yellow-500">🏆</span>
                                                                )}
                                                                {option}
                                                            </span>
                                                            <span className="text-gray-600 font-medium">
                                                                {votes} votes ({percentage.toFixed(1)}%)
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full">
                                                            <div
                                                                className={`h-4 rounded-full transition-all duration-300 ease-in-out ${isWinner ? "bg-gradient-to-r from-amber-300 to-amber-500" : "bg-gradient-to-r from-gray-400 to-gray-500"}`}
                                                                style={{ width: `${percentage}%`, visibility: percentage > 0 ? "visible" : "hidden" }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {showModal && (
                        <VotingEventForm
                            onClose={() => {
                                setShowModal(false);
                                setEditingEvent(null);
                            }}
                            onSubmit={handleSubmit}
                            initialData={editingEvent}
                        />
                    )}
                </div>
            </div>
        </section >
    );
};

const VotingEventForm = ({ onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        title: "",
        description: "",
        startDate: "",
        startTime: "09:00",
        dueDate: "",
        dueTime: "23:59",
        options: ["", ""]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        setFormData({ ...formData, options: newOptions });
    };

    const addOption = () => {
        setFormData({ ...formData, options: [...formData.options, ""] });
    };

    const removeOption = (index) => {
        const newOptions = formData.options.filter((_, i) => i !== index);
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.description && formData.startDate &&
            formData.startTime && formData.dueDate && formData.dueTime &&
            formData.options.every(option => option.trim())) {
            onSubmit(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {initialData ? "Edit Event" : "Create New Event"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <FiX className="text-gray-600" />
                    </button>
                </div>
                {/*  */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            //required
                            minLength={3}
                            maxLength={100}
                            placeholder="Enter event title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                            //required
                            minLength={0}
                            maxLength={500}
                            placeholder="Enter event description"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date *
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                //required
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Time *
                            </label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            //required
                            // min="00:30"
                            // max="23:59"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Due Date *
                            </label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                //required
                                min={formData.startDate}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Due Time *
                            </label>
                            <input
                                type="time"
                                name="dueTime"
                                value={formData.dueTime}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                //required
                                min={formData.startDate === formData.dueDate + 30 ? formData.startTime : "00:30"}
                                max="23:59"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Options (Minimum 2)
                        </label>
                        {formData.options.map((option, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={`Option ${index + 1}`}
                                //required
                                />
                                {formData.options.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                    >
                                        <FiX />
                                    </button>
                                )}
                            </div>
                        ))}
                        {formData.options.length < 5 && (
                            <button
                                type="button"
                                onClick={addOption}
                                className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center"
                            >
                                <FiPlus className="mr-1" /> Add Option (Max 5)
                            </button>
                        )}
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                            disabled={!formData.title || !formData.description || !formData.startDate || !formData.startTime || !formData.dueDate || !formData.dueTime || formData.options.some(option => !option.trim())}
                        >
                            {initialData ? "Update" : "Create"} Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;
