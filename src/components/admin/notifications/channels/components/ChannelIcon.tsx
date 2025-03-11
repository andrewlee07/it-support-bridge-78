
import React from 'react';
import { 
  Mail, 
  MessageSquare, 
  Bell, 
  Smartphone, 
  Webhook,
  Microsoft
} from 'lucide-react';

interface ChannelIconProps {
  type: string;
  className?: string;
}

const ChannelIcon: React.FC<ChannelIconProps> = ({ type, className = "h-4 w-4" }) => {
  switch (type) {
    case 'email':
      return <Mail className={className} />;
    case 'slack':
      return <MessageSquare className={className} />;
    case 'teams':
      return <Microsoft className={className} />;
    case 'inApp':
      return <Bell className={className} />;
    case 'sms':
      return <Smartphone className={className} />;
    case 'webhook':
      return <Webhook className={className} />;
    default:
      return <Bell className={className} />;
  }
};

export default ChannelIcon;
