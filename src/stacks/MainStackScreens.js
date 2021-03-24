import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Ionicons} from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import FeedScreen from '../screens/FeedScreen'
import AddTodoScreen from '../screens/HomeScreen'
import DownLoadScreen from '../screens/DownLoadScreen'
import ProfileScreen from '../screens/ProfileScreen'

const MainStackScreens = () => {
    const MainStack = createBottomTabNavigator()

    const tabBarOptions = {
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
            backgroundColor: '#222222',
        }
    }

    const screenOptions = (({route}) => ({ 
        tabBarIcon: ({focused}) => {
            let iconName = "home"

            switch (route.name) {
                case "Home":
                    iconName = "home"
                    break;

                case "Feed":
                    iconName = "document"
                    break;

                case "DownLoad":
                    iconName = "download-outline"
                    break;

                case "Profile":
                    iconName = "person"
                    break;
            }

            if (route.name === "AddTodo") {
                return(
                    <Ionicons name="add-circle" size={48} color="#23a8d9" />
                )
            }

            return <Ionicons name={iconName} size={24} color={focused ? "#ffffff" : "#666666"} />
        },
     }))
    return(
        <MainStack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
            <MainStack.Screen name='Home' component={HomeScreen} />
            <MainStack.Screen name='Feed' component={FeedScreen} />
            <MainStack.Screen name='AddTodo' component={AddTodoScreen} />
            <MainStack.Screen name='DownLoad' component={DownLoadScreen} />
            <MainStack.Screen name='Profile' component={ProfileScreen} />
        </MainStack.Navigator>
    )
}

export default MainStackScreens;