// import React, { useState } from 'react';
// import axios from 'axios';
// import { Toaster, toast } from 'react-hot-toast';

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });

//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

//     if (!isLogin) {
//       if (!formData.name) newErrors.name = 'Name is required';
//       if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
//       else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();

//     if (Object.keys(formErrors).length !== 0) {
//       setErrors(formErrors);
//       return;
//     }

//     setIsLoading(true);

//     const url = isLogin
//       ? 'http://localhost/youtube-backend/api/auth/login.php'
//       : 'http://localhost/youtube-backend/api/auth/signup.php';

//     try {
//       const payload = isLogin
//         ? { email: formData.email, password: formData.password }
//         : { name: formData.name, email: formData.email, password: formData.password };

//       const response = await axios.post(url, payload);
//       const data = response.data;

//       if (data.success) {
//         localStorage.setItem('user', JSON.stringify(data.user));
//         toast.success(data.message);
//         setTimeout(() => {
//           window.location.href = '/'; // redirect to homepage/dashboard
//         }, 1000);
//       } else {
//         toast.error(data.message || 'Something went wrong!');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || 'Server error!');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const switchForm = () => {
//     setIsLogin(!isLogin);
//     setErrors({});
//     setFormData({ name: '', email: '', password: '', confirmPassword: '' });
//   };

//   const handleSocialLogin = (provider) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       toast(`Logging in with ${provider}`);
//     }, 1000);
//   };

//   return (
//     <>
//       <Toaster position="top-right" />
//       <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
//         <div className="flex-1 flex items-center justify-center p-6 md:p-12">
//           <div className="w-full max-w-md">
//             <div className="flex justify-center mb-8">
//               <div className="flex items-center">
//                 <svg viewBox="0 0 90 20" className="w-24 h-7 text-red-600">
//                   <path fill="currentColor" d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" />
//                   <path fill="white" d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" />
//                 </svg>
//                 <span className="ml-2 text-2xl font-bold text-gray-900">PlayZone</span>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl">
//               <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
//                 {isLogin ? 'Welcome back' : 'Create your account'}
//               </h2>
//               <p className="text-gray-600 text-center mb-8">
//                 {isLogin ? 'Sign in to continue' : 'Join us to start watching'}
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 {!isLogin && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
//                         errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
//                       }`}
//                       placeholder="Enter your full name"
//                     />
//                     {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
//                       errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
//                     }`}
//                     placeholder="Enter your email"
//                   />
//                   {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
//                       errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
//                     }`}
//                     placeholder="Enter your password"
//                   />
//                   {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//                 </div>

//                 {!isLogin && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
//                         errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
//                       }`}
//                       placeholder="Confirm your password"
//                     />
//                     {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-75 flex items-center justify-center"
//                 >
//                   {isLoading ? (
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                   ) : null}
//                   {isLogin ? (isLoading ? 'Signing in...' : 'Sign in') : (isLoading ? 'Creating account...' : 'Create account')}
//                 </button>
//               </form>

//               <div className="mt-6 text-center">
//                 <p className="text-sm text-gray-600">
//                   {isLogin ? "Don't have an account? " : "Already have an account? "}
//                   <button
//                     onClick={switchForm}
//                     className="font-medium text-blue-600 hover:text-blue-800 transition-colors focus:outline-none"
//                   >
//                     {isLogin ? 'Sign up' : 'Sign in'}
//                   </button>
//                 </p>
//               </div>
//             </div>

//             <div className="mt-6 text-center">
//               <p className="text-xs text-gray-500">
//                 By continuing, you agree to our <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="hidden md:flex flex-1 bg-gradient-to-br from-red-600 to-purple-700 p-12 text-white">
//           <div className="max-w-md mx-auto flex flex-col justify-center">
//             <h2 className="text-4xl font-bold mb-6">Join the PlayZone community</h2>
//             <p className="text-xl mb-8">Discover, watch, and share your favorite videos with the world.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AuthPage;
import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();  // <-- Added
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // CHANGED — login / signup click → direct redirect
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');   // <-- Direct go home
  };

  const switchForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast(`Logging in with ${provider}`);
    }, 1000);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-8">
              <div className="flex items-center">
                <svg viewBox="0 0 90 20" className="w-24 h-7 text-red-600">
                  <path fill="currentColor" d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" />
                  <path fill="white" d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" />
                </svg>
                <span className="ml-2 text-2xl font-bold text-gray-900">PlayZone</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-gray-600 text-center mb-8">
                {isLogin ? 'Sign in to continue' : 'Join us to start watching'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg`}
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg`}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg`}
                    placeholder="Enter your password"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg`}
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  {isLogin ? "Sign in" : "Create account"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={switchForm}
                    className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 bg-gradient-to-br from-red-600 to-purple-700 p-12 text-white">
          <div className="max-w-md mx-auto flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">Join the PlayZone community</h2>
            <p className="text-xl mb-8">Discover, watch, and share your favorite videos with the world.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
