import {ButtonHTMLAttributes, memo} from "react";

import {classNames} from "../../shared/helpers/classNames";

import cls from './Button.module.css';

type ButtonVariant = 'square' | 'round';
type ButtonSize = 's' | 'm' | 'l';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    size = 's',
    variant = 'square',
    children,
    ...otherProps
  } = props;

  return (
    <button
      type='button'
      className={classNames(cls.button, {}, [className, cls[size], cls[variant]])}
      {...otherProps}
    >{children}</button>
  );
});

Button.displayName = 'Button';
