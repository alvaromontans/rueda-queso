/**
 * El componente principal de la aplicación que configura la aplicación React.
 *
 * Este componente envuelve la aplicación con el componente `Suspense`
 * para manejar componentes cargados de forma diferida con un cargador de respaldo.
 * También integra el `RouterProvider` para el enrutamiento y `Toaster` para mostrar notificaciones emergentes.
 *
 * @component
 * @returns {JSX.Element} El componente raíz de la aplicación.
 *
 * @see {@link https://react.dev/docs/strict-mode | React StrictMode}
 * @see {@link https://react.dev/docs/react-api#suspense | React Suspense}
 * @see {@link https://reactrouter.com/en/main/router-provider | RouterProvider}
 * @see {@link https://react-hot-toast.com/docs | react-hot-toast}
 */
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./ui/Loader";
import { TOAST_OPTIONS } from "./constants";

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster {...TOAST_OPTIONS} />
    </>
  );
}

export default App;
