"use client";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/NavBar";

// Event data object
const eventData = {
    "24hour-hackathon": {
        title: "24-Hour Hackathon",
        about: "Join the ultimate 24-hour coding marathon where innovation meets endurance! Compete in a fast-paced, high-energy event with expert mentorship and networking opportunities.",
        prizes: ["1st Place: $5,000 + Internship Opportunity", "2nd Place: $2,500 + Tech Gadgets", "3rd Place: $1,000 + Swag Pack"],
        venue: "Tech Arena, 456 Coding Street, San Francisco, CA",
        rules: ["Team size: 3-4 members", "No pre-written code allowed", "Judging criteria: Creativity, Functionality, Presentation"],
    },
    "uiux-design-challenge": {
        title:"UI / UX Design Challenge",
        about: "Unleash your creativity in this design sprint! Compete with top designers to create intuitive and visually stunning UI/UX experiences.",
        prizes: ["1st Place: $3,000 + Adobe Subscription", "2nd Place: $1,500 + Wacom Tablet", "3rd Place: $750 + Design Swag"],
        venue: "Design Hub, 789 Creative Lane, New York, NY",
        rules: ["Solo or duo participation", "Must use Figma/Adobe XD", "Judging criteria: Aesthetics, User Experience, Innovation"],
    },
    "debugging": {
        about: "Find and fix the most bugs in record time! Show off your debugging skills and win exciting rewards.",
        prizes: ["1st Place: $2,000 + GitHub Pro", "2nd Place: $1,000 + Mechanical Keyboard", "3rd Place: $500 + Debugging Swag"],
        venue: "Tech Labs, 321 Code City, Austin, TX",
        rules: ["Individual participation only", "Time limit: 2 hours", "Scoring based on number of bugs fixed"],
    },
};

// Function to handle missing events
const getEventDetails = (eventName) => {
    return eventData[eventName] || {
        about: "Details will be available soon. Stay tuned!",
        prizes: ["TBD"],
        venue: "Venue details coming soon!",
        rules: ["Rules will be announced soon."],
    };
};

export default function EventDetails() {
    const { eventName } = useParams();
    const formattedTitle = eventName.replace(/-/g, " ");
    const eventDetails = getEventDetails(eventName);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white">
            <Navbar />

            {/* Banner Section */}
            <div className="relative h-96 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-600/10" />
                <div
                    className="h-full w-full bg-gray-800 animate-pulse"
                    style={{
                        backgroundImage: "url('/placeholder-event.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                        <h1 className="text-4xl md:text-6xl font-bold text-orange-400 drop-shadow-xl">
                            {eventDetails.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="md:col-span-1 space-y-8">
                    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20">
                        <h2 className="text-2xl font-bold text-amber-300 mb-4">Event Timeline</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-orange-400">Start Date:</span>
                                <span className="text-amber-100">24 Oct 2024</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-orange-400">End Date:</span>
                                <span className="text-amber-100">26 Oct 2024</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-500 rounded-xl text-xl font-bold transition-all duration-300 shadow-[0_0_30px_rgba(255,165,0,0.3)] hover:shadow-[0_0_50px_rgba(255,165,0,0.5)] hover:scale-105">
                        Register Now
                    </button>
                </div>

                {/* Right Column */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20">
                        <h2 className="text-3xl font-bold text-amber-300 mb-6">About the Event</h2>
                        <p className="text-gray-300 leading-relaxed">{eventDetails.about}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-colors">
                            <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
                                <span className="text-orange-500">🏆</span> Prizes
                            </h3>
                            <ul className="space-y-2 text-gray-300">
                                {eventDetails.prizes.map((prize, index) => (
                                    <li key={index}>{prize}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-colors">
                            <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
                                <span className="text-orange-500">📜</span> Rules
                            </h3>
                            <ul className="space-y-2 text-gray-300">
                                {eventDetails.rules.map((rule, index) => (
                                    <li key={index}>{rule}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20">
                        <h3 className="text-2xl font-bold text-amber-300 mb-4 flex items-center gap-2">
                            <span className="text-orange-500">📍</span> Venue
                        </h3>
                        <p className="text-gray-300">{eventDetails.venue}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
