
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#F1F0FB] p-4">
      <div className="absolute top-8 left-8">
        <h2 className="text-xl font-bold text-[#9b87f5]">TestTrack Pro</h2>
      </div>
      <div className="w-full max-w-md">
        <Outlet />
      </div>
      <div className="mt-8 text-center text-sm text-[#8E9196]">
        <p>© {new Date().getFullYear()} TestTrack Pro. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AuthLayout;
