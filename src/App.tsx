import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { StrictMode, Suspense } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "bg-green-500",
            color: "text-gray-700",
          },
        }}
      />
    </StrictMode>
  );
}

export default App;
