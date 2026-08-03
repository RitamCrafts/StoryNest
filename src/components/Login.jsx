import React,{useState} from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link,Navigate,useNavigate,useLocation } from "react-router-dom";
import {CommonButton, CommonInput} from "../components/Common"
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";


function Login() {
    const auth = useAuthContext();
    const navigate = useNavigate();
    const { register,handleSubmit,formState:{errors} } = useForm();
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || "/"

    const login = async(data) => {
        if (loading) return;
        data.email = data.email.trim();
        setLoading(true);
        setError("");
        try {
            const session = await toast.promise(
                authService.login(data),
                {
                    loading: "Logging in...",
                    success: "Welcome back!",
                    error: (err) =>
                        err.code === 401
                            ? "Invalid email or password."
                            : "Unable to sign in. Please try again.",
                }
            );
            if( session ){
                const userData = await authService.getCurrentUser();
                if (userData) auth.login(userData);
                navigate(redirectTo, { replace: true });
            }
        } catch (err) {
            if (err.code === 401) {
                setError("Invalid email or password.");
            } else {
                setError("Unable to sign in. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (auth.status) {
        return <Navigate to="/" replace />;
    }
  return (
    <div>
        <form onSubmit={handleSubmit(login)} noValidate className="loginForm flex flex-col gap-y-1.5">
                <div className="titleAndDesc mb-5">
                    <div className="text-2xl font-bold flex gap-x-1.5 items-center justify-center">
                        <span className="text-green-700">Welcome</span><span className="text-gray-700">Back!</span>
                    </div>
                    <div className="text-gray-800/70 text-sm text-center mt-1">
                        Login to continue your reading journey.
                    </div>
                </div>
                

                <div className="email-input mb-3">
                    <CommonInput label={"Email Address"} placeholder={"Enter your email"} type="email" 
                    {...register("email",{
                        onChange: () => setError(""),
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                        }
                    })}/>
                    {errors.email && (
                        <p className="text-sm text-red-600">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                
                <div className="mb-6">
                    <CommonInput label={"Password"} placeholder={"Enter your password"} type="password" 
                    {...register("password",{
                        onChange: () => setError(""),
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        }
                    })}/>
                    {errors.password && (
                        <p className="text-sm text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <CommonButton variant="primary" disabled={loading} type="submit">
                    {loading ? "Logging in..." : "Login"}
                </CommonButton>

                {error && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                        <AlertCircle size={18} className="text-red-500" />
                        <p className="text-sm font-medium text-red-700">
                        {error}
                        </p>
                    </div>
                )}

                <div className="mt-5 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold text-green-700 transition-colors hover:text-green-800 hover:underline"
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
  )
}

export default Login