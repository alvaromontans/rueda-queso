import { GEOCODING_URL } from "../constants";

/**
 * Obtiene la información de la dirección para un conjunto de coordenadas geográficas (latitud y longitud)
 * utilizando la API de geocodificación inversa de BigDataCloud.
 *
 * @param {Object} params - Los parámetros para la función.
 * @param {number} params.latitude - La latitud de la ubicación.
 * @param {number} params.longitude - La longitud de la ubicación.
 * @returns {Promise<any>} Una promesa que se resuelve con los datos de la dirección devueltos por la API.
 * @throws {Error} Lanza un error si la solicitud a la API falla.
 */
export async function getAddress({ latitude, longitude }: { latitude: number; longitude: number }) {
  const res = await fetch(
    `${GEOCODING_URL}?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
