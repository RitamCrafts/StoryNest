import { X } from "lucide-react";
import { useEffect } from "react";
import CommonBox from "./CommonBox";
import CommonIconButton from "./CommonIconButton";

export default function CommonPopup({
  isOpen,
  onClose,
  children,
  className = "",
  padding = "p-3",
  showCloseButton = true,
  closeOnOverlay = true,
  closeOnEsc = true,
}) {
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-green-950/35
        backdrop-blur-sm
        p-6
      "
      onClick={closeOnOverlay ? onClose : undefined}
    >
      <CommonBox
        padding={padding}
        className={`
          relative
          w-fit
          h-fit
          max-w-[95vw]
          max-h-[95vh]
          overflow-hidden
          border-green-100
          bg-white/90
          shadow-[0_25px_60px_rgba(22,101,52,0.15)]
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <CommonIconButton
            onClick={onClose}
            className="
              absolute
              -top-3
              -right-3
              z-20
              shadow-lg
            "
          >
            <X size={18} />
          </CommonIconButton>
        )}

        {children}
      </CommonBox>
    </div>
  );
}