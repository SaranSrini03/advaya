"use client";
import { useState, useRef, Fragment, useEffect } from "react";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { FiUser, FiPhone, FiBookOpen, FiMail } from "react-icons/fi";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Toaster, toast } from "react-hot-toast";

const eventsList = [
  "Paper Presentation",
  "Webathon",
  "Mobilathon",
  "UI/UX",
  "Connections",
  "C Debugging",
  "Chatbot Making",
];

export default function GetTickets() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    mobile: "",
    events: [],
    id: "",
    isHackathon: false,
  });
  const [preview, setPreview] = useState(false);
  const idCardRef = useRef(null);

  useEffect(() => {
    const randomId = generateRandomId();
    setFormData((prev) => ({ ...prev, id: randomId }));
  }, []);

  const generateRandomId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "ADV-";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "isHackathon" && checked) {
      setFormData((prev) => ({ ...prev, events: [] }));
    }
  };

  const handleEventChange = (selectedEvents) => {
    if (selectedEvents.length > 3) return;
    setFormData((prev) => ({ ...prev, events: selectedEvents }));
  };

  const generateIDCard = async () => {
    let { name, email, college, mobile, events, id, isHackathon } = formData;

    if (isHackathon) {
      events = ["Hackathon"];
    }

    if (
      name &&
      email &&
      college &&
      mobile &&
      (events.length > 0 || isHackathon)
    ) {
      try {
        const toastId = toast.loading("Generating your pass...");
        const response = await fetch("/api/mailer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            name: name,
            events: events,
            id: id,
            college: college,
            mobile: mobile,
          }),
        });

        if (response.ok) {
          toast.success("Pass generated successfully!", { id: toastId });
          setPreview(true);
        } else {
          toast.error("Failed to generate pass", { id: toastId });
          console.error("Failed to send email");
        }
      } catch (error) {
        toast.error("Error generating pass");
        console.error("Error:", error);
      }
    }
  };

  const downloadIDCard = () => {
    html2canvas(idCardRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = `advaya-id-card-${formData.id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-black text-white py-8 px-4 sm:py-12 sm:px-6">
      <Toaster
        position="top-left"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Payment Confirmation Banner (replaced marquee for better mobile UX) */}
        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg mb-8 p-4 text-center">
          <p className="text-sm font-medium">
            IMPORTANT: Complete payment through Google Form before generating
            your pass.
          </p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-10 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent tracking-tight"
        >
          Advaya 2024 Event Pass
        </motion.h1>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 backdrop-blur-2xl rounded-xl md:rounded-2xl p-5 sm:p-7 shadow-xl border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-5">
              <InputField
                icon={<FiUser className="text-orange-400" />}
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />

              <InputField
                icon={<FiMail className="text-orange-400" />}
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-5">
              <InputField
                icon={<FiBookOpen className="text-orange-400" />}
                label="College Name"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                placeholder="Enter your college"
              />

              <InputField
                icon={<FiPhone className="text-orange-400" />}
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter your mobile"
              />
            </div>
          </div>

          {/* Full-width elements below the two columns */}
          <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">
            {/* Hackathon Checkbox */}
            <div className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg">
              <input
                type="checkbox"
                name="isHackathon"
                checked={formData.isHackathon}
                onChange={handleInputChange}
                className="mt-1 h-5 w-5 text-orange-500 rounded focus:ring-orange-500 border-gray-300"
              />
              <div>
                <label className="block text-lg font-medium text-gray-300">
                  Hackathon Participation
                </label>
                <p className="text-sm text-gray-400 mt-1">
                  (Exclusive event - cannot be combined with others)
                </p>
              </div>
            </div>

            {/* Events Dropdown */}
            {!formData.isHackathon && (
              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-300">
                  Select Events (Max 3)
                </label>
                <Listbox
                  value={formData.events}
                  onChange={handleEventChange}
                  multiple
                >
                  {({ open }) => (
                    <div className="relative">
                      <Listbox.Button className="relative w-full bg-gray-800/50 rounded-lg py-3 pl-4 pr-10 text-left border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base">
                        <span className="block truncate">
                          {formData.events.length > 0
                            ? formData.events.join(", ")
                            : "Select your events"}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-lg bg-gray-900 py-1 text-base shadow-lg ring-1 ring-white/10 focus:outline-none sm:text-sm">
                          {eventsList.map((event, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-orange-500/20 text-white"
                                    : "text-gray-300"
                                }`
                              }
                              value={event}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected
                                        ? "font-medium text-orange-400"
                                        : "font-normal"
                                    }`}
                                  >
                                    {event}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-400">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
                {formData.events.length > 0 && (
                  <p className="text-xs text-gray-400">
                    Selected: {formData.events.length}/3 events
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateIDCard}
              disabled={
                !formData.name ||
                !formData.email ||
                !formData.college ||
                !formData.mobile ||
                (formData.events.length === 0 && !formData.isHackathon)
              }
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 sm:py-4 rounded-lg text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Generate Event Pass
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({
  icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="space-y-1">
      <label className="block text-base sm:text-lg font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-gray-800/50 rounded-lg py-2 sm:py-3 pl-10 pr-4 border border-white/10 focus:ring-2 focus:ring-orange-500 focus:outline-none placeholder-gray-500 text-sm sm:text-base"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
