import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const LoveTimer = () => {
    const [time, setTime] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Start Date: Dec 3, 2021
        const startDate = new Date('2021-12-03T00:00:00');

        const interval = setInterval(() => {
            const now = new Date();
            const diff = now - startDate;

            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTime({ years, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-0 right-0 w-full md:w-auto p-6 flex justify-end z-20 pointer-events-none">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-accent-pink/20 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 mb-1">
                    <Clock className="text-accent-pink animate-pulse" size={14} />
                    <span className="text-accent-pink font-playfair font-bold text-xs uppercase tracking-widest">Loving You For</span>
                </div>
                <div className="text-gray-700 font-quicksand font-bold text-sm tracking-wide">
                    <span className="text-accent-pink">{time.years}</span>Y {' '}
                    <span className="text-accent-pink">{time.days}</span>D {' '}
                    <span className="text-accent-pink">{time.hours}</span>H {' '}
                    <span className="text-accent-pink">{time.minutes}</span>M {' '}
                    <span className="text-accent-pink">{time.seconds}</span>S
                </div>
            </div>
        </div>
    );
};
