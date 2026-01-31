import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Heart, RotateCcw, Play } from 'lucide-react';

export const StoryCard = ({ page, totalPages, onNext, onPrev, onStartMusic, isMusicStarted }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/50"
        >

            {/* Left: Content */}
            <div className="p-12 flex flex-col justify-center relative z-10">

                {/* Logo */}
                <div className="absolute top-10 left-10 flex items-center gap-3 opacity-90">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-pink to-soft-pink flex items-center justify-center text-white font-playfair font-bold text-lg shadow-lg">
                        LL
                    </div>
                    <div>
                        <h3 className="font-playfair font-bold text-gray-800 text-lg leading-none">Love Loop</h3>
                        <p className="text-xs text-uppercase tracking-widest text-accent-pink/80 font-bold mt-1">Forever Story</p>
                    </div>
                </div>

                <div className="mt-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={page.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <div className="inline-block px-4 py-1.5 rounded-full bg-accent-pink/10 text-accent-pink text-xs font-bold tracking-widest uppercase mb-6">
                                {page.date}
                            </div>

                            <div className={`transition-all duration-700 ${page.id === 1 && !isMusicStarted ? 'blur-sm select-none pointer-events-none' : ''}`}>
                                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                                    {page.title}
                                </h1>

                                <p className="font-quicksand text-lg text-gray-600 leading-relaxed mb-10 max-w-md">
                                    {page.text}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {page.id === 1 && !isMusicStarted ? (
                                    <button
                                        onClick={onStartMusic}
                                        className="group px-8 py-4 bg-gradient-to-r from-accent-pink to-rose-400 text-white rounded-full font-bold shadow-lg shadow-rose-300/30 hover:shadow-rose-400/50 hover:-translate-y-1 transition-all flex items-center gap-2 z-50"
                                    >
                                        Start Journey 🎵
                                    </button>
                                ) : (
                                    <button
                                        onClick={onNext}
                                        className="group px-8 py-4 bg-gradient-to-r from-accent-pink to-rose-400 text-white rounded-full font-bold shadow-lg shadow-rose-300/30 hover:shadow-rose-400/50 hover:-translate-y-1 transition-all flex items-center gap-2"
                                    >
                                        {page.id === totalPages ? (
                                            <>Restart Loop <RotateCcw size={18} /></>
                                        ) : (
                                            <>Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </button>
                                )}

                                {page.id > 1 && (
                                    <button
                                        onClick={onPrev}
                                        className="px-6 py-4 text-gray-400 font-bold hover:text-accent-pink transition-colors flex items-center gap-2"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Right: Visual */}
            <div className="relative bg-gradient-to-br from-soft-pink/50 to-white flex items-center justify-center overflow-hidden h-[400px] md:h-auto border-t md:border-t-0 md:border-l border-gray-100">

                {/* Decorative Circle */}
                <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-pink/5 blur-3xl animate-pulse" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={page.id}
                        initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
                        animate={{ rotate: 1, scale: 1, opacity: 1 }}
                        exit={{ rotate: 5, scale: 1.1, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="relative w-3/4 aspect-[3/4] bg-white p-3 shadow-2xl rounded-lg"
                    >
                        <img
                            src={page.image}
                            alt={page.title}
                            className={`w-full h-full object-contain rounded-sm transition-all duration-1000 ${page.id === 1 && !isMusicStarted ? 'opacity-0 blur-md grayscale' : 'opacity-100 blur-0 grayscale-0'}`}
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1518568814500-bf5f8ca12f56?q=80&w=1000&auto=format&fit=crop" // Fallback
                            }}
                        />

                        {/* Corner Tape Effect */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-sm rotate-2 shadow-sm border border-white/40" />
                        <div className="absolute -bottom-10 right-1/2 translate-x-1/2 rotate-6">
                            <Heart className="text-accent-pink fill-accent-pink/20 w-12 h-12 drop-shadow-lg" />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

        </motion.div>
    );
};
