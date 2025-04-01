/**
 * Un componente versátil `Button` que puede renderizarse como un `<button>` o un `<Link>`
 * dependiendo de las props proporcionadas. Soporta múltiples estilos y comportamientos.
 *
 * @param {ReactNode} children - El contenido que se mostrará dentro del botón.
 * @param {boolean} [disabled] - Indica si el botón está deshabilitado. Por defecto es `false`.
 * @param {string} [to] - Si se proporciona, el botón se renderizará como un `<Link>` con esta prop `to`.
 * @param {() => void} [onClick] - La función manejadora del evento click para el botón.
 * @param {"primary" | "small" | "secondary" | "round"} [type="primary"] - El estilo del botón.
 *    - `primary`: Estilo predeterminado con mayor padding.
 *    - `small`: Botón más pequeño con padding reducido.
 *    - `secondary`: Botón con borde y estilo secundario.
 *    - `round`: Botón compacto con bordes redondeados.
 *
 * @returns {JSX.Element} El elemento renderizado como botón o enlace.
 */
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  onClick?: () => void;
  type?: "primary" | "small" | "secondary" | "round";
}

function Button({
  children,
  disabled,
  to,
  onClick,
  type = "primary",
}: ButtonProps) {
  const base =
    "text-sm inline-block rounded-full bg-yellow-400 font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed";

  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4",
    small: base + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "text-sm inline-block rounded-full border-2 border-stone-300 font-semibold tracking-wide text-stone-400 uppercase transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:ring focus:ring-stone-200 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
    round: base + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
