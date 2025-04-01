/**
 * El componente `Menu` es responsable de renderizar una lista de pizzas
 * obtenidas desde los datos del loader. Recorre los datos del menú y muestra
 * cada pizza como un componente `MenuItem`.
 *
 * @component
 *
 * @returns {JSX.Element} Una lista de componentes `MenuItem` envueltos en un elemento `<ul>`.
 *
 * @remarks
 * - El componente utiliza `useLoaderData` de `react-router-dom` para obtener los datos del menú.
 * - Se espera que cada elemento de pizza cumpla con la interfaz `Pizza`.
 *
 * @example
 * ```tsx
 * import { createBrowserRouter, RouterProvider } from "react-router-dom";
 * import Menu from "./Menu";
 *
 * const router = createBrowserRouter([
 *   {
 *     path: "/menu",
 *     element: <Menu />,
 *     loader: async () => {
 *       return fetch("/api/menu").then((res) => res.json());
 *     },
 *   },
 * ]);
 *
 * function App() {
 *   return <RouterProvider router={router} />;
 * }
 * ```
 */
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";
import { Pizza } from "../../interfaces/Pizza";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza: Pizza) => (
        <MenuItem pizza={pizza} key={pizza._id} />
      ))}
    </ul>
  );
}

export default Menu;
