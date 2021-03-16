import React, { useContext, useState } from 'react'
import {KeyboardAvoidingView, Platform} from 'react-native'
import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {AntDesign} from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import {FirebaseContext} from '../context/FirebaseContext'
import {UserContext} from '../context/UserContext'

const SignUpScreen = ({navigation}) => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] =useState();
    const firebase = useContext(FirebaseContext);
    const [_,setUser] = useContext(UserContext);

    const getPermission = async () => {
        if (Platform.OS !== 'web') {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            return status
        }
    }; 

    const pickImage = async () => {
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })

            if (!result.cancelled) {
                setProfilePhoto(result.uri);
            }
        } catch (error) {
            console.log("Error @pickImage: ", error);
        }
    }

    const addProfilePhoto = async () => {
        const status = await getPermission();
        
        if (status !== "granted") {
            alert("We need permission to access your camera roll.")

            return;
        }

        pickImage();
    };

    const signUp = async () => {
        setLoading(true)

        const user = {username, email, password, profilePhoto}

        try {
            const createUser = await firebase.createUser(user)
            
            setUser({...createUser, isLoggedIn: true})
        } catch (error) {
            console.log('Error @signUp: ', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{marginTop:80}}>
                <Text 
                    style={{
                        fontSize:32,
                        fontWeight:'200',
                        alignSelf:'center'
                    }}
                >
                    Sign Up to get Started.
                </Text>
            </View>

            <TouchableOpacity onPress={addProfilePhoto} style={{width:80, height:80, borderRadius:40,backgroundColor:'#e1e2e6',alignSelf:'center',marginTop:16, overflow:'hidden'}}>
                {profilePhoto ? (
                    <Image source={{uri: profilePhoto}} style={{flex:1}}/>
                ) : (
                <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                    <AntDesign name='plus' size={24} color='#ffffff'/>
                </View> 

                )}
            </TouchableOpacity>
            <KeyboardAvoidingView>
                <View style={{marginVertical:32,marginHorizontal:32}}>
                    
                    <View style={{marginBottom:32}}>
                        <Text style={{
                                color:'#8e93a1',
                                fontSize:12,
                                textTransform:'uppercase',
                                fontWeight:'300'
                            }}>
                            Username
                        </Text>
                        <TextInput autoCapitalize='none' autoCorrect={false} autoFocus={true} onChangeText={(username) => setUsername(username.trim())} value={username}  style={{borderBottomColor: '#8e93a1', borderBottomWidth:0.5, height:48}}/>
                        
                    </View>

                    <View style={{marginBottom:32}}>
                        <Text style={{
                                color:'#8e93a1',
                                fontSize:12,
                                textTransform:'uppercase',
                                fontWeight:'300'
                            }}>
                            Email Address
                        </Text>
                        <TextInput autoCapitalize='none' autoCompleteType='email' autoCorrect={false} keyboardType='email-address' onChangeText={(email) => setEmail(email.trim())} value={email}  style={{borderBottomColor: '#8e93a1', borderBottomWidth:0.5, height:48}}/>
                        
                    </View>

                    <View>
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
            </KeyboardAvoidingView>

            <TouchableOpacity
                onPress={signUp}
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
                    Sign Up
                </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={{marginTop:16}}
                onPress={() => navigation.navigate("SignIn")}
            >
                <Text style={{fontSize:12, alignSelf:'center'}}>이미 회원이십니까? <Text style={{color:'#8022d9',fontWeight:'bold'}}>로그인</Text></Text>
            </TouchableOpacity>
            <StatusBar barStyle='light-content'/>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
})
