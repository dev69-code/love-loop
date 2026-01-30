import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

export const BackgroundMusic = forwardRef((props, ref) => {
    const audioRef = useRef(null);

    useImperativeHandle(ref, () => ({
        play: () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.25;
                return audioRef.current.play();
            }
            return Promise.resolve();
        }
    }));

    return (
        <audio
            ref={audioRef}
            loop
            src="/music/theme.mp3"
            className="hidden"
        />
    );
});
