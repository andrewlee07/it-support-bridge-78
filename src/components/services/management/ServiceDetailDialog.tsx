
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ServiceWithCategory } from '@/utils/types/service';
import { ServiceCategory } from '@/utils/types/service';

interface ServiceDetailDialogProps {
  service: ServiceWithCategory | null;
  categories: ServiceCategory[] | null;
  onClose: () => void;
  canConfigureCatalog: boolean;
}

const ServiceDetailDialog: React.FC<ServiceDetailDialogProps> = ({
  service,
  categories,
  onClose,
  canConfigureCatalog
}) => {
  if (!service) return null;

  return (
    <Dialog open={!!service} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Service: {service.name}</DialogTitle>
          <DialogDescription>
            Update service details and information
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Service Name
            </label>
            <Input id="name" defaultValue={service.name} 
              disabled={!canConfigureCatalog} />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select disabled={!canConfigureCatalog} defaultValue={service.categoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea 
              id="description" 
              defaultValue={service.description}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select defaultValue={service.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="supportContact" className="text-sm font-medium">
              Support Contact
            </label>
            <Select defaultValue={service.supportContactId || "none"}>
              <SelectTrigger>
                <SelectValue placeholder="Select support contact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="user-1">John Doe</SelectItem>
                <SelectItem value="user-2">Jane Smith</SelectItem>
                <SelectItem value="user-4">Morgan Lee</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="serviceOwner" className="text-sm font-medium">
              Service Owner
            </label>
            <Select defaultValue={service.serviceOwnerId || "none"}>
              <SelectTrigger>
                <SelectValue placeholder="Select service owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="user-1">John Doe</SelectItem>
                <SelectItem value="user-5">Casey Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="supportHours" className="text-sm font-medium">
              Support Hours
            </label>
            <Select defaultValue={service.supportHours || "not-specified"}>
              <SelectTrigger>
                <SelectValue placeholder="Select support hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-specified">Not specified</SelectItem>
                <SelectItem value="Business Hours (9am-5pm)">Business Hours (9am-5pm)</SelectItem>
                <SelectItem value="Extended Hours (8am-8pm)">Extended Hours (8am-8pm)</SelectItem>
                <SelectItem value="24/7 Support">24/7 Support</SelectItem>
                <SelectItem value="Limited Support">Limited Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailDialog;
