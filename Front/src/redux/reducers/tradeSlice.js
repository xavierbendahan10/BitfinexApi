import { createSlice } from '@reduxjs/toolkit';

const defaultCoin = {
 nickname: "undefined",
 type : 0 ,
 value : 0
}

export const tradesSlice = createSlice ({
    name: 'trade', // para identificar el slice dentro del store    
    initialState: {   // estado inicial del slice 
        coin: defaultCoin,
    },
    // funciones reduce del slice que definen como se actualiza el estado 
    // aca se puede usar logica mutable pero detras de escena redux hace logica inmutable
    reducers: {         
        search: (state, action) => {
            state.coin = action.payload
        },
        reset_trade: (state) => {
            state.coin = defaultCoin
        }
    },
});

// importante para poder usar los reducers dentro de las interfaces
export const { search, reset_trade } = tradesSlice.actions
// importante para acoplar este reduce al store principal
export default tradesSlice.reducer
