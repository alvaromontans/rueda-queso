/**
 * Obtiene la dirección del usuario basada en su geolocalización.
 * 
 * Este thunk asíncrono realiza los siguientes pasos:
 * 1. Recupera la posición de geolocalización del usuario utilizando la API `navigator.geolocation`.
 * 2. Utiliza una API de geocodificación inversa para convertir las coordenadas de geolocalización en una dirección legible.
 * 3. Devuelve un objeto que contiene la posición y la dirección del usuario.
 * 
 * @async
 * @function fetchAddress
 * @returns {Promise<{ position: { latitude: number; longitude: number }; address: string }>} 
 * Un objeto que contiene la posición de geolocalización y la dirección del usuario.
 * 
 * @throws Lanzará un error si no se puede recuperar la posición de geolocalización o si falla la API de geocodificación inversa.
 */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import { User } from "../../interfaces/User";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async function () {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition() as GeolocationPosition;
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
})

const initialState: User = {
  username: "",
  status: "idle",
  position: { latitude: 0, longitude: 0 },
  address: "",
  error: ""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Actualiza el nombre de usuario en el estado del usuario.
     * 
     * @function updateName
     * @param {User} state - El estado del usuario.
     * @param {PayloadAction<string>} action - La acción que contiene el nuevo nombre de usuario.
     */
    updateName(state: User, action: PayloadAction<string>) {
      state.username = action.payload
    },
    /**
     * Restablece el estado del usuario a su estado inicial.
     * 
     * Esta función se utiliza cuando el usuario cierra sesión. Restablece el estado del usuario a su estado inicial, 
     * lo que significa que el nombre de usuario, posición, dirección y estado se restablecen a sus valores iniciales.
     * 
     * @function resetUserState
     * @returns {User} El estado inicial del usuario.
     */
    resetUserState(): User {
      return initialState;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = "loading";
    })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle"
      }).addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error = "No se ha podido acceder a tu ubicación";
      })
});

export const { updateName, resetUserState } = userSlice.actions;

export default userSlice.reducer;
