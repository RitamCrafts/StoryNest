import { useEffect, useRef, useState } from "react";
import { UploadCloud, ImageUp, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

function UploadImage({
  accept = "image/png,image/jpeg,image/jpg,image/webp",
  imgSize=10, // in MB
  existingImage = null,

  // react-hook-form props
  name,
  onChange,
  onBlur,
  ref: inputRef,

  // UI
  boxSize = "h-full w-full",
  textSize = "text-sm",
  iconSize = "h-12 w-12",
  scaleBtns = "text-sm px-4 py-2",
  className = "",
}) {
  const localInputRef = useRef(null);

  const [preview, setPreview] = useState(existingImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setPreview(existingImage);
    setSelectedFile(null);
  }, [existingImage]);


  const sizeClasses = `
    ${boxSize}
    min-w-[250px]
    min-h-[170px]
  `;

  const assignRef = (element) => {
    localInputRef.current = element;

    if (!inputRef) return;

    if (typeof inputRef === "function") {
      inputRef(element);
    } else {
      inputRef.current = element;
    }
  };

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return false;
    }

    if (file.size > imgSize * 1024 * 1024) {
      toast.error("Image must be smaller than 10 MB.");
      return false;
    }

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));
    setSelectedFile(file);

    return true;
  };

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const removeImage = () => {
    if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setSelectedFile(null);

    if (localInputRef.current) {
      localInputRef.current.value = "";

      onChange?.({
        target: {
          name,
          files: [],
        },
      });
    }
  };

  return (
    <div className="space-y-3">
      <input
        hidden
        type="file"
        accept={accept}
        name={name}
        ref={assignRef}
        onBlur={onBlur}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!handleFile(file)) {
            e.target.value = "";
            return;
          }

          onChange?.(e);
        }}
      />

      {!preview ? (
        <div
          onClick={() => localInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);

            const file = e.dataTransfer.files?.[0];
            if (!file || !handleFile(file)) return;

            const dt = new DataTransfer();
            dt.items.add(file);

            localInputRef.current.files = dt.files;

            onChange?.({
              target: {
                name,
                files: dt.files,
              },
            });
          }}
          className={`
            ${sizeClasses}
            ${className}
            flex cursor-pointer flex-col items-center justify-center
            rounded-2xl border-2 border-dashed px-6 text-center
            transition-all duration-200
            ${
              dragging
                ? "border-green-600 bg-green-50"
                : "border-green-300 hover:border-green-500 hover:bg-green-50/50"
            }
          `}
        >
          <UploadCloud className={`${iconSize} mb-4 text-green-600`} />

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
            Maximum file size: {imgSize} MB
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div
            className={`
              ${sizeClasses}
              ${className}
              relative overflow-hidden rounded-2xl border border-green-200 shadow-sm
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
                  onClick={() => localInputRef.current?.click()}
                  className={`
                    flex items-center gap-2 rounded-lg
                    bg-white/95 font-medium text-green-700 shadow
                    transition hover:bg-white
                    cursor-pointer
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
                    flex items-center gap-2 rounded-lg
                    bg-white/95 font-medium text-red-600 shadow
                    transition hover:bg-white
                    cursor-pointer
                    ${scaleBtns}
                  `}
                >
                  <Trash2 className="h-[1em] w-[1em]" />
                  Remove
                </button>
              </div>
            </div>
          </div>

          {selectedFile && (
            <div className="px-1">
              <p className={`${textSize} truncate font-medium text-gray-800`}>
                {selectedFile.name}
              </p>

              <p className={`${textSize} text-gray-500`}>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadImage;