import {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Signup() {
    
    const {signup} = useContext(AuthContext);
    const [submitting , setSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await signup(formData);
        } catch (error) {
            // nothing AuthContext will handle
        } finally {
            setSubmitting(false);
            setFormData({
                email: '',
                username: '',
                password: ''
            });
        }
    };

  return (
    <div className='h-screen w-full'>
        <form className="flex flex-col w-[88%] max-w-[400px] gap-4 p-6 border rounded-xl shadow-md bg-white mx-auto mt-16" onSubmit={handleSubmit} autoComplete="off">

            <div className='flex flex-col gap-2'>
                <p className="text-2xl font-semibold text-gray-800 text-center">SignUp</p>
                <small className="text-gray-500 text-center"> Create an account for free </small>
            </div>

            <div className="flex flex-col">
                <label htmlFor="username" className="text-gray-600 text-xs mb-1"> Username </label>
                <input id="username" type="text" name='username' placeholder="John Doe" className="border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#611BF8]" onChange={handleChange} value={formData.username} required />
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-600 text-xs mb-1"> Email </label>
                <input id="email" type="email" name='email' placeholder="example@example.com" className="border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring[#611BF8]" onChange={handleChange} value={formData.email} required />
            </div>

            <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-600 text-xs mb-1"> Password </label>
                <input id="password" type="password" name='password' placeholder="••••••••" className="border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#611BF8]" onChange={handleChange} value={formData.password} required />
            </div>

            <button type="submit" className="bg-[#611BF8] text-white rounded-3xl py-2 font-semibold hover:bg-[#4b0fd4] transition"> {submitting ? 'Creating Account...' : 'Signup'} </button>

            <p className="text-sm text-center text-gray-600">Already have an account?{' '}
                <Link to='/login' className="text-[#611BF8] font-medium cursor-pointer hover:underline">
                    login
                </Link>
            </p>
        </form>
    </div>
  );
}