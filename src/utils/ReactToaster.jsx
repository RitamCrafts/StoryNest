import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

function ReactToaster() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Toaster
            position={isMobile ? "bottom-center" : "top-right"}
            reverseOrder={false}
            gutter={10}
            containerStyle={
                isMobile
                    ? {
                          bottom: 20,
                          zIndex: 40,
                      }
                    : {
                          top: 80,      
                          right: 20,
                          zIndex: 40,
                      }
            }
            toastOptions={{
                duration: 4000,
                style: {
                    userSelect: "none",
                    background: "#ffffff",
                    color: "#166534", // green-800
                    border: "1px solid #bbf7d0", // green-200
                    borderRadius: "14px",
                    boxShadow: "0 10px 25px rgba(22, 101, 52, 0.12)",
                    padding: "14px 16px",
                },
                success: {
                    iconTheme: {
                        primary: "#16a34a", // green-600
                        secondary: "#ffffff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#dc2626",
                        secondary: "#ffffff",
                    },
                },
            }}
        />
    );
}

export default ReactToaster;