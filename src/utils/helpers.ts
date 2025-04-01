/**
 * Formatea un valor numérico como una cadena de moneda en Euros (€) utilizando la configuración regional española.
 *
 * @param value - El valor numérico a formatear.
 * @returns Una cadena que representa el valor de moneda formateado.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}


/**
 * Formatea una cadena de fecha en un formato legible para humanos.
 *
 * La fecha formateada incluye el día, el mes abreviado, la hora y los minutos,
 * utilizando la configuración regional española ("es").
 *
 * @param dateStr - La cadena de fecha a formatear. Debe ser una cadena de fecha
 *                  válida que pueda ser analizada por el constructor `Date`.
 * @returns Una cadena de fecha formateada en el formato "día mes hora:minuto".
 *
 * @example
 * ```typescript
 * const formattedDate = formatDate("2023-03-15T14:30:00Z");
 * console.log(formattedDate); // p. ej., "15 mar. 15:30"
 * ```
 */
export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

/**
 * Calcula el número de minutos restantes hasta una fecha y hora especificadas.
 *
 * @param dateStr - Una cadena que representa la fecha y hora objetivo en un formato
 *                  que pueda ser analizado por el constructor `Date`.
 * @returns El número de minutos restantes hasta la fecha y hora objetivo.
 *          El resultado se redondea al número entero más cercano.
 */
export function calcMinutesLeft(dateStr: string): number {
  const now = Date.now();
  const targetTime = new Date(dateStr).getTime();
  return Math.round((targetTime - now) / 60000);
}

/**
 * Genera un ID de pedido aleatorio como una cadena.
 * El ID es un número de tres dígitos, rellenado con ceros a la izquierda si es necesario.
 *
 * @returns {string} Una cadena que representa el ID de pedido generado.
 */
export function generateOrderId(): string {
  return Math.floor(1 + Math.random() * 999)
    .toString()
    .padStart(3, "0");
}

/**
 * Calcula el tiempo estimado de entrega basado en si el pedido tiene prioridad.
 *
 * @param withPriority - Un booleano que indica si el pedido es prioritario.
 *                        Si es `true`, el tiempo de entrega es de 15 minutos.
 *                        Si es `false`, el tiempo de entrega es de 30 minutos.
 * @returns Un objeto `Date` que representa el tiempo estimado de entrega.
 */
export function calculateEstimatedDelivery(withPriority: boolean): Date {
  const estimatedDelivery = new Date();
  const deliveryTime = withPriority ? 15 : 30;
  estimatedDelivery.setMinutes(estimatedDelivery.getMinutes() + deliveryTime);
  return estimatedDelivery;
}

/**
 * Valida un número de teléfono utilizando una expresión regular.
 *
 * @param phone - El número de teléfono a validar.
 * @returns Un objeto que contiene un mensaje de error si el número de teléfono no es válido,
 *          o un objeto vacío si el número de teléfono es válido.
 *
 * @example
 * ```typescript
 * const resultado = validatePhone("+34 600 123 456");
 * console.log(resultado); // Salida: {}
 *
 * const resultadoInvalido = validatePhone("12345");
 * console.log(resultadoInvalido); // Salida: { phone: "Introduce un número de teléfono válido." }
 * ```
 */
export function validatePhone(phone: string): { phone?: string } {
  const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return phoneRegex.test(phone)
    ? {}
    : { phone: "Introduce un número de teléfono válido." };
}
