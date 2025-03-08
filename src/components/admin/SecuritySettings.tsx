
import React from 'react';
import SessionTimeoutSettings from './security/settings/SessionTimeoutSettings';
import PasswordPolicySettings from './security/settings/PasswordPolicySettings';
import { useSecuritySettings } from './security/settings/useSecuritySettings';

const SecuritySettings = () => {
  const {
    defaultSessionTimeout,
    passwordPolicy,
    isSaving,
    handleTimeoutChange,
    handlePasswordPolicyChange,
    handleSave,
    handleReset
  } = useSecuritySettings();

  return (
    <div className="space-y-6">
      <SessionTimeoutSettings 
        defaultSessionTimeout={defaultSessionTimeout}
        onTimeoutChange={handleTimeoutChange}
      />
      
      <PasswordPolicySettings 
        passwordPolicy={passwordPolicy}
        onPasswordPolicyChange={handlePasswordPolicyChange}
        onSave={handleSave}
        onReset={handleReset}
        isSaving={isSaving}
      />
    </div>
  );
};

export default SecuritySettings;
