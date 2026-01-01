import { Outlet, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { OrgProvider } from '../contexts/OrgContext'
import { ReferralProvider } from '../contexts/ReferralContext'
import { Toaster } from 'react-hot-toast'
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'

const LayoutContent = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

const Layout = () => {
  return (
    <OrgProvider>
      <ReferralProvider>
        <LayoutContent />
      </ReferralProvider>
    </OrgProvider>
  )
}

export default Layout;