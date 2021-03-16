import React, { useContext, useState } from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import {FirebaseContext} from '../context/FirebaseContext'
import {UserContext} from '../context/UserContext'


const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext);
    const [_,setUser] = useContext(UserContext);

    const signIn = async () => {
        setLoading(true)

        try {
            await firebase.signIn(email, password)

            const uid = firebase.getCurrentUser().uid

            const userInfo = await firebase.getUserInfo(uid)

            setUser({
                username: userInfo.username,
                email: userInfo.email,
                uid,
                profilePhotoUrl: userInfo.profilePhotoUrl,
                isLoggedIn: true,
            })
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <View style={styles.container}>
            <View style={{marginTop:160}}>
                <Text style={{fontSize:32,fontWeight:'200',alignSelf:'center'}}>Welcome back.</Text>
            </View>
            <View style={{marginVertical:64,marginHorizontal:32}}>
                <View style={{marginBottom:32}}>
                    <Text style={{
                            color:'#8e93a1',
                            fontSize:12,
                            textTransform:'uppercase',
                            fontWeight:'300'
                        }}>
                        Email Address
                    </Text>
                    <TextInput autoCapitalize='none' autoCompleteType='email' autoCorrect={false} autoFocus={true} keyboardType='email-address' onChangeText={(email) => setEmail(email.trim())} value={email}  style={{borderBottomColor: '#8e93a1', borderBottomWidth:0.5, height:48}}/>
                    
                </View>

                <View style={{marginBottom:32}}>
                <Text style={{
                            color:'#8e93a1',
                            fontSize:12,
                            textTransform:'uppercase',
                            fontWeight:'300'
                        }}>
                        Password
                    </Text>
                    <TextInput autoCapitalize='none' autoCompleteType='password' autoCorrect={false} secureTextEntry={true} onChangeText={(password) => setPassword(password.trim())} value={password} style={{borderBottomColor: '#8e93a1', borderBottomWidth:0.5, height:48}}/>
                    
                </View>
            </View>

            <TouchableOpacity
                onPress={signIn}
                disabled={loading}
                style={{
                    marginHorizontal:32,
                    height:48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#8022d9',
                    borderRadius:6
                }}
            >
                {loading ? (
                    <ActivityIndicator color='#ffffff' size='small'/>
                ) : (
                <Text
                    style={{fontWeight:'bold', alignSelf:'center', color:'#ffffff'}}
                >
                    Sign In
                </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={{marginTop:16}}
                onPress={() => navigation.navigate("SignUp")}
            >
                <Text style={{fontSize:12, alignSelf:'center'}}>처음이십니까? <Text style={{color:'#8022d9',fontWeight:'bold'}}>회원가입</Text></Text>
            </TouchableOpacity>
            <StatusBar barStyle='light-content'/>
        </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
})
