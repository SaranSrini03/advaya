"use client";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Event data object
const eventData = {
  "24hour-hackathon": {
    imagePath: "/hack24img.jpg",
    title: "24-Hour Hackathon",
    span: "24-Hour Hackathon Where Sleep Is Optional and Caffeine Is Mandatory ",
    about:
      "Welcome to the ultimate code-fueled chaos! For the next 24 hours, its you, your team, and a mountain of caffeine turning half-baked ideas into fully-functional prototypes (hopefully). Whether youre a code ninja, pixel-perfect designer, or just here for the snacks, this is where imagination collides with innovation. Side effects may include spontaneous breakthroughs, intense keyboard mashing, and a dangerously passionate relationship with coffee. Buckle up — its going to be a wild ride!",
    prizes: [
      "AR in education",
      "AI powered Health Care Applications",
      "Development of E-learning platform",
      "Chat bot using AI",
      "Sentiment and Behavioural Analysis in Monitoring Applications",
      "Enhancement of Security in E Commerce Platforms",
      "Blockchain based Authentication Systems",
      "Personalized recommendation systems",
      "GenAI on ethical practices",
      "Zero trust security model on Cloud",
    ],
    venue:
      "Seminar Hall @ Sri Sairam College of Engineering, Anekal, Bengaluru",
    rules: [
      // Existing rules
      "Team size must be 3-4 members (No Individual participation and No changes in team members once registered)",
      "No pre-written code allowed",
      "Judging criteria: Creativity, Functionality, Pitching",

      // New rules from your structure
      "On-the-spot registration strictly prohibited",
      "Mandatory single problem statement selection during registration",
      "No mid-event problem statement changes allowed",
      "3-round format with strict time enforcement",
      "Final submission via designated GitHub repository",
      "Project completion mandatory for evaluation",
      "Strict ethical coding practices required",
      "Malpractice leads to immediate disqualification",
      "Personal devices with pre-installed software required",
      "No time extensions under any circumstances",
      "Food/accommodation provided only during event hours",
    ],
    amount: 800,
    link: "www.google.com",
    warning:
      "This is a team event with an entry fee of ₹800. Enjoy an overnight experience with snacks, food, and exclusive swags!",
  },
  webathon: {
    imagePath: "/webathon.jpeg",
    title: "Webathon",
    about:
      "A competitive coding event where participants build dynamic websites from scratch under strict guidelines. Test your web development skills in this two-round challenge that evaluates both technical knowledge and practical implementation.",
    prizes: [
      "1st Place: ₹10,000 + Trophy",
      "2nd Place: ₹7,000 + Certificate",
      "3rd Place: ₹5,000 + Certificate",
    ],
    venue: "Computer Lab, Main Building",
    rules: [
      "Strictly individual participation (no teams)",
      "Participants must bring their own laptop/device",
      "No AI tools (e.g., ChatGPT, Copilot) for coding",
      "No copy-pasting from existing projects",
      "Internet allowed only for documentation (MDN, Stack Overflow)",
    ],
    competitionStructure: [
      {
        round: "Round 1: Technical Quiz",
        description:
          "30-minute MCQ test (web dev fundamentals, algorithms, etc.)",
        duration: "30 minutes",
      },
      {
        round: "Round 2: On-the-Spot Website Development",
        description:
          "Build a dynamic website (frontend + backend) from scratch based on revealed theme",
        duration: "3 hours",
      },
    ],
    requirements: [
      "Dynamic functionality (e.g., user auth, DB calls, APIs)",
      "No pre-built templates (HTML/CSS/JS must be coded live)",
      "Submit source code + hosted link (if applicable)",
    ],
    judgingCriteria: [
      "Functionality (features working + theme adherence)",
      "Code quality (structure, comments, efficiency)",
      "Creativity (unique solution to theme)",
      "UI/UX (design + responsiveness)",
    ],
    amount: "₹300 per participant",
    link: "//whis.vercel.app",
    warning:
      "This is a duo event, but each participant must pay ₹300. Enjoy access to two additional events with this registration!",
  },
  "uiux-design-challenge": {
    imagePath: "/uiux.jpeg",
    title: "UI / UX Design Challenge",
    about:
      "Unleash your creativity in this design sprint! Compete with top designers to create intuitive and visually stunning UI/UX experiences.",
    prizes: [
      "1st Place: $3,000 + Adobe Subscription",
      "2nd Place: $1,500 + Wacom Tablet",
      "3rd Place: $750 + Design Swag",
    ],
    venue: "Design Hub, 789 Creative Lane, New York, NY",
    rules: [
      "Solo or duo participation",
      "Must use Figma/Adobe XD",
      "Judging criteria: Aesthetics, User Experience, Innovation",
    ],
    link: "//tokentrex.vercel.app",
    warning:
      "This is a duo event, but each participant must pay ₹300. Enjoy access to two additional events with this registration!",
    amount: "300 per/head",
  },
  mobilathon: {
    imagePath: "/mobilathon.jpeg",
    title: "Mobilathon",
    about:
      "Unleash your creativity in this design sprint! Compete with top designers to create intuitive and visually stunning UI/UX experiences.",
    prizes: [
      "1st Place: $3,000 + Adobe Subscription",
      "2nd Place: $1,500 + Wacom Tablet",
      "3rd Place: $750 + Design Swag",
    ],
    venue: "Design Hub, 789 Creative Lane, New York, NY",
    rules: [
      "Solo or duo participation",
      "Must use Figma/Adobe XD",
      "Judging criteria: Aesthetics, User Experience, Innovation",
    ],
    link: "//whis.vercel.app",
    warning:
      "This is a duo event, but each participant must pay ₹300. Enjoy access to two additional events with this registration!",
  },
  connections: {
    imagePath: "/connection.jpeg",
    title: "Connections",
    about:
      "Find and fix the most bugs in record time! Show off your debugging skills and win exciting rewards.",
    prizes: [
      "1st Place: $2,000 + GitHub Pro",
      "2nd Place: $1,000 + Mechanical Keyboard",
      "3rd Place: $500 + Debugging Swag",
    ],
    venue: "Tech Labs, 321 Code City, Austin, TX",
    rules: [
      "Individual participation only",
      "Time limit: 2 hours",
      "Scoring based on number of bugs fixed",
    ],
    link: "//whis.vercel.app",
    warning:
      "This is a duo event, but each participant must pay ₹300. Enjoy access to two additional events with this registration!",
  },
  "c-debugging": {
    imagePath: "/debug.jpeg",
    title: "C Debugging",
    about:
      "Find and fix the most bugs in record time! Show off your debugging skills and win exciting rewards.",
    prizes: [
      "1st Place: $2,000 + GitHub Pro",
      "2nd Place: $1,000 + Mechanical Keyboard",
      "3rd Place: $500 + Debugging Swag",
    ],
    venue: "Tech Labs, 321 Code City, Austin, TX",
    rules: [
      "Individual participation only",
      "Time limit: 2 hours",
      "Scoring based on number of bugs fixed",
    ],
    link: "//whis.vercel.app",
    warning:
      "This is a duo event, but each participant must pay ₹300. Enjoy access to two additional events with this registration!",
  },
  chatbot: {
    imagePath: "/chatbot.jpg",
    title: "ChatBot",
    about:
      "Find and fix the most bugs in record time! Show off your debugging skills and win exciting rewards.",
    prizes: [
      "1st Place: $2,000 + GitHub Pro",
      "2nd Place: $1,000 + Mechanical Keyboard",
      "3rd Place: $500 + Debugging Swag",
    ],
    venue: "Tech Labs, 321 Code City, Austin, TX",
    rules: [
      "Individual participation only",
      "Time limit: 2 hours",
      "Scoring based on number of bugs fixed",
    ],
    link: "//whis.vercel.app",
    warning:
      "This is a duo event, but each participant must pay ₹300. Enjoy access to two additional events with this registration!",
  },
};

