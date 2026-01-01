import React from 'react';
import { Search, Bell } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">

       <div className="text-right hidden sm:block">
            <p className="text-2xl text-amber-600 mt-1 font-extrabold">{user?.name || 'HealthLink Org'}</p>
        </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3 pl-4">
            <Button onClick={logout} className="px-4 py-2 text-sm font-semibold">
               Logout
            </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;