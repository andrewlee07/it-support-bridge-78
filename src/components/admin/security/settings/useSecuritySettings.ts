
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DEFAULT_PASSWORD_POLICY, updatePasswordPolicy, updateDefaultSessionTimeout } from '@/utils/securityUtils';
import { PasswordPolicy } from '@/utils/types/user';

export const useSecuritySettings = () => {
  const { toast } = useToast();
  const [defaultSessionTimeout, setDefaultSessionTimeout] = useState(30);
  const [passwordPolicy, setPasswordPolicy] = useState({ ...DEFAULT_PASSWORD_POLICY });
  const [isSaving, setIsSaving] = useState(false);

  const handleTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setDefaultSessionTimeout(value);
    }
  };

  const handlePasswordPolicyChange = (field: keyof PasswordPolicy, value: any) => {
    setPasswordPolicy(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Update password policy
      updatePasswordPolicy(passwordPolicy);
      
      // Update default session timeout
      updateDefaultSessionTimeout(defaultSessionTimeout);
      
      toast({
        title: "Settings updated",
        description: "Security settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update security settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setPasswordPolicy({ ...DEFAULT_PASSWORD_POLICY });
    setDefaultSessionTimeout(30);
  };

  return {
    defaultSessionTimeout,
    passwordPolicy,
    isSaving,
    handleTimeoutChange,
    handlePasswordPolicyChange,
    handleSave,
    handleReset
  };
};
