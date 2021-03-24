import React,{ useContext, useState, useEffect }from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Keyboard} from 'react-native'
import {icons, COLORS} from '../constants'
import TodoInsert from '../components/todoInsert';
import TodoList from '../components/todoList';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

import {UserContext} from '../context/UserContext'
import {RoutineContext} from '../context/RoutineContext'
import {FirebaseContext} from '../context/FirebaseContext'

const HomeScreen = () => {

    const [user, setUser] = useContext(UserContext)
    const [routine, setRoutine  ] = useContext(RoutineContext)
    const firebase = useContext(FirebaseContext)

    const [lists, setLists] = useState([]);

    useEffect(() => {
        firebase.getLists((lists) => {
            setLists(lists)
        })
    }, [])

    const onAddTodo = (text,id) => {
        // let copyb = lists.filter( a => a.id == id )
        // copyb.map(a => a.todos.push({id: Math.random().toString(), text: text, checked: false},))
        // setLists(lists)

        // Keyboard.dismiss();
    }   

    
    const onClickMainCheckBox = (list) => {
        firebase.updataLists(list)
    }
    
    const [selectedToggle, setSelectedToggle] = useState(null)

    function onSelectToggle(e) {
        {(selectedToggle?.id == e.id)? setSelectedToggle(null) :setSelectedToggle(e)}
    }

    function renderHeader() {
        
    return (
        <View style={{
            flexDirection: 'row',
            height: 46,
            marginTop: 10,
            justifyContent: 'space-between'
        }}>
            <View>
                <Text
                    style={{
                        fontSize: 12
                    }}
                >
                    다음 알림
                </Text>
                <Text
                    style={{
                        fontSize: 16
                    }}
                > 
                {/* To do */}
                    16시 24분
                </Text>
            </View>

            <View>
                <View
                    style ={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <View>
                        <Image 
                            source = {icons.sunny}
                            resizeMode = "contain"
                            style ={{
                                width: 24,
                                height: 24,
                            }}
                        />
                    </View>
                    <View>
                        <Text
                            style ={{
                                fontSize: 24
                            }}
                        >
                            21
                        </Text>
                    </View>
                    <Image 
                        source= {icons.celsius}
                        resizeMode = "contain"
                            style ={{
                                width: 10,
                                height: 24,
                            }}
                    />
                </View>
                <View>
                    <Text>
                        {/* To do */}
                        용산
                    </Text>
                </View>
            </View>
        </View>
        
        
    )
    }
    
    function renderProfile() {
        return(
            <View style={{flexDirection: "row", alignItems:'center'}}>
                <TouchableOpacity 
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        flexDirection: "row",
                        marginLeft: 10,
                        marginVertical: 15
                    }}>
                    <Image
                    // to do
                        // source={icons.Mlists}
                        resizeMode="contain"
                        style={{
                            width:30,
                            height:30,
                        }}
                />
                
                </TouchableOpacity>

                <TouchableOpacity style={{
                    marginLeft: 30
                }}>
                    <Text style={{fontSize: 24}}>
                        {/* To do */}
                        Wellcome, {user.username}
                    </Text>
                </TouchableOpacity>
            </View>
            
        )
    }

    function renderRoutineList() {
        
        const renderItem = ({ item }) => (
            
            <View
                style={{
                    width: '100%',
                    marginVertical:10,
                }}
            >
                <View
                    style={{
                        height: 80,
                        backgroundColor: '#ffffff',
                        flexDirection: 'row',
                        borderTopRightRadius:10,
                        borderTopLeftRadius:10,
                    }}
                >   
                    <TouchableOpacity
                        style={{
                            height: 80,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress= {() => onClickMainCheckBox(item.id)}
                    >
                        <Image 
                            source = { (item.checked) ? icons.checkBoxChecked : icons.checkBoxGray}
                            resizeMode = 'contain'
                            style ={{
                                height: 24,
                                width: 24
                            }}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 80,
                            width: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View style={{
                            flexDirection: 'column',
                            marginRight: 2,
                            justifyContent: 'center',
                            alignItems: 'center'
                            
                        }}
                            >
                            <Text 
                                style={{
                                    fontSize:24,
                                    color: item.checked ? '#191919' : '#999999'
                                }}
                            >  
                            {item.setTime}
                            </Text>
                            
                            <View>
                                <Text 
                                    style={{
                                        fontSize: 12,
                                        color: '#999999'
                                    }}
                                >  
                                {item.setDay}
                                </Text>
                            </View>
                            
                        </View>
                        <Text
                            style={{
                                fontSize:12,
                                color: '#999999'
                            }}
                        >  
                        {item.setAMPM ? '오전' : '오후'}
                        </Text>
                    </View>
                    

                        
                    <View
                        style={{
                            height:80,
                            width: 90,
                            marginLeft: 15,
                            marginRight: 14,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text 
                            style={{
                                fontSize:24,
                                color: item.checked ? '#191919' : '#999999'
                            }}
                        >  
                            {item.location}
                        </Text>
                    </View>
                        
                    <View
                        style={{
                            height:80,
                            width: 90,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text 
                            style={{
                                fontSize:24,
                                color: item.checked ? '#191919' : '#999999'
                            }}
                        >  
                            {item.title}
                        </Text>
                    </View>
                        
                </View>

                
                {(selectedToggle?.id == item.id) &&
                    <View
                        style={{
                        width:'100%',
                        backgroundColor:'#f1f1f5',
                        }}
                    >
                        <TodoList item={item}/>
                        <TodoInsert item={item.id} onAddTodo={(text) => onAddTodo( text , item.id )}/>
                    </View>
                }
                
                <TouchableOpacity
                    onPress={() => onSelectToggle(item)}
                    style={{
                    backgroundColor: item.checked ? "#B088F9" : '#DDDDDD',
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10,
                    ...styles.shadow
                    }}
                >
                    <View
                    style={{
                    width:'100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}
                    >
                        <Image 
                        source={(selectedToggle?.id == item.id) ? icons.toggleUpBtn : icons.toggleDownBtn}
                        style={{
                            width:24,
                            height:24
                        }}
                        />
                        
                    </View>

                </TouchableOpacity>
            </View>

            
        );
               
        return (
            <View>
                <KeyboardAwareFlatList
                    data={lists}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 170
                    }}
                />
            </View>
        )
        
    }

        
    return (
        <SafeAreaView
            style={styles.container}
        >
            <StatusBar/>
            {renderHeader()}
            {renderProfile()}
            {renderRoutineList()}
            
        </SafeAreaView>
    )
    
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 24,
        marginTop: 12
    
    }
})
