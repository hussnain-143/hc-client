import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  User as PatientIcon,
  Info,
  CheckCircle,
  FileText,
  List
} from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import PageLayout from '../components/layout/PageLayout';
import { useReferral } from '../contexts/ReferralContext';

const ReferralsManager = () => {
  const [tab, setTab] = useState('all');

  const {
    referrals,
    loading,
    fetchReferrals,
    updateReferralStatus
  } = useReferral();

  useEffect(() => {
    fetchReferrals(tab);
  }, [fetchReferrals, tab]);

  const updateStatus = async (id, status) => {
    await updateReferralStatus(id, status);
  };

  return (
    <PageLayout className="space-y-8">
      {/* Header + Tabs */}
      <PageHeader
        title="Referrals Manager"
        action={
          <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <TabButton
              active={tab === 'all'}
              onClick={() => setTab('all')}
              icon={<List size={18} />}
              label="All"
            />
            <TabButton
              active={tab === 'receiver'}
              onClick={() => setTab('receiver')}
              icon={<CheckCircle2 size={18} />}
              label="Coming"
            />
            <TabButton
              active={tab === 'sender'}
              onClick={() => setTab('sender')}
              icon={<Clock size={18} />}
              label="Going"
            />
          </div>
        }
      />

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mb-4" />
          <p className="text-slate-500">Loading referrals...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && referrals.length === 0 && (
        <div className="bg-white p-16 text-center rounded-3xl border border-dashed border-slate-200">
          <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
            <Info size={40} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            No Referrals Found
          </h3>
          <p className="text-slate-500 mt-2">
            No referrals found for the selected filter.
          </p>
        </div>
      )}

      {/* Referral List */}
      {!loading && referrals.length > 0 && (
        <div className="space-y-4">
          {referrals.map((ref) => {
            const status = ref.status?.toLowerCase();

            return (
              <Card
                key={ref.id}
                padding="p-6"
                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 hover:border-amber-200 flex flex-col xl:flex-row gap-6"
              >
                {/* Patient Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                        <PatientIcon size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg truncate">
                        {ref.patient_name || 'Unknown Patient'}
                      </h3>
                    </div>

                    <Badge
                      variant={
                        status === 'accepted' || status === 'completed'
                          ? 'success'
                          : status === 'rejected'
                          ? 'error'
                          : 'warning'
                      }
                    >
                      {ref.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <InfoItem
                      icon={<FileText size={14} />}
                      label="Insurance"
                      value={ref.insurance_number || 'Not provided'}
                    />

                    <InfoItem
                      icon={<Building2 size={14} />}
                      label={tab === 'receiver' ? 'From' : 'To'}
                      value={
                        tab === 'receiver'
                          ? ref.sender?.name || 'Unknown Sender'
                          : ref.receiver?.name || 'Unknown Receiver'
                      }
                    />

                    <InfoItem
                      icon={<Clock size={14} />}
                      label="Created"
                      value={
                        ref.created_at
                          ? new Date(ref.created_at).toLocaleString()
                          : 'Unknown date'
                      }
                    />
                  </div>

                  {ref.notes && (
                    <div className="p-4 bg-amber-50 rounded-xl text-sm text-slate-700 border border-amber-200">
                      <span className="font-bold text-amber-800 block mb-2 text-xs uppercase">
                        Clinical Notes
                      </span>
                      "{ref.notes}"
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full xl:w-auto shrink-0 items-center">
                  {/* ACCEPT / REJECT */}
                  {tab === 'receiver' && status === 'pending' && (
                    <>
                      <Button
                        variant="danger"
                        onClick={() => updateStatus(ref.id, 'rejected')}
                        className="px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:shadow-md"
                      >
                        <XCircle size={18} />
                        Reject
                      </Button>

                      <Button
                        onClick={() => updateStatus(ref.id, 'accepted')}
                        className="px-6 py-2.5 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md"
                      >
                        <CheckCircle size={18} />
                        Accept
                      </Button>
                    </>
                  )}

                  {/* MARK COMPLETED */}
                  {tab === 'receiver' && status === 'accepted' && (
                    <Button
                      onClick={() => updateStatus(ref.id, 'completed')}
                      className="px-6 py-2.5 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md"
                    >
                      <CheckCircle2 size={18} />
                      Mark Completed
                    </Button>
                  )}

                  {/* COMPLETED LABEL */}
                  {status === 'completed' && (
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm px-5 py-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <CheckCircle2 size={18} />
                      Process Complete
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </PageLayout>
  );
};

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
      active
        ? 'bg-white shadow-md text-amber-600'
        : 'text-slate-500 hover:text-slate-700'
    }`}
  >
    {icon}
    {label}
  </button>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
    <div className="text-slate-400 mt-0.5 shrink-0">{icon}</div>
    <div className="min-w-0">
      <span className="text-slate-500 text-xs uppercase font-semibold block mb-1">
        {label}
      </span>
      <span className="font-medium text-slate-900 text-sm">{value}</span>
    </div>
  </div>
);

export default ReferralsManager;
