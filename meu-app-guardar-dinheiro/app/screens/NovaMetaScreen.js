import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NovaMetaScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

  const salvarMeta = async () => {
    if (!nome || !valor || isNaN(parseFloat(valor))) {
      alert('Preencha todos os campos corretamente.');
      return;
    }
    try {
      const novaMeta = { nome, valorObjetivo: parseFloat(valor), valorGuardado: 0 };
      const saved = await AsyncStorage.getItem('metas');
      const metas = saved ? JSON.parse(saved) : [];
      metas.push(novaMeta);
      await AsyncStorage.setItem('metas', JSON.stringify(metas));
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar meta:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nome da Meta:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <Text>Valor Objetivo (R$):</Text>
      <TextInput style={styles.input} value={valor} onChangeText={setValor} keyboardType="numeric" />
      <Button title="Salvar" color="#F39C12" onPress={salvarMeta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F39C12',
    padding: 8,
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: '#FFEED9',
  },
});
