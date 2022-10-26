import { createSlice } from '@reduxjs/toolkit';


export const bestpricesSlice = createSlice ({
    name: 'price', // para identificar el slice dentro del store    
    initialState: {   // estado inicial del slice 
        value: [],
    },
    // funciones reduce del slice que definen como se actualiza el estado 
    // aca se puede usar logica mutable pero detras de escena redux hace logica inmutable
    reducers: {         
        savePrice: (state, action) => {
            state.value = action.payload
        },
        reset_price: (state) => {
            state.value = []
        }
    },
});

// importante para poder usar los reducers dentro de las interfaces
export const { savePrice, reset_price } = bestpricesSlice.actions
// importante para acoplar este reduce al store principal
export default bestpricesSlice.reducer
