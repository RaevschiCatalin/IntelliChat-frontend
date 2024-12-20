"use client";
import Link from 'next/link';
import { Button } from "../../components/ui/button";
import { Input } from '../../components/ui/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAxios } from "../../context/AxiosContext";
import { useState } from 'react';


const Login = () => {
    const router = useRouter();
    const { loginAUTH } = useAxios();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            await loginAUTH(data.email, data.password);
            router.push('/');
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">Login to Your Account</h1>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder="Email"
                            className="border-gray-300 focus:border-black focus:ring-black"
                        />
                        {errors.email && <p className="text-red-500">Email is required</p>}
                    </div>
                    <div>
                        <Input
                            {...register("password", { required: true })}
                            type="password"
                            placeholder="Password"
                            className="border-gray-300 focus:border-black focus:ring-black"
                        />
                        {errors.password && <p className="text-red-500">Password is required</p>}
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                    {/*<Button onClick={() => signIn('google')} className="w-full mt-4">*/}
                    {/*    Login with Google*/}
                    {/*</Button>*/}
                </form>

                <p className="text-center mt-4 text-gray-600">
                    Don't have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
                <p className="text-center mt-4 text-gray-600">
                    <Link href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
