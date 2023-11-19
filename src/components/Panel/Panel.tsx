import {Button} from "../Button";
import {VolumeControls} from "../VolumeControls";
import {ProgressBar} from "../ProgressBar";
import {usePlayerContext} from "../../shared/context/PlayerContext";
import {classNames} from "../../shared/helpers/classNames";

import cls from './Panel.module.css';

import {ReactComponent as PrevIcon} from '../../assets/icons/prev.svg';
import {ReactComponent as PlayPauseIcon} from '../../assets/icons/pause-play.svg';
import {ReactComponent as NextIcon} from '../../assets/icons/next.svg';

export const Panel = () => {
  const { isPlaying, trackTitle, onPlayPause, onPrevTrack, onNextTrack } = usePlayerContext();

  return (
    <div className={classNames(cls.panel, {[cls.playing]: isPlaying}, [])}>
      <Button variant='round' size='m' onClick={onPrevTrack}><PrevIcon /></Button>
      <VolumeControls />

      <Button variant='round' size='l' onClick={onPlayPause}><PlayPauseIcon /></Button>
      <h1>{trackTitle}</h1>

      <Button variant='round' size='m' onClick={onNextTrack}><NextIcon /></Button>
      <ProgressBar />
    </div>
  );
};
