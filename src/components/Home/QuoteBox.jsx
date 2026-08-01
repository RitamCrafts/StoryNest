import { useMemo } from "react";
import { Quote } from "lucide-react";

import CommonBox from "../Common/CommonBox";
import QuoteBoxLeaf from "./QuoteBoxLeaf";
import { quotes } from "../../utils";

function QuoteBox({
    className = "",
    width = "md:min-w-[350px]",
    height = "min-h-[190px]",
}) {
    const quote = useMemo(
        () => quotes[Math.floor(Math.random() * quotes.length)],
        []
    );

    return (
        <CommonBox
            padding="p-7 pl-8"
            className={`
                relative
                overflow-hidden
                shrink-0
                ${width}
                ${height}
                ${className}
            `}
        >
            <div className="flex flex-col">
                <Quote
                    size={22}
                    strokeWidth={3}
                    className="text-green-600"
                />

                <p className="mt-3 max-w-[185px] text-[15px] leading-7 font-medium text-gray-900">
                    {quote[0]}
                    <br />
                    {quote[1]}
                </p>

                <div className="mt-5 flex items-center gap-2">
                    <span className="h-[2px] w-5 rounded-full bg-green-600" />

                    <span className="text-xs font-semibold text-green-700">
                        {quote[2]}
                    </span>
                </div>
            </div>

            <QuoteBoxLeaf className="absolute bottom-5 right-5 w-22" />
        </CommonBox>
    );
}

export default QuoteBox;