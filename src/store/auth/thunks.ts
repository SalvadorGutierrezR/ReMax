import AsyncStorage from '@react-native-async-storage/async-storage';

import { Dispatch } from 'redux';
import { remaxApi } from '../../api';
import { User } from '../../interfaces/authInterfaces';
import { login, logout } from './authSlice';
// import from 'axios'; 'axios';

type DataUser = {
    email: string;
    password: string;
}

export const startLogin = (dataUser: DataUser) => {
    return async (dispatch: Dispatch) => {
        try {
            const { data } = await remaxApi.post<User>('/auth/login/', dataUser);

            dispatch(login(data));

            await AsyncStorage.setItem('token', data.token.access);
            await AsyncStorage.setItem('email', data.email);
            await AsyncStorage.setItem('token-refresh', data.token.refresh);

        } catch (error: any) {
            console.log("Response API", error)
            console.log(error.response.detail);
        }
    };
};

export const checkToken = () => {
    return async (dispatch: Dispatch) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const tokenRefresh = await AsyncStorage.getItem('token-refresh');
            const email = await AsyncStorage.getItem('email');
            console.log(token, tokenRefresh, email);
            console.log({
                refresh: tokenRefresh,
                email
            })
            // No token, no autenticado
            if (!token || !tokenRefresh || !email) return dispatch(logout());

            const resp = await remaxApi.post('/auth/login/refresh/', {
                refresh: tokenRefresh,
                email
            });
            if (resp.status !== 200) {
                return dispatch(logout());
            }
            dispatch(login(resp.data));

            await AsyncStorage.setItem('token', resp.data.token.access);
            await AsyncStorage.setItem('token-refresh', resp.data.token.refresh);
            await AsyncStorage.setItem('email', resp.data.email);

        } catch (error) {
            console.log(error);
        }
    }
}

export const startLogout = () => {
    return async (dispatch: Dispatch) => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('token-refresh');
            await AsyncStorage.removeItem('email');
            dispatch(logout());
        } catch (error) {
            console.log(error);
        }
    }
}

