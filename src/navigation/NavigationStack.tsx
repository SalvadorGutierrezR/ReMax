import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import DrawerNavigation from './DrawerNavigation';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { AppState } from 'react-native';
import { startAskingPermission, startCheckingPermission} from '../store/permissions';



const Stack = createStackNavigator();
const NavigationStack = () => {

    const status = useAppSelector(state => state.auth.status)
    const locationStatus = useAppSelector(state => state.permisisons.locationStatus)
    const dispatch = useAppDispatch()
    

    useEffect(() => {
        AppState.addEventListener("change", state => {
            if (state !== "active") return;
            dispatch(startCheckingPermission());
        });
    }, [])
    
    useEffect(() => {
        if (locationStatus !== 'granted') {
            dispatch(startAskingPermission());
          
        }
    }, [locationStatus])



    if (status === 'checking' && locationStatus !== 'granted' ) return <SplashScreen />
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
            {
                status === 'authenticated' ?
                    <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
                    :
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />

            }
            {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
        </Stack.Navigator>
    );
}

export default NavigationStack