// Function to handle missing events
const getEventDetails = (eventName) => {
  return (
    eventData[eventName] || {
      imagePath: "/default-event-banner.jpg",
      title: "Coming Soon",
      about: "Details will be available soon. Stay tuned!",
      prizes: ["TBD"],
      venue: "Venue details coming soon!",
      rules: ["Rules will be announced soon."],
    }
  );
};

export default function EventDetails() {
  const { eventName } = useParams();
  const formattedTitle = eventName.replace(/-/g, " ");
  const eventDetails = getEventDetails(eventName);
  const router = useRouter();

  const HandleRegister = (link) => {
    toast.error(
      "Only team leader should register! If you are a team leader, proceed...",
      {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          backgroundColor: "#1a1a1a",
          border: "1px solid #ff6600",
          color: "#ffa500",
          fontWeight: "bold",
        },
      }
    );
    setTimeout(() => {
      window.location.href = link;
    }, 2000);
  };

  return (
    <div className="bg-black text-white h-screen overflow-hidden">
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #ff6600",
          color: "#ffa500",
        }}
      />

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
              <h2 className="text-xl md:text-2xl font-bold text-amber-300 mb-3 md:mb-4">
                Event Timeline
              </h2>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-orange-400">Start Date:</span>
                  <span className="text-amber-100">6 May 2025</span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-orange-400">End Date:</span>
                  <span className="text-amber-100">7 May 2025</span>
                </div>
              </div>
            </div>
            <p className="text-center text-sm sm:text-md font-semibold text-white bg-red-500 border border-red-300 rounded-lg px-4 py-2 mt-4 mb-6 shadow-md animate-pulse">
              ⚠️ {eventDetails.warning}
            </p>

            <button
              onClick={() => HandleRegister(eventDetails.link)}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-500 rounded-lg md:rounded-xl text-lg md:text-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,165,0,0.3)] hover:shadow-[0_0_30px_rgba(255,165,0,0.5)] md:hover:scale-105 active:scale-95"
            >
              Register Now ₹ {eventDetails?.amount}
            </button>
          </div>

          {/* Right Column - Full Visibility */}
          <div className="md:col-span-2 space-y-6 md:space-y-8">
            {/* About Section */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border border-orange-500/20">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-4 md:mb-6">
                About the Event
              </h2>
              <p className="text-orange-500 font-bold leading-relaxed text-sm md:text-base">
                {eventDetails?.span}
              </p>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {eventDetails.about}
              </p>
            </div>

            {/* Prizes & Rules Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-orange-500/20">
                <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-3 md:mb-4 flex items-center gap-2">
                  <span className="text-orange-500">📜</span> Domains
                </h3>
                <ul className="space-y-3 md:space-y-4 pl-2">
                  {eventDetails.prizes.map((rule, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-300 text-sm md:text-base"
                    >
                      {/* Custom bullet */}
                      <span className="text-orange-400 mt-0.5">▹</span>
                      <span className="flex-1">
                        {rule.split(":").map((part, i) =>
                          i === 0 ? (
                            <span
                              key={i}
                              className="text-amber-200 font-medium"
                            >
                              {part}
                            </span>
                          ) : (
                            part
                          )
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-orange-500/20">
                <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-3 md:mb-4 flex items-center gap-2">
                  <span className="text-orange-500">📜</span> Rules
                </h3>
                <ul className="space-y-3 md:space-y-4 pl-2">
                  {eventDetails.rules.map((rule, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-300 text-sm md:text-base"
                    >
                      {/* Custom bullet */}
                      <span className="text-orange-400 mt-0.5">▹</span>
                      <span className="flex-1">
                        {rule.split(":").map((part, i) =>
                          i === 0 ? (
                            <span
                              key={i}
                              className="text-amber-200 font-medium"
                            >
                              {part}
                            </span>
                          ) : (
                            part
                          )
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Venue Section */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-orange-500/20">
              <h3 className="text-xl md:text-2xl font-bold text-amber-300 mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-orange-500">📍</span> Venue
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                {eventDetails.venue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
