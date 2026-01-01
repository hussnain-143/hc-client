import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReferralContext = createContext();

export const ReferralProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReferrals = useCallback(async (role = 'all') => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/referrals?role=${role}`);
      setReferrals(res.data.data);
    } catch {
      toast.error('Failed to fetch referrals');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const createReferral = useCallback(async (data) => {
    try {
      const res = await axios.post(`${API_URL}/referrals`, data);
      toast.success('Referral created successfully');
      return true;
    } catch (_error) {
      toast.error(_error.response?.data?.error || 'Failed to create referral');
      return false;
    }
  }, [API_URL]);

  const updateReferralStatus = useCallback(async (id, status) => {
    try {
      const res = await axios.patch(`${API_URL}/referrals/${id}/status`, { status });
      toast.success('Referral status updated');

      setReferrals(prev => prev.map(ref => ref.id === id ? res.data.data : ref));
      return res.data.data;
    } catch (_error) {
      toast.error(_error.response?.data?.error || 'Failed to update status');
      return null;
    }
  }, [API_URL]);

  return (
    <ReferralContext.Provider value={{ referrals, loading, fetchReferrals, createReferral, updateReferralStatus }}>
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferral = () => useContext(ReferralContext);