import {Button} from "../Button";
import {VolumeControls} from "../VolumeControls";
import {ProgressBar} from "../ProgressBar";
import {usePlayerContext} from "../../shared/context/PlayerContext";

import cls from './Panel.module.css';

import {ReactComponent as PrevIcon} from '../../assets/icons/prev.svg';
import {ReactComponent as PlayPauseIcon} from '../../assets/icons/pause-play.svg';
import {ReactComponent as NextIcon} from '../../assets/icons/next.svg';

export const Panel = () => {
  const { trackTitle, onPlayPause, onSwitchTrack } = usePlayerContext();

  const onPrevTrack = () => {
    onSwitchTrack('prev');
  };

  const onNextTrack = () => {
    onSwitchTrack("next");
  };

  return (
    <div className={cls.panel}>
      <Button variant='round' size='m' onClick={onPrevTrack}>
        <PrevIcon className={cls.prevIcon} />
      </Button>
      <VolumeControls />

      <Button variant='round' size='l' onClick={onPlayPause}>
        <PlayPauseIcon className={cls.playPauseIcon} />
      </Button>
      <div>{trackTitle}</div>

      <Button variant='round' size='m' onClick={onNextTrack}>
        <NextIcon className={cls.nextIcon} />
      </Button>
      <ProgressBar />
    </div>
  );
};
