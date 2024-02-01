import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import Main from '../views/main';
import ScheduleDrive from "../views/schedule_drive/index"
import SelectContainer from './select';
import Intro from '../views/intro';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Trang chủ') {
                    iconName = 'home'
                } else if (route.name === 'Lịch sử đặt xe') {
                    iconName = 'history'
                }
                return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#00CCFF',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
        })} >
            <Tab.Screen name="Trang chủ" component={Main} />
            <Tab.Screen name="Lịch sử đặt xe" component={ScheduleDrive} />
        </Tab.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Intro'>
                <Stack.Screen
                    name="Intro"
                    component={Intro}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SelectContainer"
                    component={SelectContainer}
                    options={{ headerTitle: "", headerBackTitleVisible: false }}
                />
                <Stack.Screen name="EditPost" component={ScheduleDrive} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
