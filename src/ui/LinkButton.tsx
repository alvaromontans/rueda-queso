/**
 * Un componente versátil de botón que actúa como un enlace de navegación o un botón para regresar.
 * Utiliza `Link` y `useNavigate` de React Router para la funcionalidad de navegación.
 *
 * @component
 * @param {React.ReactNode} children - El contenido que se mostrará dentro del botón o enlace.
 * @param {string} to - La ruta de destino para la navegación. Si se establece en "-1", activa una navegación hacia atrás.
 *
 * @example
 * // Ejemplo de uso como enlace
 * <LinkButton to="/home">Ir a Inicio</LinkButton>
 *
 * @example
 * // Ejemplo de uso como botón de navegación hacia atrás
 * <LinkButton to="-1">Regresar</LinkButton>
 */
import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface LinkButtonProps {
  children: React.ReactNode;
  to: string;
}

function LinkButton({ children, to }: LinkButtonProps) {
  const navigate = useNavigate();
  const className =
    "text-sm cursor-pointer text-blue-500 hover:text-blue-900 hover:underline";

  const handleBackNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return to === "-1" ? (
    <button className={className} onClick={handleBackNavigation}>
      &larr; Volver
    </button>
  ) : (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
