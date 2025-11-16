import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserShield, FaUserTie, FaEnvelope, FaLock, FaUser, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { Briefcase } from 'lucide-react';
import authService from '../services/authService';

const Auth = () => {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'register'
    const [userType, setUserType] = useState(null); // 'admin' or 'employee'
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Form validation
        if (authMode === 'register' && !formData.name.trim()) {
            toast.error("Please enter your full name");
            return;
        }
        
        if (!formData.email.trim()) {
            toast.error("Please enter your email address");
            return;
        }
        
        if (!formData.password.trim()) {
            toast.error("Please enter your password");
            return;
        }

        setIsSubmitting(true);

        try {
            let response;
            const userTypeLabel = userType === 'admin' ? 'Admin' : 'Employee';

            // Call appropriate API based on auth mode and user type
            if (authMode === 'register') {
                if (userType === 'admin') {
                    response = await authService.registerAdmin(formData);
                } else {
                    response = await authService.registerEmployee(formData);
                }
                
                // Show success message
                toast.success(`Registration Successful! Please sign in to continue.`);
                
                // Reset form and switch to signin mode
                setFormData({ name: '', email: formData.email, password: '' });
                setAuthMode('signin');
                
            } else {
                if (userType === 'admin') {
                    response = await authService.loginAdmin(formData);
                } else {
                    response = await authService.loginEmployee(formData);
                }
                
                // Show success message
                toast.success(`Login Successful! Welcome back, ${userTypeLabel}!`);
                
                // Store token and user data
                if (response.success && response.data) {
                    authService.setToken(response.data.token);
                    authService.setUserData({
                        id: response.data._id,
                        name: response.data.name,
                        email: response.data.email,
                        role: response.data.role
                    });

                    // Redirect after short delay
                    setTimeout(() => {
                        if (userType === 'admin') {
                            navigate('/admin/dashboard');
                        } else {
                            navigate('/employee/profile');
                        }
                    }, 1500);
                }
            }

        } catch (error) {
            console.error('Authentication error:', error);
            toast.error(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const resetSelection = () => {
        setUserType(null);
        setFormData({ name: '', email: '', password: '' });
    };

    const switchMode = () => {
        setAuthMode(authMode === 'signin' ? 'register' : 'signin');
        resetSelection();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Container */}
            <div className="relative w-full max-w-md">
                {/* Back to Home Button */}
                <Link
                    to="/"
                    className="inline-flex items-center space-x-2 text-gray-700 hover:text-blue-600 mb-6 transition-colors group"
                >
                    {/* 3<FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> */}
                    {/* <span className="font-medium">Back to Home</span> */}
                </Link>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12">
                    {/* Logo */}
                    <div className="flex items-center justify-center space-x-3 mb-8">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                            <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            JobPortal
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
                            <HiSparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                {authMode === 'signin' ? 'Welcome Back' : 'Get Started'}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                        </h2>
                        <p className="text-gray-600">
                            {authMode === 'signin'
                                ? 'Enter your credentials to access your account'
                                : 'Fill in your details to create a new account'}
                        </p>
                    </div>

                    {/* User Type Selection */}
                    {!userType ? (
                        <div className="space-y-4 animate-slide-up">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                                {authMode === 'signin' ? 'Sign in as' : 'Register as'}
                            </h3>

                            {/* Admin Option */}
                            <button
                                onClick={() => setUserType('admin')}
                                className="w-full group bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 p-6 rounded-2xl border-2 border-transparent hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <FaUserShield className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">Admin / Employer</h4>
                                        <p className="text-sm text-gray-600">Post jobs and manage applications</p>
                                    </div>
                                </div>
                            </button>

                            {/* Employee Option */}
                            <button
                                onClick={() => setUserType('employee')}
                                className="w-full group bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 p-6 rounded-2xl border-2 border-transparent hover:border-green-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <FaUserTie className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">Employee / Job Seeker</h4>
                                        <p className="text-sm text-gray-600">Find and apply for jobs</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    ) : (
                        /* Login/Register Form */
                        <div className="animate-slide-up">
                            {/* Selected User Type Badge */}
                            <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${userType === 'admin'
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                                            : 'bg-gradient-to-r from-green-600 to-emerald-600'
                                            }`}
                                    >
                                        {userType === 'admin' ? (
                                            <FaUserShield className="w-5 h-5 text-white" />
                                        ) : (
                                            <FaUserTie className="w-5 h-5 text-white" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">
                                            {authMode === 'signin' ? 'Signing in as' : 'Registering as'}
                                        </p>
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {userType === 'admin' ? 'Admin / Employer' : 'Employee / Job Seeker'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={resetSelection}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Change
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name Field (Register only) */}
                                {authMode === 'register' && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <FaUser className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter your full name"
                                                required
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FaEnvelope className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FaLock className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Enter your password"
                                            required
                                            className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash className="w-5 h-5" />
                                            ) : (
                                                <FaEye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Forgot Password (Sign In only) */}
                                {authMode === 'signin' && (
                                    <div className="text-right">
                                        <button
                                            type="button"
                                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                                        isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>{authMode === 'signin' ? 'Signing In...' : 'Creating Account...'}</span>
                                        </div>
                                    ) : (
                                        authMode === 'signin' ? 'Sign In' : 'Create Account'
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Switch Mode */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            {authMode === 'signin'
                                ? "Don't have an account? "
                                : 'Already have an account? '}
                            <button
                                onClick={switchMode}
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                {authMode === 'signin' ? 'Register' : 'Sign In'}
                            </button>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
