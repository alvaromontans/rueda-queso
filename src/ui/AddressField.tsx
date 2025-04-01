/**
 * Un componente de React que renderiza un campo de entrada de dirección con manejo opcional de errores
 * y un botón para obtener la ubicación actual del usuario.
 *
 * @param {Object} props - El objeto de propiedades.
 * @param {boolean} props.isLoading - Indica si el componente está en un estado de carga.
 * @param {string} [props.defaultValue] - El valor predeterminado para el campo de entrada de dirección.
 * @param {string} [props.error] - Un mensaje de error para mostrar debajo del campo de entrada.
 * @param {() => void} props.onFetchAddress - Una función de callback para obtener la ubicación actual del usuario.
 * @param {Object} props.position - La posición actual del usuario.
 * @param {number} [props.position.latitude] - La latitud de la posición actual del usuario.
 * @param {number} [props.position.longitude] - La longitud de la posición actual del usuario.
 *
 * @returns {JSX.Element} El componente AddressField renderizado.
 */
import Button from "./Button";

function AddressField({
  isLoading,
  defaultValue,
  error,
  onFetchAddress,
  position,
}: {
  isLoading: boolean;
  defaultValue?: string;
  error?: string;
  onFetchAddress: () => void;
  position: { latitude?: number; longitude?: number };
}) {
  return (
    <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
      <label className="sm:basis-40">Dirección</label>
      <div className="w-full grow">
        <input
          className="w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 focus:ring focus:ring-yellow-400 focus:outline-none md:px-6 md:py-3"
          type="text"
          name="address"
          disabled={isLoading}
          defaultValue={defaultValue}
          required
        />
        {error && (
          <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
            {error}
          </p>
        )}
      </div>
      {!position.latitude && !position.longitude && (
        <span className="absolute top-1 right-1.5 bottom-1 z-50">
          <Button type="small" onClick={onFetchAddress} disabled={isLoading}>
            Obtener ubicación
          </Button>
        </span>
      )}
    </div>
  );
}

export default AddressField;
