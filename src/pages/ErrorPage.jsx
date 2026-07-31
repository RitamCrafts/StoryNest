import { Link, useRouteError } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import { CommonButton } from "../components/Common";
import { PlainBG } from "../components/Backgrounds";

function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="flex min-h-screen items-center justify-center px-6">
            <PlainBG />
            <div className="w-full max-w-lg rounded-2xl border border-red-100 bg-white p-10 text-center shadow-xl">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <AlertTriangle className="text-red-600" size={32} />
                </div>

                <h1 className="text-3xl font-bold text-gray-800">
                    Oops!
                </h1>

                <p className="mt-3 text-gray-600">
                    {error?.status === 404
                        ? "The page you're looking for doesn't exist."
                        : "Something went wrong."}
                </p>

                {error?.statusText && (
                    <p className="mt-2 text-sm text-gray-400">
                        {error.status} • {error.statusText}
                    </p>
                )}

                <Link to="/" className="mt-8 inline-block">
                    <CommonButton variant="primary">
                        <Home size={18} />
                        Back to Home
                    </CommonButton>
                </Link>

            </div>
        </div>
    );
}

export default ErrorPage;