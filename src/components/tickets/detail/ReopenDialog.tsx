
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, Dialog } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const reopenFormSchema = z.object({
  reason: z.string().min(5, { message: "Reason must be at least 5 characters" }),
});

export type ReopenFormValues = z.infer<typeof reopenFormSchema>;

interface ReopenDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onReopen: (data: ReopenFormValues) => void;
  isServiceRequest: boolean;
}

const ReopenDialog: React.FC<ReopenDialogProps> = ({
  isOpen,
  onOpenChange,
  onReopen,
  isServiceRequest
}) => {
  const reopenForm = useForm<ReopenFormValues>({
    resolver: zodResolver(reopenFormSchema),
    defaultValues: {
      reason: "",
    },
  });

  const handleSubmit = (data: ReopenFormValues) => {
    onReopen(data);
    reopenForm.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reopen {isServiceRequest ? 'Service Request' : 'Incident'}</DialogTitle>
          <DialogDescription>
            Please provide a reason for reopening this {isServiceRequest ? 'service request' : 'incident'}.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...reopenForm}>
          <form onSubmit={reopenForm.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={reopenForm.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reopen Reason</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter reason for reopening..." 
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Reopen</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReopenDialog;
