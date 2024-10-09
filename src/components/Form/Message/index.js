import React, {useState, useEffect} from 'react';
import { TextInput, Text, Pressable, View, FlatList} from 'react-native';
import socket from "../../../socket"
import style from './style';

export default function Message() {
    const [message, sendMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    function sendMessage() {
        console.log("entrou na sendMessage");

        // setMessageList{(arr) => [...arr, message]};
        setMessageList((arr) => [...arr, message]);

        setMessageList("")
    }

    return(
        <View>
            <Text style={style.title}>Digite uma mensagem:</Text>
            <TextInput
                onChangeText={message}
                placeholder="Escreva sua mensagem"
                inputMode="text"
                value={message}
            />
                
            <Pressable
                title="Enviar"
                onPress={() => sendMessage()}
            />
            <Text>Enviar</Text>

            <Text> Mensagem enviadas:</Text>
            <FlatList
                data={messageList.reverse()}
                renderItem={({item})=>{
                    return (
                        <Text>{Item}</Text>
                    )
                }}

                keyExtractor={(item)=>{item}}
            />
            
        </View>
    );
}