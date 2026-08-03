import { useEffect, useRef, useState } from "react";
import { UploadCloud, ImageUp, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

function UploadImage({
    register,
    name = "image",
    accept = "image/png,image/jpeg,image/jpg,image/webp",
    required = false,

    // Parent controls size
    boxSize = "h-full w-full",

    // Parent controls typography
    textSize = "text-sm",
    iconSize ="h-12 w-12",

    // Parent controls action button scaling
    scaleBtns = "text-sm px-4 py-2",

    className = "",
}) {
    const inputRef = useRef(null);

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragging, setDragging] = useState(false);

    const registerProps = register(name, { required });

    const sizeClasses = `
        ${boxSize}
        min-w-[250px]
        min-h-[170px]
    `;

    const handleFile = (file) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5 MB.");
            return;
        }

        if (preview) URL.revokeObjectURL(preview);

        setPreview(URL.createObjectURL(file));
        setSelectedFile(file);
    };

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const removeImage = () => {
        if (preview) URL.revokeObjectURL(preview);

        setPreview(null);
        setSelectedFile(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-3">
            <input
                hidden
                type="file"
                accept={accept}
                ref={(element) => {
                    registerProps.ref(element);
                    inputRef.current = element;
                }}
                name={registerProps.name}
                onBlur={registerProps.onBlur}
                onChange={(e) => {
                    registerProps.onChange(e);
                    handleFile(e.target.files[0]);
                }}
            />

            {!preview ? (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);

                        const file = e.dataTransfer.files[0];
                        if (!file) return;

                        const dt = new DataTransfer();
                        dt.items.add(file);

                        inputRef.current.files = dt.files;

                        registerProps.onChange({
                            target: {
                                name: registerProps.name,
                                files: dt.files,
                            },
                        });

                        handleFile(file);
                    }}
                    className={`
                        ${sizeClasses}
                        ${className}

                        flex
                        cursor-pointer
                        flex-col
                        items-center
                        justify-center

                        rounded-2xl
                        border-2
                        border-dashed

                        px-6
                        text-center

                        transition-all
                        duration-200

                        ${
                            dragging
                                ? "border-green-600 bg-green-50"
                                : "border-green-300 hover:border-green-500 hover:bg-green-50/50"
                        }
                    `}
                >
                    <UploadCloud
                        className={`${iconSize} mb-4 text-green-600`}
                    />

                    <h3 className={`${textSize} font-semibold text-green-700`}>
                        Click to upload
                        <span className="font-normal text-gray-600">
                            {" "}
                            or drag & drop
                        </span>
                    </h3>

                    <p className={`${textSize} mt-2 text-gray-500`}>
                        PNG, JPG, JPEG or WEBP
                    </p>

                    <p className={`${textSize} mt-1 text-gray-400`}>
                        Maximum file size: 5 MB
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    <div
                        className={`
                            ${sizeClasses}
                            ${className}

                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            border-green-200
                            shadow-sm
                        `}
                    >
                        <img
                            src={preview}
                            alt="Preview"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => inputRef.current?.click()}
                                    className={`
                                        flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        bg-white/95
                                        font-medium
                                        text-green-700
                                        shadow
                                        transition
                                        hover:bg-white
                                        ${scaleBtns}
                                    `}
                                >
                                    <ImageUp className="h-[1em] w-[1em]" />
                                    Replace
                                </button>

                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className={`
                                        flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        bg-white/95
                                        font-medium
                                        text-red-600
                                        shadow
                                        transition
                                        hover:bg-white
                                        ${scaleBtns}
                                    `}
                                >
                                    <Trash2 className="h-[1em] w-[1em]" />
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="px-1">
                        <p
                            className={`${textSize} truncate font-medium text-gray-800`}
                        >
                            {selectedFile?.name}
                        </p>

                        <p className={`${textSize} text-gray-500`}>
                            {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UploadImage;