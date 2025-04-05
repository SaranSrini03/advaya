"use client";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import Image from "next/image";

// Event data object
const eventData = {
    "24hour-hackathon": {
        imagePath: "/hack24img.jpg",
        title: "24-Hour Hackathon",
        about: "24-Hour Hackathon -  Where Sleep Is Optional and Caffeine Is Mandatory Welcome to the ultimate chaos-coding showdown! It's 24 hours of non-stop hacking, where ideas get thrown into the fire, and somehow come out as working prototypes (mostly). Whether you're a keyboard warrior, design wizard, or just here for the snacks — this is where wild dreams meet Wi-Fi and become real. Warning: side effects may include excessive high-fiving, accidental genius, and an unhealthy love for coffee.",
        prizes: ["1st Place: $5,000 + Internship Opportunity", "2nd Place: $2,500 + Tech Gadgets", "3rd Place: $1,000 + Swag Pack"],
        venue: "Seminar Hall @ Sri Sairam College of Engineering",
        rules: ["Team size: 3-4 members", "No pre-written code allowed", "Judging criteria: Creativity, Functionality, Presentation"],
    },
    "webathon": {
        imagePath: "/webathon.jpeg",
        title: "Webathon",
        about: "Join the ultimate 24-hour coding marathon where innovation meets endurance! Compete in a fast-paced, high-energy event with expert mentorship and networking opportunities.",
        prizes: ["1st Place: $5,000 + Internship Opportunity", "2nd Place: $2,500 + Tech Gadgets", "3rd Place: $1,000 + Swag Pack"],
        venue: "Tech Arena, 456 Coding Street, San Francisco, CA",
        rules: ["Team size: 3-4 members", "No pre-written code allowed", "Judging criteria: Creativity, Functionality, Presentation"],
    },
    "uiux-design-challenge": {
        imagePath: "/uiux.jpeg",
        title: "UI / UX Design Challenge",
        about: "Unleash your creativity in this design sprint! Compete with top designers to create intuitive and visually stunning UI/UX experiences.",
        prizes: ["1st Place: $3,000 + Adobe Subscription", "2nd Place: $1,500 + Wacom Tablet", "3rd Place: $750 + Design Swag"],
        venue: "Design Hub, 789 Creative Lane, New York, NY",
        rules: ["Solo or duo participation", "Must use Figma/Adobe XD", "Judging criteria: Aesthetics, User Experience, Innovation"],
    },
    "mobilathon": {
        imagePath: "/mobilathon.jpeg",
        title: "Mobilathon",
        about: "Unleash your creativity in this design sprint! Compete with top designers to create intuitive and visually stunning UI/UX experiences.",
        prizes: ["1st Place: $3,000 + Adobe Subscription", "2nd Place: $1,500 + Wacom Tablet", "3rd Place: $750 + Design Swag"],
        venue: "Design Hub, 789 Creative Lane, New York, NY",
        rules: ["Solo or duo participation", "Must use Figma/Adobe XD", "Judging criteria: Aesthetics, User Experience, Innovation"],
    },
    "connections": {
        imagePath: "/connection.jpeg",
        title: "Connections",
        about: "Find and fix the most bugs in record time! Show off your debugging skills and win exciting rewards.",
        prizes: ["1st Place: $2,000 + GitHub Pro", "2nd Place: $1,000 + Mechanical Keyboard", "3rd Place: $500 + Debugging Swag"],
        venue: "Tech Labs, 321 Code City, Austin, TX",
        rules: ["Individual participation only", "Time limit: 2 hours", "Scoring based on number of bugs fixed"],
    },
    "c-debugging": {
        imagePath: "/debug.jpeg",
        title: "C Debugging",
        about: "Find and fix the most bugs in record time! Show off your debugging skills and win exciting rewards.",
        prizes: ["1st Place: $2,000 + GitHub Pro", "2nd Place: $1,000 + Mechanical Keyboard", "3rd Place: $500 + Debugging Swag"],
        venue: "Tech Labs, 321 Code City, Austin, TX",
        rules: ["Individual participation only", "Time limit: 2 hours", "Scoring based on number of bugs fixed"],
    },
    "chatbot": {
        imagePath: "/chatbot.jpg",
        title: "ChatBot",
        about: "Find and fix the most bugs in record time! Show off your debugging skills and win exciting rewards.",
        prizes: ["1st Place: $2,000 + GitHub Pro", "2nd Place: $1,000 + Mechanical Keyboard", "3rd Place: $500 + Debugging Swag"],
        venue: "Tech Labs, 321 Code City, Austin, TX",
        rules: ["Individual participation only", "Time limit: 2 hours", "Scoring based on number of bugs fixed"],
    },
};

// Function to handle missing events
const getEventDetails = (eventName) => {
    return eventData[eventName] || {
        imagePath: "/default-event-banner.jpg",
        title: "Coming Soon",
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
        <div className=" bg-black text-white h-screen overflow-hidden">
            <Navbar />

            {/* Scrollable Container */}
            <div className="h-[calc(100dvh-4rem)] overflow-y-auto touch-pan-y scroll-smooth pb-8">
                {/* Banner Section */}
                <div className="relative h-64 md:h-96 w-full overflow-hidden">
                    <Image
                        src={eventDetails.imagePath}
                        alt={eventDetails.title}
                        fill
                        className="object-cover object-center"
                        quality={80}
                        priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black to-transparent z-10">
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold inline-block bg-black/80 px-4 py-2 text-orange-400 drop-shadow-xl">
                            {eventDetails.title}
                        </h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Column */}
                    <div className="md:col-span-1 space-y-6 md:space-y-8">
                        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-orange-500/20">
                            <h2 className="text-xl md:text-2xl font-bold text-amber-300 mb-3 md:mb-4">Event Timeline</h2>
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex justify-between items-center text-sm md:text-base">
                                    <span className="text-orange-400">Start Date:</span>
                                    <span className="text-amber-100">24 Oct 2024</span>
                                </div>
                                <div className="flex justify-between items-center text-sm md:text-base">
                                    <span className="text-orange-400">End Date:</span>
                                    <span className="text-amber-100">26 Oct 2024</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-3 md:py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-500 rounded-lg md:rounded-xl text-lg md:text-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,165,0,0.3)] hover:shadow-[0_0_30px_rgba(255,165,0,0.5)] md:hover:scale-105 active:scale-95">
                            Register Now
                        </button>
                    </div>

                    {/* Right Column - Full Visibility */}
                    <div className="md:col-span-2 space-y-6 md:space-y-8">
                        {/* About Section */}
                        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border border-orange-500/20">
                            <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-4 md:mb-6">About the Event</h2>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base">{eventDetails.about}</p>
                        </div>

                        {/* Prizes & Rules Grid */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-orange-500/20">
                                <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-3 md:mb-4 flex items-center gap-2">
                                    <span className="text-orange-500">🏆</span> Prizes
                                </h3>
                                <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                                    {eventDetails.prizes.map((prize, index) => (
                                        <li key={index}>{prize}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-orange-500/20">
                                <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-3 md:mb-4 flex items-center gap-2">
                                    <span className="text-orange-500">📜</span> Rules
                                </h3>
                                <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                                    {eventDetails.rules.map((rule, index) => (
                                        <li key={index}>{rule}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Venue Section */}
                        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-orange-500/20">
                            <h3 className="text-xl md:text-2xl font-bold text-amber-300 mb-3 md:mb-4 flex items-center gap-2">
                                <span className="text-orange-500">📍</span> Venue
                            </h3>
                            <p className="text-gray-300 text-sm md:text-base">{eventDetails.venue}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
