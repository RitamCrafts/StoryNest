import { FileText } from "lucide-react";

function UserPostsHeader({margin=""}) {
    return (
        <div
            className={`
                flex
                items-center
                gap-3
                sm:gap-4
                lg:gap-5
                ${margin}
            `}
        >
            {/* Icon + Text */}
            <div
                className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    sm:gap-3
                "
            >
                <FileText
                    className="
                        h-7
                        w-7
                        text-green-700
                    "
                    strokeWidth={2.3}
                />

                <h2
                    className="
                        text-md
                        font-semibold
                        tracking-tight
                        text-gray-900
                    "
                >
                    Your Stories
                </h2>
            </div>

            {/* Divider */}
            <div
                className="
                    h-[0.5px]
                    flex-1
                    bg-green-900/20
                "
            />
        </div>
    );
}

export default UserPostsHeader;