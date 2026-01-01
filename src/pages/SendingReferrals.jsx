import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Send, Building2, User, FileText, ClipboardList } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';
import PageLayout from '../components/layout/PageLayout';
import { useReferral } from '../contexts/ReferralContext';
import { useOrg } from '../contexts/OrgContext';

const SendReferral = () => {
  const navigate = useNavigate();
  const { to } = useParams();
  const { createReferral } = useReferral();
  const { organizations, fetchOrganizations } = useOrg();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const orgOptions = organizations 
    .filter(o => o.role === 'receiver' || o.role === 'both')
    .map(o => ({
      value: o.id,
      label: `${o.name} (${o.type})`
    }));

  const [formData, setFormData] = useState({
    receiver_org_id: to || '',
    patient_name: '',
    insurance_number: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await createReferral({
        ...formData,
        service_type: 'General' 
    });

    if (success) {
        navigate('/dashboard');
    }
    setIsSubmitting(false);
  };

  return (
    <PageLayout className="max-w-3xl">
      
      <PageHeader 
        title="Send New Referral" 
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <Select
            label="Receiving Organization"
            icon={Building2}
            required
            placeholder="Select an organization..."
            options={orgOptions }
            value={formData.receiver_org_id}
            onChange={(e) => setFormData(prev => ({ ...prev, receiver_org_id: e.target.value }))}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Patient Name"
              icon={User}
              required
              placeholder="Full legal name"
              value={formData.patient_name}
              onChange={(e) => setFormData(prev => ({ ...prev, patient_name: e.target.value }))}
            />

            <Input
              label="Insurance Number"
              icon={FileText}
              required
              placeholder="ID: 000-00-0000"
              value={formData.insurance_number}
              onChange={(e) => setFormData(prev => ({ ...prev, insurance_number: e.target.value }))}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
              <ClipboardList size={16} className="text-amber-500" />
              Notes / Reason for Referral
            </label>
            <textarea
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 min-h-[140px] resize-none"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Please provide clinical details, diagnosis codes, or specific instructions for the receiver..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-50">
            <Button 
                variant="secondary"
                onClick={() => navigate(-1)} 
                className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isSubmitting}
            >
              <Send size={18} />
              {isSubmitting ? 'Sending...' : 'Send Referral'}
            </Button>
          </div>
        </form>
      </Card>
    </PageLayout>
  );
};

export default SendReferral;