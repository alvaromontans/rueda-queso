/**
 * Propiedades para el componente InputField.
 *
 * @interface InputFieldProps
 * @property {string} label - El texto de la etiqueta para el campo de entrada.
 * @property {string} type - El tipo del campo de entrada (por ejemplo, "text", "password", "email").
 * @property {string} name - El atributo name para el campo de entrada.
 * @property {string} [defaultValue] - El valor predeterminado del campo de entrada (opcional).
 * @property {boolean} [required] - Indica si el campo de entrada es obligatorio (opcional).
 * @property {string} [error] - Un mensaje de error para mostrar en el campo de entrada (opcional).
 */
interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  error?: string;
}

function InputField({
  label,
  type,
  name,
  defaultValue = "",
  required = false,
  error,
}: InputFieldProps) {
  return (
    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
      <label className="sm:basis-40">{label}</label>
      <div className="w-full grow">
        <input
          className="w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 focus:ring focus:ring-yellow-400 focus:outline-none md:px-6 md:py-3"
          type={type}
          name={name}
          defaultValue={defaultValue}
          required={required}
        />
        {error && (
          <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default InputField;
