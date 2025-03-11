
import React from 'react';
import { 
  Table, 
  TableBody,
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ArrowUpDown } from 'lucide-react';
import { NotificationChannel } from '@/utils/types/eventBus/notificationTypes';
import ChannelTableRow from './ChannelTableRow';

interface ChannelTableProps {
  channels: NotificationChannel[];
  onToggleChannel: (id: string) => void;
  onConfigureChannel: (id: string) => void;
}

const ChannelTable: React.FC<ChannelTableProps> = ({ 
  channels,
  onToggleChannel,
  onConfigureChannel
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Channel</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>
            <div className="flex items-center">
              Priority
              <ArrowUpDown className="ml-1 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>Capabilities</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {channels.length > 0 ? (
          channels.map((channel) => (
            <ChannelTableRow 
              key={channel.id}
              channel={channel}
              onToggleChannel={onToggleChannel}
              onConfigureChannel={onConfigureChannel}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              No channels found. Try adjusting your search or create a new channel.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ChannelTable;
