import React, { useState } from 'react';
import { StoryCard } from './components/StoryCard';
import { SakuraField } from './components/SakuraField';
import { BackgroundMusic } from './components/BackgroundMusic';
import { LoveTimer } from './components/LoveTimer';
import { CursorSparkles } from './components/CursorSparkles';
import { storyData } from './data/story';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [isMusicStarted, setIsMusicStarted] = useState(false);
  const musicRef = React.useRef(null);

  const handleNext = () => {
    setBurstTrigger(prev => prev + 1);
    setCurrentIndex((prev) => (prev + 1) % storyData.length);
  };

  const handleStartJourney = () => {
    if (musicRef.current) {
      musicRef.current.play()
        .then(() => {
          setIsMusicStarted(true);
          // Optional: automatically go to next slide or wait for user to click "Continue" again? 
          // User said: "play song and then the song start after that that button changes into continue button"
          // So we just set state to true, re-rendering component to show "Continue".
        })
        .catch(e => console.error("Play failed", e));
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + storyData.length) % storyData.length);
  };

  const currentStory = storyData[currentIndex];

  return (
    <div className="relative w-full min-h-screen bg-soft-pink flex items-center justify-center p-4">
      <BackgroundMusic ref={musicRef} />
      <CursorSparkles />
      <SakuraField burstTrigger={burstTrigger} />

      {/* Timer positioned nicely */}
      <LoveTimer />

      <div className="w-full max-w-6xl z-10 flex justify-center">
        <StoryCard
          page={currentStory}
          totalPages={storyData.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onStartMusic={handleStartJourney}
          isMusicStarted={isMusicStarted}
        />
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-white/50">
        <div
          className="h-full bg-accent-pink shadow-[0_0_10px_#ff80ab] transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / storyData.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default App;
