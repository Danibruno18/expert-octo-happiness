import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalheMetaScreen({ route, navigation }) {
  const { index } = route.params;
  const [meta, setMeta] = useState(null);
  const [deposito, setDeposito] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadMeta);
    loadMeta();
    return unsubscribe;
  }, [navigation]);

  const loadMeta = async () => {
    try {
      const saved = await AsyncStorage.getItem('metas');
      if (saved) {
        const metas = JSON.parse(saved);
        setMeta(metas[index]);
      }
    } catch (error) {
      console.error('Erro ao carregar meta:', error);
    }
  };

  const adicionarDeposito = async () => {
    if (!deposito || isNaN(parseFloat(deposito))) {
      alert('Informe um valor válido para depósito.');
      return;
    }
    try {
      const saved = await AsyncStorage.getItem('metas');
      const metas = saved ? JSON.parse(saved) : [];
      metas[index].valorGuardado += parseFloat(deposito);
      await AsyncStorage.setItem('metas', JSON.stringify(metas));
      setDeposito('');
      loadMeta();
    } catch (error) {
      console.error('Erro ao adicionar depósito:', error);
    }
  };

  if (!meta) return <Text>Carregando...</Text>;

  const progresso = ((meta.valorGuardado / meta.valorObjetivo) * 100).toFixed(1);

  return (
    <View style={styles.container}>
      <Text style={styles.metaNome}>{meta.nome}</Text>
      <Text>{`Guardado: R$ ${meta.valorGuardado.toFixed(2)} / R$ ${meta.valorObjetivo.toFixed(2)}`}</Text>
      <Text>{`Progresso: ${progresso}%`}</Text>
      <Text>Adicionar depósito (R$):</Text>
      <TextInput
        style={styles.input}
        value={deposito}
        onChangeText={setDeposito}
        keyboardType="numeric"
      />
      <Button title="Salvar Depósito" color="#F39C12" onPress={adicionarDeposito} />
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
  metaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
