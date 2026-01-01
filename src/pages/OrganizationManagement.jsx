import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Filter, 
  Building2, 
  ChevronRight,
  Send
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import PageLayout from '../components/layout/PageLayout';
import { useParams } from 'react-router-dom';
import { useOrg } from '../contexts/OrgContext';

const OrganizationsList = () => {
  const { id } = useParams();
  const { organizations, loading, fetchOrganizations, getOrganizationById } = useOrg();
  const [filters, setFilters] = useState({ type: '', role: '' });
  const [singleOrg, setSingleOrg] = useState(null);

  useEffect(() => {
    if (id) {
        getOrganizationById(id).then(setSingleOrg);
    } else {
        fetchOrganizations(filters);
    }
  }, [id, filters, fetchOrganizations, getOrganizationById]);

  const typeOptions = [
    { value: 'clinic', label: 'Clinic' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'home_health', label: 'Home Health' },
    { value: 'nursing_home', label: 'Nursing Home' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'dme', label: 'DME' },
  ];

  if (id) {
    if (!singleOrg) return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center py-24">
           {loading ? <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div> : 'Organization not found'}
        </div>
      </PageLayout>
    );

    const org = singleOrg;

    return (
      <PageLayout>
         <Link to="/organizations" className="flex items-center gap-2 text-slate-500 hover:text-amber-600 font-bold mb-6 w-fit">
          <ChevronRight size={20} className="rotate-180"/>
          Back to List
        </Link>
        <PageHeader title={org.name} subtitle={org.type.replace('_', ' ')} />
        <Card padding="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
               <h3 className="font-bold text-lg mb-4">Contact Information</h3>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail size={18} /> {org.contact_info.email}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone size={18} /> {org.contact_info.phone}
                  </div>
               </div>
             </div>
             <div>
                <h3 className="font-bold text-lg mb-4">Roles & Coverage</h3>
                <div className="flex gap-2 mb-4">
                  <Badge variant={org.role === 'both' ? 'warning' : 'info'}>{org.role}</Badge>
                </div>
                <p className="text-slate-600">
                  <MapPin size={16} className="inline mr-2"/>
                  Serves {org.coverage_areas.length} zones
                </p>
             </div>
           </div>
           <div className="mt-8 pt-8 border-t border-slate-100">
             <Link to={`/send-referrals/${org.id}`}>
                <Button className="w-full sm:w-auto gap-2" disabled={org.role === 'sender'}>
                  <Send size={18} />
                  Send Referral to {org.name}
                </Button>
             </Link>
           </div>
        </Card>
      </PageLayout>
    );
  }

  const roleOptions = [
    { value: 'sender', label: 'Sender (Only Sends)' },
    { value: 'receiver', label: 'Receiver (Only Receives)' },
    { value: 'both', label: 'Both (Sends & Receives)' },
  ];

  return (
    <PageLayout className="space-y-8">
      <PageHeader
        title="Network Organizations"
      />

      {/* Filter Bar */}
      <Card padding="p-4" className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[240px]">
           <Select 
            icon={Filter}
            placeholder="All Organization Types"
            options={typeOptions}
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
           />
        </div>

        <div className="flex-1 min-w-[240px]">
           <Select 
            icon={Building2}
            placeholder="All Network Roles"
            options={roleOptions}
            value={filters.role}
            onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
           />
        </div>
      </Card>

      {/* Grid Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mb-4"></div>
          <p className="text-slate-500 font-medium">Searching the network...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <Card key={org.id} padding="p-6" className="flex flex-col hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{org.name}</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                      {org.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <Badge variant={org.role === 'both' ? 'warning' : 'info'}>
                  {org.role}
                </Badge>
              </div>
              
              <div className="space-y-3 mt-4 border-t border-slate-50 pt-4">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3">
                    <Mail size={14} className="text-slate-400" />
                  </div>
                  <span className="truncate">{org.contact_info?.email}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3">
                    <Phone size={14} className="text-slate-400" />
                  </div>
                  <span>{org.contact_info?.phone}</span>
                </div>
                <div className="flex items-center text-sm text-emerald-600 font-bold bg-emerald-50 w-fit px-3 py-1 rounded-lg mt-4">
                   <MapPin size={14} className="mr-2" />
                   <span>{org.coverage_areas?.length || 0} Service Areas</span>
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <Link to={`/send-referrals/${org.id}`} className="flex-1">
                  <Button fullWidth className="gap-2" disabled={org.role === 'sender'}>
                    <Send size={16} />
                    Send Referral
                  </Button>
                </Link>
                <Link to={`/organizations/${org.id}`}>
                    <Button variant="secondary" className="px-3">
                        <ChevronRight size={20} />
                    </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && organizations.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
           <Building2 size={48} className="mx-auto text-slate-200 mb-4" />
           <p className="text-slate-500 font-medium text-lg">No organizations match your filters.</p>
           <button onClick={() => setFilters({type: '', role: ''})} className="text-amber-600 font-bold mt-2 hover:underline">
             Clear all filters
           </button>
        </div>
      )}
    </PageLayout>
  );
};

export default OrganizationsList;