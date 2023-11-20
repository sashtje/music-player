import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {PLAY_LIST} from "../../assets/playList";

const initialContext = {
  trackNumber: 1,
  isPlaying: false,
  progressValue: 0,
  volumeValue: 0.5,
  trackTitle: PLAY_LIST[0].title,
  coverSrc: PLAY_LIST[0].coverSrc,
  onPlayPause: () => {},
  onSwitchTrack: () => {},
  onVolumeTurnOff: () => {},
  onVolumeTurnOn: () => {},
  onSetVolume: () => {},
  onSetProgress: () => {},
};

const usePlayer = () => {
  const trackNumberRef = useRef(initialContext.trackNumber);
  const [isPlaying, setIsPlaying] = useState(initialContext.isPlaying);
  const [volumeValue, setVolumeValue] = useState(initialContext.volumeValue);

  const [trackTitle, setTrackTitle] = useState(initialContext.trackTitle);
  const [coverSrc, setCoverSrc] = useState(initialContext.coverSrc);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    audioRef.current.src = PLAY_LIST[0].trackSrc;
  }, []);

  useEffect(() => {
    audioRef.current.volume = volumeValue;

    const volumePercent = volumeValue * 100;
    document.body.style.setProperty('--volume-value', `linear-gradient(90deg, #05AC6A 0%, #05AC6A ${volumePercent}%, #C5C6C5 ${volumePercent}%, #C5C6C5 100%)`);
  }, [volumeValue]);

  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const showProgress = () => {
    const progressValue = (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0;

    document.body.style.setProperty('--progress-value', `linear-gradient(90deg, #05AC6A 0%, #05AC6A ${progressValue}%, #C5C6C5 ${progressValue}%, #C5C6C5 100%)`);
  };

  const switchTrackData = () => {
    const trackIndex = trackNumberRef.current - 1;

    audioRef.current.src = PLAY_LIST[trackIndex].trackSrc;
    setTrackTitle(PLAY_LIST[trackIndex].title);
    setCoverSrc(PLAY_LIST[trackIndex].coverSrc);
    showProgress();
  };

  const onPrevTrack = () => {
    if (trackNumberRef.current === 1) {
      trackNumberRef.current = PLAY_LIST.length;
    } else {
      trackNumberRef.current--;
    }
  };

  const onNextTrack = () => {
    if (trackNumberRef.current === PLAY_LIST.length) {
      trackNumberRef.current = 1;
    } else {
      trackNumberRef.current++;
    }
  };

  const onSwitchTrack = (direction: 'prev' | 'next') => {
    const switchTrackNumber = direction === "prev" ? onPrevTrack : onNextTrack;

    switchTrackNumber();
    switchTrackData();

    if (isPlaying) {
      audioRef.current.play();
    };
  };

  const handleProgress = () => {
    showProgress();
    if (audioRef.current.currentTime === audioRef.current.duration) {
      onSwitchTrack("next");
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(handleProgress, 300);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isPlaying]);

  const onPlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const onVolumeTurnOff = () => {
    setVolumeValue(0);
  };

  const onVolumeTurnOn = () => {
    setVolumeValue(1);
  };

  const onSetVolume = (newVolumeValue: number) => {
    setVolumeValue(newVolumeValue);
  };

  const onSetProgress = (newProgressValueInPercent: number) => {
    audioRef.current.currentTime = audioRef.current.duration * newProgressValueInPercent / 100;
    showProgress();
  };

  return {
    isPlaying,
    volumeValue,
    trackTitle,
    coverSrc,
    onPlayPause,
    onSwitchTrack,
    onVolumeTurnOff,
    onVolumeTurnOn,
    onSetVolume,
    onSetProgress,
  };
};

type ContextType = ReturnType<typeof usePlayer>;
export const PlayerContext = createContext<ContextType>(initialContext);
export const usePlayerContext = () => useContext(PlayerContext);

interface PlayerProviderProps {
  children: ReactNode;
}
export const PlayerProvider = ({children}: PlayerProviderProps) => {
  const playerSet = usePlayer();

  return (
    <PlayerContext.Provider value={playerSet}>
      {children}
    </PlayerContext.Provider>
  );
};
