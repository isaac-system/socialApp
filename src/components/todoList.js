import { icons } from "../constants";
import React, { useState } from "react";
import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Animated from "react-native-reanimated";

const TodoList = ( {item} ) => {
    // const [text, setText] = useState(item.todos.text);
    // todo: 클릭으로 글자 수정가능 기능
    
    const [routines, setRoutines] = useState(item.todos)

    const onRemove = (index) => {
        routines.splice(index, 1)
    };

    const onSubCheckBox = (index) => {
        setRoutines (
            routines.map(todo => 
                todo.index === index ? {...todo, checked : !todo.checked} : todo
                )
            )
        console.log(routines)
    }


    const todoInputHandler = (val) => {
        setText(val);
    }

    const rightActions = (drageX, index) => {
        return (
            <TouchableOpacity onPress={() => onRemove(index)}>
                <Animated.View style={{ marginTop:10,width:50,height:50, backgroundColor:'#ff2e63',justifyContent: 'center', alignItems:'center'}}>
                    <Animated.Text style={{ fontWeight: '800', color: '#FFFFFF' }}>
                        삭제
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }


    const renderItem = ({item , index}) => {
        return(
            <Swipeable renderRightActions={(_, drageX) => rightActions(drageX, index)}>
                <View 
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#ffffff',
                        width: '100%',
                        height: 50,
                        marginTop: 10,
                        alignItems:'center',
                    }}
                >
                    
                    <TouchableOpacity
                        onPress={() => {onSubCheckBox()}}
                        style={{
                            width:40,
                            height:50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                            <Image
                                source={item.checked ? icons.checkBoxCheckedOutline : icons.checkBox}
                                resizeMode='contain'
                                style={{
                                    width:24,
                                    height:24
                                }}
                            />
                    </TouchableOpacity>
                    
                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <View 
                            style={{
                            height: 24,
                            }}
                        >
                            <Text
                                onChangeText={todoInputHandler}
                                style={{
                                    width:256,
                                    height:22,
                                    color: item.checked ? '#999999' : '#191919',
                                    textDecorationLine: item.checked ? "line-through" : "none"
                                }}
                            >
                                {item.text}
                            </Text>
                        </View>
                    </View>
                    
                </View>
            </Swipeable>
        )
    }   


    return(
        <View>
            <FlatList 
            data = {routines}
            renderItem = {renderItem}
            keyExtractor= {(_,index) => index.toString()}
            extraData= {item.text}
            />
        </View>
    )

    
         
}

export default TodoList;