import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { MailCheck } from 'lucide-react'; 

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendOtp = async () => {
    if (cooldown > 0) return;

    setLoading(true);
    setResendStatus('Sending...');
    try {
      
      await axios.post('http://localhost:5000/api/auth/resend-otp', { email });
      setResendStatus('A new OTP has been sent.');
      setCooldown(60);
    } catch (err) {
      setResendStatus('Failed to send new OTP.');
    } finally {
        setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center">
            <MailCheck className="mx-auto h-12 w-auto text-blue-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                We've sent a 6-digit code to <span className="font-medium text-gray-900">{email}</span>.
            </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* OTP Input */}
          <div>
            <label htmlFor="otp" className="sr-only">OTP</label>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              maxLength="6"
              className="mt-1 text-center tracking-[1em] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="_ _ _ _ _ _"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          {/* Error Message Display */}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>
          </div>
        </form>

        {/* Resend OTP Section */}
        <div className="text-center text-sm text-gray-600">
            <p>{resendStatus}</p>
            <p>
                Didn't receive the code?{' '}
                <button
                    onClick={handleResendOtp}
                    disabled={cooldown > 0}
                    className="font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    Resend {cooldown > 0 ? `(${cooldown}s)` : ''}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;