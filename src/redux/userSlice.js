import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nombre: "b",
    email: "a",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUsuario: (state, action) => {
            const { nombre, email } = action.payload;
            state.nombre = nombre;
            state.email = email;
        }
    }
});
export const { addUsuario } = userSlice.actions
export default userSlice.reducer 