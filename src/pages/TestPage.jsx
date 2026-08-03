import { useForm } from "react-hook-form";
import UploadImage from "../components/General/UploadImage";

export default function TestPage() {
    const { register, handleSubmit } = useForm();

    const submit = (data) => {
        console.log(data);
    };

    return (
        <div className="mx-auto max-w-lg p-10">
            <form onSubmit={handleSubmit(submit)}>
                <UploadImage
                    register={register}
                    boxSize="w-[1px] h-[1px]"
                    textSize="text-sm"
                    scaleBtns="text-sm px-3 py-2"
                    iconSize="h-8 w-8"
                />

                <button className="mt-6 rounded-xl bg-green-700 px-5 py-3 text-white">
                    Submit
                </button>
            </form>
        </div>
    );
}