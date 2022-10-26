import { configureStore } from '@reduxjs/toolkit';
import bestpriceReducer from './reducers/bestpriceSlice';
import tradeReducer from './reducers/tradeSlice'
// store principal aca agregamos todos los slice que tengamos junto a sus reducers.
export default configureStore({
    reducer: {
        price: bestpriceReducer,
        trade: tradeReducer
    },
});