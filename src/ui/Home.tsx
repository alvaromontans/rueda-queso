/**
 * El componente `Home` sirve como la página principal de la aplicación.
 * Muestra un mensaje de bienvenida y renderiza condicionalmente un botón
 * para proceder con el pedido o un formulario de creación de usuario,
 * dependiendo de la presencia de un nombre de usuario en el estado de la aplicación.
 *
 * @component
 * @returns {JSX.Element} El componente Home renderizado.
 *
 * @remarks
 * - Si existe un nombre de usuario en el estado, se muestra un botón primario
 *   para navegar a la página del menú, personalizado con el nombre de usuario.
 * - Si no se encuentra un nombre de usuario, se renderiza el componente `CreateUser`
 *   para permitir al usuario crear un perfil.
 *
 * @dependencies
 * - `CreateUser`: Un componente para crear un nuevo usuario.
 * - `useAppSelector`: Un hook personalizado para acceder al estado de Redux.
 * - `Button`: Un componente reutilizable de botón.
 *
 * @example
 * ```tsx
 * <Home />
 * ```
 */
import CreateUser from "../features/user/CreateUser";
import { useAppSelector } from "../hooks";
import Button from "./Button";

function Home() {
  const { username } = useAppSelector((state) => state.user);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        La mejor pizza.
        <br />
        <span className="text-yellow-500">Directamente del horno para ti.</span>
      </h1>
      {username ? (
        <Button to="/menu" type="primary">
          Continúa con tu pedido, {username}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
