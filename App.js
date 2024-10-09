import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import socket from "./socket";

export default function App() {
  const [room, setRoom] = useState('default');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [messages, setMessages] = useState([]);

  // Envia a mensagem do Formulário 1 (lado esquerdo)
  const sendMessage1 = () => {
    if (message1.trim()) {
      const msg = { room, message: message1, from: 'form1' };
      socket.emit('send_message', msg);
      setMessages([...messages, msg]); // Adiciona a mensagem localmente
      setMessage1(''); // Limpa o campo de mensagem após o envio
    }
  };

  // Envia a mensagem do Formulário 2 (lado direito)
  const sendMessage2 = () => {
    if (message2.trim()) {
      const msg = { room, message: message2, from: 'form2' };
      socket.emit('send_message', msg);
      setMessages([...messages, msg]); // Adiciona a mensagem localmente
      setMessage2(''); // Limpa o campo de mensagem após o envio
    }
  };

  // Recebe as mensagens enviadas de qualquer um dos dois formulários
  useEffect(() => {
    socket.emit('join_room', room);

    socket.on('receive_message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [room]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Canal: {room}</Text>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View 
            key={index} 
            style={[
              styles.message, 
              msg.from === 'form1' ? styles.messageLeft : styles.messageRight
            ]}
          >
            <Text style={styles.messageText}>
              {msg.message}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Formulário 1 - Envia mensagem do lado esquerdo */}
      <TextInput
        placeholder='Digite sua mensagem (Formulário 1)'
        value={message1}
        onChangeText={setMessage1}
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={sendMessage1}>
        <Text style={styles.buttonText}>Enviar mensagem</Text>
      </Pressable>

      {/* Formulário 2 - Envia mensagem do lado direito */}
      <TextInput
        placeholder='Digite sua mensagem (Formulário 2)'
        value={message2}
        onChangeText={setMessage2}
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={sendMessage2}>
        <Text style={styles.buttonText}>Enviar mensagem</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f2f7',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  message: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    maxWidth: '80%',
  },
  messageLeft: {
    backgroundColor: '#FFF5EE',
    alignSelf: 'flex-start', // Alinha à esquerda (Formulário 1)
  },
  messageRight: {
    backgroundColor: '#FFFFF0',
    alignSelf: 'flex-end', // Alinha à direita (Formulário 2)
  },
  messageText: {
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#D2691E',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
