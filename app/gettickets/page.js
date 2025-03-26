"use client";
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';
import { FiUpload, FiEdit, FiDownload, FiUser, FiMessageSquare } from 'react-icons/fi';

export default function GetTickets() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null
    });
    const [preview, setPreview] = useState(false);
    const idCardRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const generateIDCard = () => {
        if (formData.name && formData.description && formData.image) {
            setPreview(true);
        }
    };

    const downloadIDCard = () => {
        html2canvas(idCardRef.current).then(canvas => {
            const link = document.createElement('a');
            link.download = 'advaya-id-card.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-black text-white py-8 px-4 sm:py-12 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent tracking-tighter px-2"
                >
                    Your Exclusive Advaya Pass
                </motion.h1>

                {!preview ? (
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white/5 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10"
                    >
                        <div className="space-y-6 sm:space-y-8">
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="p-2 sm:p-3 bg-orange-500/20 rounded-lg sm:rounded-xl">
                                        <FiUser className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                                    </div>
                                    <div className="flex-1 w-full">
                                        <label className="block text-base sm:text-lg mb-2 font-medium text-gray-300">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800/50 rounded-lg sm:rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:ring-2 focus:ring-orange-500 border border-white/10 focus:border-orange-500/50 placeholder-gray-500 text-sm sm:text-base"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="p-2 sm:p-3 bg-orange-500/20 rounded-lg sm:rounded-xl">
                                        <FiMessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                                    </div>
                                    <div className="flex-1 w-full">
                                        <label className="block text-base sm:text-lg mb-2 font-medium text-gray-300">Your Story</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800/50 rounded-lg sm:rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:ring-2 focus:ring-orange-500 border border-white/10 focus:border-orange-500/50 h-32 placeholder-gray-500 text-sm sm:text-base"
                                            placeholder="Why should you be part of Advaya 2024?"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="p-2 sm:p-3 bg-orange-500/20 rounded-lg sm:rounded-xl">
                                        <FiUpload className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                                    </div>
                                    <div className="flex-1 w-full">
                                        <label className="block text-base sm:text-lg mb-2 font-medium text-gray-300">Your Avatar</label>
                                        <label className="flex flex-col items-center justify-center w-full h-32 sm:h-40 cursor-pointer bg-gray-800/50 rounded-xl border-2 border-dashed border-white/10 hover:border-orange-500/50 transition-colors group relative overflow-hidden">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <div className="text-center space-y-1 sm:space-y-2 z-10 px-2">
                                                <div className="text-sm sm:text-base text-gray-400 group-hover:text-orange-400 transition-colors">
                                                    Click to upload
                                                </div>
                                                <div className="text-xs sm:text-sm text-gray-500 group-hover:text-orange-300 transition-colors">
                                                    (JPEG/PNG, max 5MB)
                                                </div>
                                            </div>
                                            {formData.image && (
                                                <img
                                                    src={formData.image}
                                                    alt="Preview"
                                                    className="absolute inset-0 w-full h-full object-cover opacity-20 blur-md"
                                                />
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={generateIDCard}
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all group relative overflow-hidden text-sm sm:text-base"
                            >
                                <span className="relative z-10">Generate Elite Pass</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 sm:space-y-8"
                    >
                        <div
                            ref={idCardRef}
                            className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl mx-auto w-full max-w-[95%] sm:max-w-lg border border-white/10 overflow-hidden"
                        >
                            {/* Holographic Strip */}
                            <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent opacity-30" />

                            <div className="relative z-10">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                                    <div className="space-y-1">
                                        <div className="text-xs sm:text-sm text-gray-400">ADVAYA 2025</div>
                                        <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                            #{Math.floor(100000 + Math.random() * 900000)}
                                        </div>
                                    </div>
                                    <div className="bg-orange-500/20 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-orange-400">
                                        VIP ACCESS
                                    </div>
                                </div>

                                <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-orange-500/50 p-1">
                                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                                {formData.image && (
                                                    <img
                                                        src={formData.image}
                                                        alt="ID Photo"
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/30 to-transparent" />
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 bg-orange-500 text-black px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold">
                                            VERIFIED
                                        </div>
                                    </div>

                                    <div className="text-center space-y-1 sm:space-y-2">
                                        <h2 className="text-2xl sm:text-3xl font-bold">{formData.name}</h2>
                                        <p className="text-gray-300 max-w-xs text-sm sm:text-base leading-relaxed">
                                            {formData.description}
                                        </p>
                                    </div>

                                    <div className="w-full mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                                        <div className="bg-gradient-to-r from-transparent via-orange-500/30 to-transparent h-px" />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                                            <div>
                                                <div className="text-gray-400">Event Dates</div>
                                                <div className="text-gray-200">06-07 May 2025</div>
                                            </div>
                                       
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Pattern */}
                            <div className="absolute inset-0 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,white)]">
                                <div className="absolute inset-0 bg-[url('/noise.png')]" />
                                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px] sm:bg-[size:60px_60px]" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setPreview(false)}
                                className="bg-gray-800/50 hover:bg-gray-700/50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                                <FiEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                                Edit Details
                            </motion.button>

                            <p className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base relative overflow-hidden">
                                Take ScreenShot and keep it
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
