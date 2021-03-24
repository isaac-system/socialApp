import { icons } from "../constants";
import React,{ useState } from "react";
import { View , Image ,TextInput, TouchableOpacity} from "react-native";


const TodoInsert = ( {onAddTodo , item} ) => {
    const [text, setText] = useState('');

    const todoInputHandler = (val) => {
        setText(val);
    }

    const addTodoHandler = () => {
        onAddTodo(text);
        setText('');
    }
    
    return(
            <View
                style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: '#ffffff',
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    marginVertical: 10,
                    alignItems:'center',
                    justifyContent:'space-between'
                }}
            >   
                <TextInput
                    placeholder='New Todo'
                    onChangeText={todoInputHandler}
                    autoCorrect={false}
                    style={{width: "90%"}}
                />
                <TouchableOpacity
                    onPress={addTodoHandler}
                >
                    <Image
                        source={icons.plusBox}
                        resizeMode='contain'
                        style={{
                            width: 24,
                            height: 24
                        }}
                    />
                </TouchableOpacity>
            </View>
    )
}

export default TodoInsert;