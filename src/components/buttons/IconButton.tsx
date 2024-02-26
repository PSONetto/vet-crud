import Button from './Button';
import { IButtonProps } from './interfaces';

export default function TextButton(props: IButtonProps) {
  return <Button {...props} className="hover:bg-white/15 active:bg-white/5 " />;
}
