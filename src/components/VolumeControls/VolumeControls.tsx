import {Button} from "../Button";

import cls from './VolumeControls.module.css';

import {ReactComponent as VolumeCrossIcon} from "../../assets/icons/volume-cross.svg";
import {ReactComponent as VolumeLoudIcon} from "../../assets/icons/volume-loud.svg";

export const VolumeControls = () => {
  return (
    <div className={cls.volume}>
      <Button><VolumeCrossIcon /></Button>

      <input className={cls.range} type="range" min={0} max={1} step={0.05} />

      <Button><VolumeLoudIcon /></Button>
    </div>
  );
};
