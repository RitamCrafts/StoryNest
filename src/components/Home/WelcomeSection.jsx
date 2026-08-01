import { Plus,Leaf } from "lucide-react";
import CommonButton from "../Common/CommonButton";
import { useNavigate } from "react-router-dom";


function WelcomeSection({ name = "Writer" }) {
    const firstName = name.trim().split(/\s+/)[0];
    const navigate = useNavigate();

    return (
        <section className="flex lg:h-50 flex-col justify-center">
            
            <h1 className="text-4xl font-bold tracking-tight leading-none text-gray-900 flex sm:flex-row flex-col flex-wrap gap-x-3 gap-y-2 mr-7">
                <span> 
                    Welcome back,
                </span>
                <div className="flex flex-row gap-2">
                    <span className="text-green-700">
                        {firstName}
                    </span>
                    <Leaf
                        size={30}
                        strokeWidth={2.5}
                        className="text-green-600 translate-y-1 pl-1"
                    />
                </div>
            </h1>

            

            <p className="mt-6 sm:mt-3 text-xl font-medium text-gray-500 mr-7">
                What story will you share today?
            </p>

            <div className="mt-7 sm:mt-9">
                <CommonButton
                    variant="primary"
                    className="flex items-center gap-2 px-6 pr-8 py-3 text-lg font-semibold w-full sm:w-fit"
                    onClick={()=>(navigate("/write"))}
                >
                    <Plus size={20} strokeWidth={2.5} />
                    New Story
                </CommonButton>
            </div>
        </section>
    );
}

export default WelcomeSection;