import React from 'react';
import * as Icon from 'react-bootstrap-icons';
type SocialIconType = {
  label: string;
  icon: React.ReactNode;
  link: string;
};

const IconClasses = 'w-8 h-8';
const clients: SocialIconType[] = [
  {
    label: 'WhatsApp',
    icon: <Icon.Whatsapp className={`${IconClasses} text-success`} />,

    link: 'https://wa.me/message/TPXZT6NXX5U5K1',
  },
  {
    label: 'Telegram',
    icon: <Icon.Telegram className={`${IconClasses} text-info`} />,

    link: 'https://t.me/m/UAd_YGcjMjE0',
  },
];
export default clients;
