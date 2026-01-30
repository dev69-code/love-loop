import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const HeartParticle = ({ x, y }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 1, rotate: 0 }}
            animate={{ scale: 1.5, opacity: 0, rotate: 45, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed pointer-events-none z-[60] text-accent-pink drop-shadow-md"
            style={{ left: x, top: y }}
        >
            <Heart size={16} fill="#ff80ab" stroke="none" />
        </motion.div>
    );
};

export const CursorSparkles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Add a heart more frequently for a smooth trail
            if (Math.random() > 0.5) {
                const newParticle = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
                setParticles(prev => [...prev.slice(-20), newParticle]);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Cleanup old particles
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setParticles(prev => prev.filter(p => now - p.id < 1000));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {particles.map(p => (
                <HeartParticle key={p.id} x={p.x} y={p.y} />
            ))}
        </AnimatePresence>
    );
};
