import { AvatarProps } from 'beanheads';

export type Message = {
  _id: string;
  avatar: AvatarProps;
  name: string;
  content: string;
  timestamp: Date;
};

export type NewMessage = {
  name: string;
  content: string;
  avatar: AvatarProps | null;
};

export type Step = 'messages' | 'create' | 'success';