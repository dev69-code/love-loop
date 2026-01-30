import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Petal = ({ isBurst }) => {
    const controls = useAnimation();

    // 1. Randomize Size (10px to 25px)
    const size = 10 + Math.random() * 15;

    // 2. Randomize Color (Various shades of pink)
    const colors = [
        'text-pink-300', // Light pink
        'text-pink-400', // Medium pink
        'text-rose-300', // Rose pink
        'text-accent-pink', // Hot pink (from config)
    ];
    const colorClass = colors[Math.floor(Math.random() * colors.length)];

    useEffect(() => {
        // 3. Wind Physics (Right Corner -> Left Edge)
        // Start mostly from Top-Right area
        const startX = 80 + Math.random() * 40; // 80vw to 120vw
        const startY = -10 - Math.random() * 20; // -10vh to -30vh

        // End towards Bottom-Left
        const endX = -20 - Math.random() * 20; // -20vw to -40vw
        const endY = 100 + Math.random() * 20; // 100vh to 120vh

        // Burst speed vs natural breeze
        const duration = isBurst ? 2 + Math.random() * 2 : 8 + Math.random() * 7;

        // Rotation
        const rotate = Math.random() * 720 - 360;

        controls.start({
            x: [`${startX}vw`, `${endX}vw`],
            y: [`${startY}vh`, `${endY}vh`],
            rotate: [0, rotate],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.5],
            transition: {
                duration: duration,
                ease: "linear",
                times: [0, 0.1, 0.9, 1]
            }
        });
    }, [controls, isBurst]);

    return (
        <motion.div
            animate={controls}
            className={`absolute top-0 pointer-events-none ${colorClass}`}
            style={{
                width: size,
                height: size,
                left: 0, // Controlled by x variant
                top: 0   // Controlled by y variant
            }}
        >
            <svg viewBox="0 0 30 30" className="w-full h-full fill-current opacity-90 drop-shadow-sm">
                <path d="M15,0 C20,10 30,15 15,30 C0,15 10,10 15,0 Z" />
            </svg>
        </motion.div>
    );
};

export const SakuraField = ({ burstTrigger }) => {
    const [petals, setPetals] = useState([]);

    // Background Breeze (Winder Effect)
    useEffect(() => {
        const interval = setInterval(() => {
            setPetals(prev => [...prev, { id: Date.now(), isBurst: false }]);
        }, 600); // Slightly more frequent for "flowing" look
        return () => clearInterval(interval);
    }, []);

    // Handle Bursts
    useEffect(() => {
        if (burstTrigger > 0) {
            const burstCount = 40; // More petals for burst
            const newPetals = Array.from({ length: burstCount }).map((_, i) => ({
                id: Date.now() + i,
                isBurst: true
            }));
            setPetals(prev => [...prev, ...newPetals]);
        }
    }, [burstTrigger]);

    // Cleanup
    useEffect(() => {
        const interval = setInterval(() => {
            setPetals(prev => {
                const now = Date.now();
                return prev.filter(p => now - p.id < 15000); // Keep alive longer for slow wind
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
            {petals.map(p => (
                <Petal key={p.id} isBurst={p.isBurst} />
            ))}
        </div>
    );
};
