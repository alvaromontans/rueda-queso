/**
 * El componente `Header` representa la barra de navegación superior de la aplicación.
 * Incluye el título de la aplicación, una funcionalidad para buscar pedidos y una sección relacionada con el usuario.
 *
 * @component
 * @returns {JSX.Element} El componente de encabezado renderizado.
 *
 * @remarks
 * - El encabezado está estilizado con clases de Tailwind CSS para el diseño y la apariencia.
 * - El título es un enlace que navega a la página principal.
 * - El componente `SearchOrder` permite a los usuarios buscar pedidos específicos.
 * - El componente `Username` muestra la información del usuario actual.
 *
 * @dependencies
 * - `react-router-dom`: Utilizado para el componente `Link` que habilita la navegación.
 * - `SearchOrder`: Un componente de funcionalidad para buscar pedidos.
 * - `Username`: Un componente de funcionalidad para mostrar información del usuario.
 */
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-500 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        La Rueda de Queso
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
