"use client";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const eventData = {
  "24hour-hackathon": {
    imagePath: "/hack24img.jpg",
    title: "24-Hour Hackathon",
    span: "24-Hour Hackathon Where Sleep Is Optional and Caffeine Is Mandatory ",
    isPopUp: true,
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
    domain: [
      "AR in Education",
      "AI-powered Healthcare Applications",
      "Development of E-learning Platforms",
      "Chatbot for Women Empowerment",
      "Sentiment and Behavioral Analysis in Monitoring Applications",
      "Enhancement of Security in E-Commerce Platforms",
      "Blockchain-based Societal Applications",
      "Personalized Recommendation Systems",
      "GenAI on Ethical Practices",
      "Zero Trust Security Model on Cloud",
      "AI-driven Healthcare Diagnostics and Personalized Treatment",
      "Sustainable AI Solutions for Green Tech Applications",
      "Advanced Data Privacy Protocols in AI/ML Systems",
      "AI for Mental Health Support and Therapy",
      "AI-Powered Financial Analytics and Fraud Detection"
  ],
  
    venue:
      "Seminar Hall @ Sri Sairam College of Engineering, Anekal, Bengaluru",
    rules: [
      "Team size must be 3-4 members (No Individual participation and No changes in team members once registered)",
      "No pre-written code allowed",
      "Judging criteria: Creativity, Functionality, Pitching",

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
    link: "https://forms.gle/4iUy1uXv8LnWZHoeA",
    warning:
      "This is a team event with an entry fee of ₹800. Enjoy an overnight experience with snacks, food, and exclusive swags!",
  },
  webathon: {
    imagePath: "/webathon.jpeg",
    title: "Webathon",
    isRule: true,
    about:
      "A competitive coding event where participants build dynamic websites from scratch under strict guidelines. Test your web development skills in this two-round challenge that evaluates both technical knowledge and practical implementation.",
    prizes: [
      "Must include dynamic functionality (user auth, DB calls, APIs)",
      "No pre-built templates allowed - all code must be written during event",
      "Submit both source code and hosted link (if applicable)",
      "Judging based on: Functionality, Code quality, Creativity, and UI/UX",
      "Registration fee: ₹300 per participant",
      "This is a duo event, but each participant must pay ₹300",
      "Enjoy access to two additional events with this registration!",
    ],
    venue: "Computer Lab, Main Building",
    rules: [
      "Strictly duo event [no team]",
      "Participants must bring their own laptop/device",
      "No AI tools (e.g., ChatGPT, Copilot) for coding",
      "No copy-pasting from existing projects",
      "Internet allowed only for documentation (MDN, Stack Overflow)",
      "Round 1: 30-minute MCQ test on web dev fundamentals and algorithms",
      "Round 2: 3-hour on-the-spot website development from scratch",
    ],
    amount: "300 per participant",
    link: "https://forms.gle/WwdDv9W7z1cpB8Dn7",
    warning:
      "This is a duo event, but each participant must pay ₹300. Enjoy access to two additional events with this registration!",
  },
  "uiux-design-challenge": {
    imagePath: "/uiux.jpeg",
    title: "UI/UX Design Challenge",
    isDate: true,
    about:
      "Welcome to the UI/UX Challenge Event! This exciting event brings together designers, developers, and creatives to showcase their skills, solve real-world design problems, and push the boundaries of user experience and interface design Whether you're a seasoned designer or a newcomer to the world of UI/UX, this event is a unique opportunity to learn, collaborate, and grow. You'll face off against other teams to create innovative, user-centered design solutions within a set timeframe.",
    prizes: [
      "Event Timeline:",
      " Theme Announcement",
      " 30mins - Research & Planning",
      " Design Phase",
      " Prototyping",
      " 3pm- Final Submission",
    ],
    venue: "Design Lab, Main Building",
    rules: [
      "Team Size: Strictly 2 members (no exceptions)",
      "Max Capacity: First 10 registered teams only",
      "Duration: 3 hours strictly enforced",
      "Theme revealed at event start",
      "Must bring your own charged laptop with design software (Figma/Adobe XD/Sketch)",
      "Internet only allowed for: Asset downloads & cloud tool access",
    ],
    
    amount: "300 per participant",
    link: "https://forms.gle/WwdDv9W7z1cpB8Dn7",
    isAgenda: true,
    warning:
      "This is a duo event, but each participant must pay ₹300. Enjoy access to two additional events with this registration!",
  },
  mobilathon: {
    imagePath: "/mobilathon.jpeg",
    title: "Mobilathon",
    about: [
      "Mobilathon is an exciting mobile app development hackathon that challenges participants to showcase their coding skills, creativity, and problem-solving abilities. Designed for budding developers and tech enthusiasts, the event unfolds in two dynamic rounds — a fast-paced technical quiz followed by an intense theme-based app building session. Participants will compete in teams of two, working under pressure to deliver innovative mobile app solutions using platforms like Android (Java/Kotlin), iOS (Swift), or cross-platform tools like Flutter and React Native. Whether you're a student or a passionate coder, Mobilathon is your chance to turn ideas into impactful prototypes and gain hands-on experience in real-world mobile development.",
      "Unleash your creativity in this design sprint! Compete with top designers to create intuitive and visually stunning UI/UX experiences."
    ],

    domain: [
      "Android (Java/Kotlin/XML)",
      "iOS (Swift)",
      "Cross-platform (Flutter, React Native)"
    ],

    venue: "Sri Sairam College Of Engineering, Anekal , Bengaluru",
    rules: [
      "Each team must consist of 2 members only.",
      "Participants can register either in advance or on the spot by providing complete details.",
      "No pre-built code or templates are allowed.",
      "The competition will be conducted in two rounds:",
      "Round 1: Technical Quiz\n• Format: Offline multiple-choice quiz\n• No. of Questions: 30\n• Duration: 30 minutes\n• Topics: Basic programming, mobile app development (Android/iOS), UI/UX, databases, logic & algorithms",
      "Round 2: Theme-Based Mobile App Development\n• Duration: 3 hours\n• Task: Build a functional mobile app (prototype or MVP) based on the given theme",
      "Each team must submit:\n• APK or source code\n• Short demo or explanation (if time permits)"
    ],


    link: "https://forms.gle/WwdDv9W7z1cpB8Dn7",
    warning:
      "This is a duo event, but each participant must pay ₹300. Enjoy access to two additional events with this registration!",
  },
  connections: {
    imagePath: "/connection.jpeg",
    title: "Technical Connections Challenge",
    about:
      "A fast-paced technical puzzle game where teams race to find connections between technical concepts. Test your pattern recognition and technical knowledge under time pressure!",
    prizes: [
      "Strict Restrictions:",
      "  • No internet or AI tools allowed",
      "  • Pure logical deduction only",
      "  • No external help or references",
      "Game Progression:",
      "  • Multiple rounds with escalating difficulty",
      "  • Example: 'Git, Merge, Fork' → 'Version control'",
      "Winning Criteria:",
      "  • Highest score after all rounds",
      "  • Speed as tiebreaker for equal scores",
      "Registration: ₹300 per participant (both team members must pay)",
      "Bonus: Registration includes access to two additional events",
    ],
    isRule: true,
    warning:
      "This is a solo event, pay ₹300. Enjoy access to two additional events with this registration!",
    venue: "Seminar Hall, Main Building",
    rules: [
      "Team Size: Strictly 2 members (no exceptions)",
      "Game Format:",
      "  • Each round presents technical hints (images/keywords/code snippets)",
      "  • Identify the common connection between them",
      "Time Limit: 90 seconds per round",
      "Scoring Rules:",
      "  • Correct answer: 1 point (exact connection phrase required)",
      "  • Wrong/off-topic answers: 0 points",
      "  • Ties broken by speed of correct answers",
    ],
    amount: "300 per participant",
    link: "https://forms.gle/WwdDv9W7z1cpB8Dn7",
  },
  "c-debugging": {
    imagePath: "/debug.jpeg",
    title: "C Debugging Challenge",
    about:
      "A competitive debugging event where participants race against time to identify and fix bugs in provided C programs. Test your problem-solving skills and attention to detail in this intense coding challenge.",
    prizes: [
      "Provided C program with intentional errors",
      "Must identify and fix all bugs within time limit",
      "No AI tools (Copilot, ChatGPT, etc.)",
      "No external help (internet/notes/discussion)",
      "Only standard C libraries allowed",
      "Cannot modify expected output logic (only debugging)",
      "- Judging Criteria:",
      "Correctness of debugged code (primary)",
      "Efficiency in fixing errors",
      "Time taken (tie-breaker for equal scores)",
    ],
    venue: "Computer Lab 3, Main Building",
    rules: [
      "Solo participation only (no teams)",
      "Duration: Strict 2-hour limit",
      "Scoring: Based on number of bugs successfully fixed",
    ],
    amount: "300 per participant",
    isRule: true,
    link: "https://forms.gle/WwdDv9W7z1cpB8Dn7",
    warning:
      "This is a solo event, pay 300 rs. Enjoy access to two additional events with this registration!",
  },
  chatbot: {
    imagePath: "/chatbot.jpg",
    title: "ChatBot",
    isRule: true,
    amount: 300,
    about:
      "Welcome to the Chatbot Creation Competition - a thrilling challenge designed to ignite creativity, problem-solving, and tech-savvy innovation! This event invites teams of students to craft their very own chatbots, blending imagination with functionality to create engaging digital assistants.",
    prizes: [
      "Judging",
      "Creativity: Unique and innovative Chabot concepts.",
      "User Experience: Engaging and user-friendly Chabot interactions.",
      "Functionality: Effective and efficient Chabot performance.",
    ],
    venue: "MainBlock, Sri sairam college of engineering",
    rules: [
      ". Team Size: 2-3 students per team.",
      "Platform Usage: Use designated Chabot development platforms",
      " Time Limit: 2 hours",
      ". Originality: Encourage creative and original Chabot designs.",
      "Appropriate Content: Ensure Chabot content is respectful and suitable for all audiences.",
    ],
    link: "https://forms.gle/WwdDv9W7z1cpB8Dn7",
    warning:
      "This is a duo event, but each participant must pay ₹300. Enjoy access to two additional events with this registration!",
  },
  "paper-presentation": {
    imagePath: "/paper.jpg",
    title: "Paper Presentation",
    about:
      "The Paper Presentation at Advayathon is a premier platform for researchers, innovators, and tech enthusiasts to showcase their groundbreaking ideas, theories, and technological advancements. This event encourages participants to explore cutting-edge topics, present well-researched papers, and engage in intellectual discussions with peers and Guides.",
    prizes: ["Open domain, Participant's choice"],
    venue: "Main block, sri sairam college of engineering",
    rules: [
      "Teams must have 2 to 4 participants; individual entries aren't allowed.Shortlisted teams will present to judges, with timing and venue details will be shared in website and WhatsApp group.Papers must follow the IEEE format, with abstracts s should be submitted within 29th April—late entries won’t be accepted. (but plagiarism more than 15% will result in disqualification)",
    ],
    link: "https://forms.gle/WwdDv9W7z1cpB8Dn7",
    amount: 300,
    warning:
      "This is a team event, but each participant must pay ₹300. Enjoy access to two additional events with this registration!",
  },
};

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
    if (eventDetails.isPopUp) {
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
    } else {
      window.location.href = link;
    }
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
          <div className="md:col-span-1 space-y-6 md:space-y-8">
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-orange-500/20">
              <h2 className="text-xl md:text-2xl font-bold text-amber-300 mb-3 md:mb-4">
                Event Timeline
              </h2>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-orange-400">Start Date:</span>
                  <span className="text-amber-100">
                    {eventDetails?.isDate ? 7 : 6} May 2025
                  </span>
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

          <div className="md:col-span-2 space-y-6 md:space-y-8">
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
                {eventDetails.isRule ? (
                  <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="text-orange-500">📜</span>
                    Rules
                  </h3>
                ) : (
                  <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="text-orange-500">📜</span>
                    {eventDetails?.isAgenda ? "Agenda" : "Domains"}
                  </h3>
                )}

                <ul className="space-y-3 md:space-y-4 pl-2">
                  {eventDetails?.domain?.map((rule, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-300 text-sm md:text-base"
                    >
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
                  {eventDetails?.rules?.map((rule, index) => (
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
