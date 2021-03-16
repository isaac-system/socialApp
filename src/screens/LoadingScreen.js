import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {UserContext} from '../context/UserContext'
import {FirebaseContext} from '../context/FirebaseContext'

const LoadingScreen = () => {
    const [_, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        setTimeout(async () => {
            const user = firebase.getCurrentUser()

            if (user) {
                const userInfo = await firebase.getUserInfo(user.uid)

                setUser({
                    isLoggedIn: true,
                    email: userInfo.email,
                    uid: user.uid,
                    username: user.username,
                    profilePhotoUrl: userInfo.profilePhotoUrl
                })
            } else {
                setUser((state) => ({...state, isLoggedIn: false}))
            }

            setUser((state) => ({ ...state, isLoggedIn: false}))
        }, 500)
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 32, fontWeight: '100' ,color: '#FFFFFF', }}>Titan Morning</Text>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222222'
    }
})
