/**
 * Propiedades para el componente PriorityCheckbox.
 *
 * @interface PriorityCheckboxProps
 * @property {boolean} withPriority - Indica si la prioridad está habilitada.
 * @property {(value: boolean) => void} onSetWithPriority - Función de devolución de llamada para actualizar el estado de prioridad.
 */
interface PriorityCheckboxProps {
  withPriority: boolean;
  onSetWithPriority: (value: boolean) => void;
}

function PriorityCheckbox({
  withPriority,
  onSetWithPriority,
}: PriorityCheckboxProps) {
  return (
    <div className="mb-12 flex items-center gap-5">
      <input
        className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
        type="checkbox"
        name="priority"
        id="priority"
        value={withPriority.toString()}
        onChange={(e) => onSetWithPriority(e.target.checked)}
      />
      <label htmlFor="priority" className="font-medium">
        ¿Quieres darle prioridad a tu pedido?
      </label>
    </div>
  );
}

export default PriorityCheckbox;
