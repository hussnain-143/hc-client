import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Login = () => {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">  
        <Card className="w-full max-w-md">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
                <p className="text-slate-500 mt-2 text-sm">Please enter your details to sign in</p>
            </div>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
                <Input 
                    label="Email Address"
                    type="email" 
                    id="email" 
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                    </div>
                    <Input 
                        className="!mt-0"
                        type="password" 
                        id="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <Button 
                    fullWidth
                    type="submit"
                    loading={loading}
                >
                    Sign In
                </Button>
            </form>

            <p className="text-center mt-6 text-sm text-slate-500">
                Don't have an account? <Link to="/signup" className="text-amber-600 font-semibold hover:underline">Create one</Link>
            </p>
        </Card>
    </div>
  )
}

export default Login