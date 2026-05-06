import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from '../slices/authSlice';
import categoryReducer from '../slices/categorySlice';
import productReducer from '../slices/productSlice';
import userReducer from '../slices/userSlice';
import orderReducer from '../slices/orderSlice';
import tenantReducer from '../slices/tenantSlice';
import partnerReducer from '../slices/partnerSlice';
import partnerProductReducer from '../slices/partnerProductSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
    users: userReducer,
    orders: orderReducer,
    tenants: tenantReducer,
    partners: partnerReducer,
    partnerProducts: partnerProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

