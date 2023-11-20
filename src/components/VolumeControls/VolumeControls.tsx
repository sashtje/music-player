import {ChangeEvent} from "react";

import {Button} from "../Button";
import {usePlayerContext} from "../../shared/context/PlayerContext";

import cls from './VolumeControls.module.css';

import {ReactComponent as VolumeCrossIcon} from "../../assets/icons/volume-cross.svg";
import {ReactComponent as VolumeLoudIcon} from "../../assets/icons/volume-loud.svg";

export const VolumeControls = () => {
  const { volumeValue, onVolumeTurnOff, onVolumeTurnOn, onSetVolume } = usePlayerContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSetVolume(Number(e.target.value));
  };

  return (
    <div className={cls.volume}>
      <Button onClick={onVolumeTurnOff}>
        <VolumeCrossIcon className={cls.volumeCrossIcon} />
      </Button>

      <input className={cls.range} type="range" min={0} max={1} step={0.05} value={volumeValue} onChange={handleChange} />

      <Button onClick={onVolumeTurnOn}>
        <VolumeLoudIcon className={cls.volumeLoudIcon} />
      </Button>
    </div>
  );
};
