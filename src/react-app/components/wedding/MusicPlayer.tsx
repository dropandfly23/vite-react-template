import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { musicTrack } from "../../data/weddingData";
import { useLanguage } from "../../contexts/LanguageContext";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showPrompt, setShowPrompt] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    audioRef.current = new Audio(musicTrack.url);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayClick = async () => {
    if (!audioRef.current) return;

    setHasInteracted(true);
    setShowPrompt(false);

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  const handlePromptClick = async () => {
    setShowPrompt(false);
    setHasInteracted(true);

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Initial Play Prompt */}
      <AnimatePresence>
        {showPrompt && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handlePromptClick}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card-elegant text-center max-w-sm cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">
                Welcome to Our Wedding
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Would you like to enjoy some romantic music while browsing?
              </p>
              <div className={`flex gap-4 justify-center ${isRTL ? "flex-row-reverse" : ""}`}>
                <button
                  onClick={handlePromptClick}
                  className={`btn-romantic flex items-center ${isRTL ? "flex-row-reverse" : ""}`}
                  aria-label="Play background music"
                >
                  <Play className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} aria-hidden="true" />
                  {t("music.clickToPlay")}
                </button>
                <button
                  onClick={() => {
                    setShowPrompt(false);
                    setHasInteracted(true);
                  }}
                  className="btn-outline-romantic"
                  aria-label="Skip music"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: hasInteracted ? 0 : 100, opacity: hasInteracted ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`fixed bottom-6 z-40 ${isRTL ? "left-6" : "right-6"}`}
      >
        <div className={`bg-card/95 backdrop-blur-md rounded-full shadow-elegant p-2 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayClick}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-sage-dark transition-colors"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className={`w-5 h-5 ${isRTL ? "mr-0.5" : "ml-0.5"}`} />
            )}
          </button>

          {/* Volume Controls */}
          <div className={`hidden sm:flex items-center gap-2 ${isRTL ? "pl-2 flex-row-reverse" : "pr-2"}`}>
            <button
              onClick={toggleMute}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              aria-label="Volume"
              style={{ direction: "ltr" }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
