
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

const Register = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        type: '',
        role: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            password: formData.password,
            type: formData.type,
            role: formData.role,
            contact_info: {
                email: formData.email,
                phone: formData.phone
            }
        };
        await register(data);
    };

  const orgTypeOptions = [
    { value: 'clinic', label: 'Clinic' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'home_health', label: 'Home Health' },
    { value: 'nursing_home', label: 'Nursing Home' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'dme', label: 'DME' },
  ];

  const roleOptions = [
    { value: 'sender', label: 'Sender (Only Sends)' },
    { value: 'receiver', label: 'Receiver (Only Receives)' },
    { value: 'both', label: 'Both (Sends & Receives)' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">Register Organization</h2>
          <p className="text-slate-500 mt-2">Join the Healthcare Referral Network</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
                label="Organization Name" 
                name="name" 
                required 
                placeholder="Health Center"
                value={formData.name}
                onChange={handleChange}
            />
            <Input 
                label="Login Email" 
                name="email" 
                type="email" 
                required 
                placeholder="admin@org.com"
                value={formData.email}
                onChange={handleChange}
            />
            <Input 
                label="Password" 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
            />
            <Input 
                label="Contact Phone" 
                name="phone" 
                required 
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
            />
            
            <Select 
                label="Organization Type" 
                name="type" 
                options={orgTypeOptions}
                value={formData.type}
                onChange={handleChange}
            />
            <Select 
                label="Role" 
                name="role" 
                options={roleOptions}
                value={formData.role}
                onChange={handleChange}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" fullWidth>
              Create Account
            </Button>
          </div>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="text-amber-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;