/**
 * Componente para crear un nuevo pedido en la aplicación.
 *
 * Este componente permite a los usuarios completar un formulario para realizar un pedido,
 * incluyendo proporcionar su nombre, número de teléfono, dirección y seleccionar si desean
 * entrega prioritaria. También calcula el precio total del pedido, incluyendo un cargo adicional
 * por entrega prioritaria si se selecciona.
 *
 * @component
 * @returns {JSX.Element} El componente CreateOrder renderizado.
 *
 * @description
 * - Si el carrito está vacío, el componente muestra un mensaje `EmptyCart`.
 * - El envío del formulario se maneja utilizando el hook `useSubmit` de React Router.
 * - La obtención de la dirección se gestiona a través de Redux y la acción `fetchAddress`.
 *
 * @example
 * ```tsx
 * <CreateOrder />
 * ```
 *
 * @dependencies
 * - React Router DOM: `Form`, `useNavigation`, `useSubmit`
 * - Redux: `useAppDispatch`, `useAppSelector`
 * - Componentes UI personalizados: `Button`, `InputField`, `AddressField`, `PriorityCheckbox`, `HiddenFields`
 * - Funciones utilitarias: `calculateEstimatedDelivery`, `formatCurrency`, `validatePhone`
 *
 * @state
 * - `errors`: Un objeto que contiene errores de validación para los campos del formulario.
 * - `withPriority`: Un booleano que indica si el usuario ha seleccionado entrega prioritaria.
 *
 * @redux
 * - `username`: El nombre del usuario actual desde el store de Redux.
 * - `addressStatus`: El estado del proceso de obtención de la dirección.
 * - `position`: La posición actual del usuario.
 * - `address`: La dirección del usuario.
 * - `addressError`: Cualquier error encontrado durante la obtención de la dirección.
 * - `cart`: Los artículos actuales en el carrito del usuario.
 * - `totalCartPrice`: El precio total de los artículos en el carrito.
 *
 * @functions
 * - `handleSubmit`: Maneja el envío del formulario, valida el número de teléfono y envía los datos del formulario.
 * - `handleAddress`: Despacha la acción `fetchAddress` para obtener la dirección del usuario.
 *
 * @estateLoaders
 * - `isSubmitting`: Indica si el formulario se está enviando actualmente.
 * - `isLoadingAddress`: Indica si la dirección se está obteniendo actualmente.
 */
import { Form, useNavigation, useSubmit } from "react-router-dom";
import Button from "../../ui/Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import {
  calculateEstimatedDelivery,
  formatCurrency,
  validatePhone,
} from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import InputField from "../../ui/InputField";
import AddressField from "../../ui/AddressField";
import PriorityCheckbox from "../../ui/PriorityCheckbox";
import HiddenFields from "../../ui/HiddenFields";

function CreateOrder() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<{ phone?: string }>({});
  const [withPriority, setWithPriority] = useState(false);

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useAppSelector((state) => state.user);
  const cart = useAppSelector(getCart);
  const totalCartPrice = useAppSelector(getTotalCartPrice);

  const isSubmitting = navigation.state === "submitting";
  const isLoadingAddress = addressStatus === "loading";
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("order_price", totalCartPrice.toString());
    formData.append(
      "estimated_delivery",
      calculateEstimatedDelivery(withPriority).toISOString(),
    );

    const phone = formData.get("phone") as string;
    const newErrors = validatePhone(phone);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      submit(formData, { method: "POST", action: "/order/new" });
    }
  };

  const handleAddress = () => dispatch(fetchAddress());

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Realiza tu pedido aquí:</h2>
      <Form onSubmit={handleSubmit}>
        <InputField
          label="Nombre"
          type="text"
          name="customer"
          defaultValue={username}
          required
        />
        <InputField
          label="Número de teléfono"
          type="tel"
          name="phone"
          required
          error={errors.phone}
        />
        <AddressField
          isLoading={isLoadingAddress}
          defaultValue={address}
          error={addressStatus === "error" ? addressError : undefined}
          onFetchAddress={handleAddress}
          position={position}
        />
        <PriorityCheckbox
          withPriority={withPriority}
          onSetWithPriority={setWithPriority}
        />
        <HiddenFields cart={cart} position={position} />
        <Button type="primary" disabled={isSubmitting}>
          {isSubmitting
            ? "Haciendo pedido..."
            : `Hacer pedido de ${formatCurrency(totalPrice)}`}
        </Button>
      </Form>
    </div>
  );
}

export default CreateOrder;
