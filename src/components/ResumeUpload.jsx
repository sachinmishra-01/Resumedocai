import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('resume', file);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth/analyze`;
            const response = await axios.post(apiUrl, formData, config);
            navigate('/resume-details', { state: { analysis: response.data } });

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to analyze resume.');
            setLoading(false);
        }
    };

    if (token) {
        return (
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Analyze Your Resume</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        required
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                    >
                        {loading ? 'Analyzing...' : 'Analyze Now'}
                    </button>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                </form>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Analyze Your Resume</h3>
            <p className="text-gray-600 mb-4">Please log in to use this feature.</p>
        
            <Link 
                to="/login"
                className="inline-block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
                Login to Get Started
            </Link>
        </div>
    );
};

export default ResumeUpload;