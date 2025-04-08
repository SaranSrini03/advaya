"use client";
import { useState, useRef, Fragment, useEffect } from "react";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import {
  FiUser,
  FiPhone,
  FiBookOpen,
  FiCheckCircle,
  FiMail,
} from "react-icons/fi";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Toaster, toast } from "react-hot-toast";

const eventsList = [
  "Paper Presentation",
  "Hackathon",
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventChange = (selectedEvents) => {
    if (selectedEvents.length > 3) return;
    setFormData((prev) => ({ ...prev, events: selectedEvents }));
  };

  const generateIDCard = async () => {
    const { name, email, college, mobile, events, id } = formData;
    if (name && email && college && mobile && events.length > 0) {
      try {
        const toastId = toast.loading("Sending your pass...");
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
          toast.success("Pass sent to your email!", { id: toastId });
          setPreview(true);
        } else {
          toast.error("Failed to send email", { id: toastId });
          console.error("Failed to send email");
        }
      } catch (error) {
        toast.error("Error sending email");
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent tracking-tighter px-2"
        >
          Your Exclusive Advaya Pass
        </motion.h1>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10"
        >
          <div className="space-y-6 sm:space-y-8">
            <InputField
              icon={<FiUser className="text-orange-400" />}
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
            />

            {/* Email */}
            <InputField
              icon={<FiMail className="text-orange-400" />}
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
            />

            {/* College */}
            <InputField
              icon={<FiBookOpen className="text-orange-400" />}
              label="College Name"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              placeholder="Enter your college name"
            />

            {/* Mobile */}
            <InputField
              icon={<FiPhone className="text-orange-400" />}
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="p-2 sm:p-3 bg-orange-500/20 rounded-xl">
                <FiCheckCircle className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-lg mb-2 font-medium text-gray-300">
                  Select Events (Max 3)
                </label>
                <Listbox
                  value={formData.events}
                  onChange={handleEventChange}
                  multiple
                >
                  {({ open }) => (
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default bg-gray-800/50 rounded-xl py-3 pl-4 pr-10 text-left border border-white/10 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <span className="block truncate text-sm text-white">
                          {formData.events.length > 0
                            ? formData.events.join(", ")
                            : "Select events"}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronUpDownIcon
                            className={`h-5 w-5 text-gray-400 transition-transform ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-2 w-full max-h-60 overflow-auto rounded-xl bg-black/80 py-1 text-base shadow-lg ring-1 ring-white/10 focus:outline-none sm:text-sm backdrop-blur-lg">
                          {eventsList.map((event, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={({ active }) =>
                                `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
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
                  <p className="mt-1 text-xs text-gray-400">
                    Selected: {formData.events.length}/3
                  </p>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateIDCard}
              disabled={
                !formData.name ||
                !formData.email ||
                !formData.college ||
                !formData.mobile ||
                formData.events.length === 0
              }
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold py-4 rounded-xl text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Elite Pass
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="p-2 sm:p-3 bg-orange-500/20 rounded-xl">{icon}</div>
      <div className="flex-1 w-full">
        <label className="block text-lg mb-2 font-medium text-gray-300">
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-gray-800/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 border border-white/10 placeholder-gray-500 text-base focus:outline-none"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
