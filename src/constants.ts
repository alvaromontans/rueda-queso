export const API_URL = 'http://localhost:8080/rueda-queso';
export const GEOCODING_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
export const TOAST_OPTIONS = {
    position: "top-center" as const,
    gutter: 12,
    containerStyle: { margin: "8px" },
    toastOptions: {
        success: { duration: 3000 },
        error: { duration: 5000 },
        style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "bg-green-500",
            color: "text-gray-700",
        },
    },
};