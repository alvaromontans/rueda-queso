/**
 * El componente `AppLayout` sirve como el diseño principal de la aplicación.
 * Incluye un encabezado, un área de contenido principal y una sección de resumen del carrito.
 * Además, muestra un indicador de carga cuando la navegación está en progreso.
 *
 * @returns {JSX.Element} La estructura de diseño de la aplicación.
 *
 * @remarks
 * - El diseño está estructurado utilizando un grid CSS con tres filas: encabezado, contenido principal y pie de página.
 * - El componente `Loader` se renderiza condicionalmente según el estado de navegación.
 * - El componente `Outlet` se utiliza para renderizar rutas hijas dentro del área de contenido principal.
 *
 * @dependencies
 * - `react-router-dom`: Para los hooks `Outlet` y `useNavigation`.
 * - `CartOverview`: Muestra un resumen del carrito.
 * - `Header`: Muestra el encabezado de la aplicación.
 * - `Loader`: Muestra un spinner de carga durante la navegación.
 */
import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto] font-pizza">
      {isLoading && <Loader />}
      <Header />
      <div>
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
