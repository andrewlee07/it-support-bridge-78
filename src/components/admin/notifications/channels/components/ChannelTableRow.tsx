
import React from 'react';
import { 
  TableCell, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { NotificationChannel } from '@/utils/types/eventBus/notificationTypes';
import ChannelIcon from './ChannelIcon';

interface ChannelTableRowProps {
  channel: NotificationChannel;
  onToggleChannel: (id: string) => void;
  onConfigureChannel: (id: string) => void;
}

const ChannelTableRow: React.FC<ChannelTableRowProps> = ({ 
  channel,
  onToggleChannel,
  onConfigureChannel
}) => {
  return (
    <TableRow key={channel.id}>
      <TableCell>
        <div className="font-medium flex items-center">
          <ChannelIcon type={channel.type} />
          <span className="ml-2">{channel.name}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {channel.description}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {channel.type}
        </Badge>
      </TableCell>
      <TableCell>{channel.priority}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {channel.capabilities.supportsFormatting && 
            <Badge variant="secondary" className="text-xs">Formatting</Badge>}
          {channel.capabilities.supportsAttachments && 
            <Badge variant="secondary" className="text-xs">Attachments</Badge>}
          {channel.capabilities.supportsThreading && 
            <Badge variant="secondary" className="text-xs">Threading</Badge>}
        </div>
      </TableCell>
      <TableCell>
        <Switch 
          checked={channel.enabled} 
          onCheckedChange={() => onToggleChannel(channel.id)}
        />
      </TableCell>
      <TableCell className="text-right">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onConfigureChannel(channel.id)}
        >
          Configure
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ChannelTableRow;
