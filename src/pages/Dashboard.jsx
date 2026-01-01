import React, { useEffect } from 'react';
import { 
  Send, 
  CheckCircle,
  PlusCircle,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import PageHeader from '../components/ui/PageHeader';
import PageLayout from '../components/layout/PageLayout';
import { useReferral } from '../contexts/ReferralContext';

const Dashboard = () => {
  const { referrals, fetchReferrals } = useReferral();
  
  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  // Simple stats calculation
  const total = referrals.length;
  const pending = referrals.filter(r => r.status === 'pending').length;
  const completed = referrals.filter(r => r.status === 'accepted' || r.status === 'rejected' || r.status === 'completed').length;


  return (
    <PageLayout className="flex flex-col gap-8">
      {/* Header Section */}
      <PageHeader 
        title="Dashboard Overview" 
        action={
          <Link to="/send-referrals">
            <Button className="flex items-center gap-2">
              <PlusCircle size={20} /> New Referral
            </Button>
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Referrals" 
          value={total} 
          change="All time" 
          icon={<Send size={24} />} 
          variant="blue"
        />
        <StatCard 
          title="Pending Action" 
          value={pending} 
          change="Needs attention" 
          isUrgent={pending > 0} 
          icon={<Clock size={24} />} 
          variant="amber"
        />
        <StatCard 
          title="Completed" 
          value={completed} 
          change="Accepted/Rejected" 
          icon={<CheckCircle size={24} />} 
          variant="emerald"
        />
      </div>

      {/* Recent Activity Table */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-slate-800 text-lg">Recent Referrals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Patient Name</th>
                <th className="px-6 py-4 font-semibold">Service Type</th>
                <th className="px-6 py-4 font-semibold">Created Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {referrals.slice(0, 5).map((ref) => (
                <tr key={ref.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-900">{ref.patient_name}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{ref.service_type || 'General'}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(ref.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                        ref.status === 'Accepted' ? 'success' : 
                        ref.status === 'Rejected' ? 'error' : 'warning'
                    }>
                      {ref.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageLayout>
  );
};

const StatCard = ({ title, value, change, isUrgent, icon, variant }) => {
  const styles = {
    blue: { text: "text-blue-600", bg: "bg-blue-50" },
    amber: { text: "text-amber-600", bg: "bg-amber-50" },
    emerald: { text: "text-emerald-600", bg: "bg-emerald-50" },
  };

  const { text, bg } = styles[variant] || styles.blue;

  return (
    <Card className="flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">{title}</p>
        <h4 className="text-3xl font-extrabold text-slate-900 mt-2">{value}</h4>
        <p className={`text-xs mt-2 font-bold flex items-center gap-1 ${isUrgent ? 'text-red-500' : 'text-emerald-600'}`}>
          {change}
        </p>
      </div>
      <div className={`p-3 rounded-xl ${bg} ${text} shadow-sm`}>
        {icon}
      </div>
    </Card>
  );
};

export default Dashboard;