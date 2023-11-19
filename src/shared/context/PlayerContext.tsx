import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {PLAY_LIST} from "../../assets/playList";

const initialContext = {
  trackNumber: 1,
  isPlaying: false,
  progressValue: 0,
  volumeValue: 0,
  trackTitle: PLAY_LIST[0].title,
  coverSrc: PLAY_LIST[0].coverSrc,
  onPlayPause: () => {},
  onPrevTrack: () => {},
  onNextTrack: () => {},
  onVolumeTurnOff: () => {},
  onVolumeTurnOn: () => {},
  onSetVolume: () => {},
  onSetProgress: () => {},
};

const usePlayer = () => {
  const [trackNumber, setTrackNumber] = useState(initialContext.trackNumber);
  const [isPlaying, setIsPlaying] = useState(initialContext.isPlaying);
  const [progressValue, setProgressValue] = useState(initialContext.progressValue);
  const [volumeValue, setVolumeValue] = useState(initialContext.volumeValue);

  const trackIndex = trackNumber - 1;
  const [trackTitle, setTrackTitle] = useState(initialContext.trackTitle);
  const [coverSrc, setCoverSrc] = useState(initialContext.coverSrc);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    audioRef.current.src = PLAY_LIST[trackIndex].trackSrc;
    setTrackTitle(PLAY_LIST[trackIndex].title);
    setCoverSrc(PLAY_LIST[trackIndex].coverSrc);
  }, [trackIndex]);

  const onPlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const onSwitchTrack = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setProgressValue(0);
  };

  const onPrevTrack = () => {
    onSwitchTrack();

    if (trackNumber === 1) {
      setTrackNumber(PLAY_LIST.length);
    } else {
      setTrackNumber(trackNumber - 1);
    }
  };

  const onNextTrack = () => {
    onSwitchTrack();

    if (trackNumber === PLAY_LIST.length) {
      setTrackNumber(1);
    } else {
      setTrackNumber(trackNumber + 1);
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

  const onSetProgress = (newProgressValue: number) => {
    setProgressValue(newProgressValue);
  };

  return {
    trackNumber,
    isPlaying,
    progressValue,
    volumeValue,
    trackTitle,
    coverSrc,
    onPlayPause,
    onPrevTrack,
    onNextTrack,
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
