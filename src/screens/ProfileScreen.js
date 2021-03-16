import React,{useContext} from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import {UserContext} from '../context/UserContext'
import {FirebaseContext} from '../context/FirebaseContext'


const ProfileScreen = () => {
    const [user, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)

    const logOut = async () => {
        const loggedOut = await firebase.logOut()

        if (loggedOut) {
            setUser((state) => ({...state, isLoggedIn: false}))
        }
    }

    return (
        <View style={styles.container}>
            <View style={{shadowOpacity:0.8, shadowRadius: 30, shadowColor: '#222222'}}>
                <Image style={{width: 128, height:128, borderRadius:64}} source={user.profilePhotoUrl === 'default' ? require('../../assets/icon.png') : {uri: user.profilePhotoUrl}} />
            </View>
            <Text style={{fontSize: 18, fontWeight:'bold', marginTop: 16, marginBottom: 32}}>
                {user.username}
            </Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:32, flex:1}}>
                <View style={{alignItems: 'center', flex: 1}}>
                    <Text style={{fontSize:24, fontWeight:'100'}}>21</Text>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'#c2c4cd'}}>post</Text>
                </View>
                <View style={{alignItems: 'center', flex: 1}}>
                    <Text style={{fontSize:24, fontWeight:'100'}}>981</Text>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'#c2c4cd'}}>Followers</Text>
                </View>
                <View style={{alignItems: 'center', flex: 1}}>
                    <Text style={{fontSize:24, fontWeight:'100'}}>63</Text>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'#c2c4cd'}}>Following</Text>
                </View>
            </View>

            <TouchableOpacity onPress={logOut} style={{marginBottom: 32}}>
                <Text style={{fontSize: 18, fontWeight:'bold', color: '#23a8d9'}}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        marginTop: 64        
    }
})
