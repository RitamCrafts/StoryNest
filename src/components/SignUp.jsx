import React,{useState} from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link,Navigate,useNavigate,useLocation } from "react-router-dom";
import {CommonButton, CommonInput} from "../components/Common"
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";


function SignUp() {
    const auth = useAuthContext();
    const navigate = useNavigate();
    const { register,handleSubmit,formState:{errors} } = useForm();
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || "/"

    const signup = async(data) => {
        if (loading) return;
        data.email = data.email.trim();
        data.name = data.name.trim();
        setLoading(true);
        setError("");
        try {
            const session = await toast.promise(
                authService.createAccount(data),
                {
                    loading: "Creating your nest...",
                    success: "Account created successfully!",
                    error: (err) =>
                        err.code === 409
                            ? "An account with this email already exists."
                            : "Unable to create your account. Please try again.",
                }
            );
            if( session ){
                try {
                    const userData = await authService.getCurrentUser();
                    if (userData) {
                        auth.login(userData);
                        navigate(redirectTo, { replace: true });
                    } else {
                        throw new Error("Unable to retrieve user data.");
                    }
                } catch (profileErr) {
                    console.error("Post-signup setup failed:", profileErr);
                    try {
                        await authService.logout();
                    } finally {
                        window.location.href = "/login";
                    }
                }
            } else {
                throw new Error("Account creation did not return a valid session.");
            }
        } catch (err) {
            if (err.code === 409) {
                setError("An account with this email already exists.");
            } else {
                setError("Unable to create your account. Please try again.");
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
        <form onSubmit={handleSubmit(signup)} noValidate className="loginForm flex flex-col gap-y-1.5">
                <div className="titleAndDesc mb-5">
                    <div className="text-2xl font-bold flex gap-x-1.5 items-center justify-center">
                        <span className="text-gray-700">Join</span><span className="text-green-700">StoryNest</span>
                    </div>
                    <div className="text-gray-800/70 text-sm text-center mt-1">
                        Create your account and start sharing your stories.
                    </div>
                </div>
                


                <div className="name-input mb-3">
                    <CommonInput label={"Name"} placeholder={"Enter your name"} type="text" maxLength={50}
                    {...register("name",{
                        required: "Name is required",
                        validate: (value) => (value.trim().length >= 2 || "Name must be at least 2 characters"),
                        maxLength: {
                            value: 50,
                            message: "Name cannot exceed 50 characters",
                        }
                    })}/>
                    {errors.name && (
                        <p className="text-sm text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                
                <div className="email-input mb-2">
                    <CommonInput label={"Email Address"} placeholder={"Enter your email"} type="email" 
                    {...register("email",{
                        onChange: () => setError(""),
                        required: "Email is required",
                        validate: {
                            noSpaces: (value) =>
                                !/\s/.test(value) || "Email cannot contain spaces",
                        },
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
                
                <div className="password-input mb-6">
                    <CommonInput label={"Password"} placeholder={"Enter your password"} type="password" maxLength={100} 
                    {...register("password",{
                        onChange: () => setError(""),
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                        maxLength: {
                            value: 100,
                            message: "Password is too long",
                        },
                        validate: {
                            noSpaces: (value) =>
                                !/\s/.test(value) || "Password cannot contain spaces",

                            hasUppercase: (value) =>
                                /[A-Z]/.test(value) || "Include at least one uppercase letter",

                            hasLowercase: (value) =>
                                /[a-z]/.test(value) || "Include at least one lowercase letter",

                            hasNumber: (value) =>
                                /\d/.test(value) || "Include at least one number",

                        },
                    })}/>
                    {errors.password && (
                        <p className="text-sm text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <CommonButton variant="primary" disabled={loading} type="submit">
                    {loading ? "Creating your nest..." : "Sign Up"}
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
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-green-700 transition-colors hover:text-green-800 hover:underline"
                    >
                        Log in
                    </Link>
                </div>
            </form>
        </div>
  )
}

export default SignUp