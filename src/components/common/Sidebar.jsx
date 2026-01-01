import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Send, ClipboardList, Building2, PlusCircle, Globe } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-amber-600 flex items-center gap-2">
          <PlusCircle className="w-8 h-8" /> HealthLink
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <NavItem to="/dashboard" icon={<LayoutDashboard size={20}/>} label="Dashboard" active={location.pathname === '/dashboard' || location.pathname === '/'} />
        <NavItem to="/send-referrals" icon={<Send size={20}/>} label="Send New Referral" active={location.pathname === '/send-referrals'} />
        <NavItem to="/incoming-referrals" icon={<ClipboardList size={20}/>} label="Referrals Manager" active={location.pathname === '/incoming-referrals'} />
        <NavItem to="/organizations" icon={<Building2 size={20}/>} label="Network Organizations" active={location.pathname === '/organizations'} />
        <NavItem to="/coverage-areas" icon={<Globe size={20}/>} label="Coverage Areas" active={location.pathname === '/coverage-areas'} />
      </nav>
    </aside>
  );
};

const NavItem = ({ to, icon, label, active = false }) => (
  <Link to={to}>
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-amber-50 text-amber-600 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
    }`}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  </Link>
);

export default Sidebar;