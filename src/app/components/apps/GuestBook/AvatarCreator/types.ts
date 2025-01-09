import { AvatarProps } from "beanheads";
  
  export interface RandomAvatarProps {
    onAvatarChange?: (avatar: AvatarProps) => void;
  }
  
  export interface SelectOptionProps {
    label: string;
    options: readonly string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }
  
  export interface CustomizeModalProps {
    avatar: AvatarProps;
    handleChange: (key: string, value: string | boolean) => void;
    onClose: () => void;
  }