import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '' 
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (formData.password !== formData.password2) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
       const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth/register`;
      const response = await axios.post(apiUrl, {
          name: formData.name,
          email: formData.email,
          password: formData.password
      });
      
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.errors[0]?.msg || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
            <UserPlus className="mx-auto h-12 w-auto text-blue-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Create your account
            </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
            <input id="name" name="name" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" value={formData.name} onChange={handleChange}/>
          </div>
            
     
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com" value={formData.email} onChange={handleChange}/>
          </div>

         
          <div>
            <label htmlFor="password"className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Min. 6 characters" value={formData.password} onChange={handleChange}/>
                <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
          </div>
          
        
          <div>
            <label htmlFor="password2"className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input id="password2" name="password2" type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Re-enter your password" value={formData.password2} onChange={handleChange}/>
          </div>

         
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        
          <div>
            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

    
        <p className="mt-4 text-center text-sm text-gray-600">
            Already a member?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
            </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;