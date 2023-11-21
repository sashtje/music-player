import {useCallback} from "react";

import {Button} from "../Button";
import {VolumeControls} from "../VolumeControls";
import {ProgressBar} from "../ProgressBar";
import {usePlayerContext} from "../../shared/context/PlayerContext";

import cls from './Panel.module.css';

import {ReactComponent as PrevIcon} from '../../assets/icons/prev.svg';
import {ReactComponent as PlayPauseIcon} from '../../assets/icons/pause-play.svg';
import {ReactComponent as NextIcon} from '../../assets/icons/next.svg';

export const Panel = () => {
  const { isPlaying, trackTitle, onPlayPause, onSwitchTrack } = usePlayerContext();

  const onPrevTrack = useCallback(() => {
    onSwitchTrack('prev');
  }, [onSwitchTrack]);

  const onNextTrack = useCallback(() => {
    onSwitchTrack("next");
  }, [onSwitchTrack]);

  return (
    <div className={cls.panel}>
      <Button variant='round' size='m' onClick={onPrevTrack} aria-label='Go to previous track'>
        <PrevIcon className={cls.prevIcon} />
      </Button>
      <VolumeControls />

      <Button variant='round' size='l' onClick={onPlayPause} aria-label={isPlaying ? 'Turn off the track' : 'Turn on the track'}>
        <PlayPauseIcon className={cls.playPauseIcon} />
      </Button>
      <div className={cls.trackTitle}>{trackTitle}</div>

      <Button variant='round' size='m' onClick={onNextTrack} aria-label='Go to next track'>
        <NextIcon className={cls.nextIcon} />
      </Button>
      <ProgressBar />
    </div>
  );
};
