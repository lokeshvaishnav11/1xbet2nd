import { useEffect, useRef, useState } from "react";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start with autoplay enabled

  useEffect(() => {
    const handlePlay = () => {
      const audio = audioRef.current;
      if (audio && isPlaying) {
        audio
          .play()
          .then(() => {
            console.log("Audio playing");
          })
          .catch((e) => {
            console.warn("Autoplay failed:", e);
          });
      }
    };

    document.addEventListener("click", handlePlay, { once: true });

    return () => {
      document.removeEventListener("click", handlePlay);
    };
  }, [isPlaying]); // re-run if user toggles play/pause

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.warn("Play error:", e);
        });
    }
  };

  return (
    <div>
      <audio ref={audioRef} src="/lottery/images/audio.mp3" loop preload="auto" />
      <button onClick={toggleAudio} className="btn btn-sm btn-warning">
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </div>
  );
};

export default AudioPlayer;
