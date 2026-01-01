import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const OrgContext = createContext();

export const OrgProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrganizations = useCallback(async (filters = {}) => {
    if (!localStorage.getItem('token')) return;
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const res = await axios.get(`${API_URL}/organizations?${params.toString()}`);
      setOrganizations(res.data.data);
    } catch {
      toast.error('Failed to fetch organizations');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const getOrganizationById = useCallback(async (id) => {
    try {
      const res = await axios.get(`${API_URL}/organizations/${id}`);
      return res.data.data;
    } catch {
      toast.error('Failed to fetch organization');
      return null;
    }
  }, [API_URL]);

  const updateCoverage = useCallback(async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/organizations/${id}/coverage`, data);
      toast.success('Coverage areas updated successfully');
      return res.data.data;
    } catch {
      toast.error('Failed to update coverage areas');
      return null;
    }
  }, [API_URL]);

  return (
    <OrgContext.Provider value={{ organizations, loading, fetchOrganizations, updateCoverage, getOrganizationById }}>
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = () => useContext(OrgContext);