import React from 'react';
import * as Icon from 'react-bootstrap-icons';
type SocialIconType = {
  label: string;
  icon: React.ReactNode;
  link: string;
};

const IconClasses = 'w-8 h-8';
const socials: SocialIconType[] = [
  {
    label: 'Instagram',
    icon: (
      <Icon.Instagram
        className={`${IconClasses} bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]`}
      />
    ),
    link: 'https://www.instagram.com/alicetelbot/profilecard/?igsh=ajB2dm81bnlpdmw4',
  },
  {
    label: 'YouTube',
    icon: <Icon.Youtube className={`${IconClasses} text-primary`} />,

    link: 'https://www.youtube.com/@ALice_Bot_Officiel',
  },
  {
    label: 'WhatsApp',
    icon: <Icon.Whatsapp className={`${IconClasses} text-success`} />,

    link: 'https://chat.whatsapp.com/E3Mzf3idDD1ILCBvdMU26q',
  },
  {
    label: 'Telegram',
    icon: <Icon.Telegram className={`${IconClasses} text-info`} />,

    link: 'https://t.me/ALICE_BOT_OFFICIEL',
  },
  {
    label: 'Groupe Telegram',
    icon: <Icon.Telegram className={`${IconClasses}`} />,

    link: 'https://t.me/ALICE_BOT_GROUPE',
  },
  {
    label: 'Tiktok',
    icon: <Icon.Tiktok className={`${IconClasses}`} />,

    link: 'https://tiktok.com/@alice_bot_officiel',
  },
];
export default socials;
