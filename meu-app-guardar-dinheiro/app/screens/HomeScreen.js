import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [metas, setMetas] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadMetas);
    loadMetas();
    return unsubscribe;
  }, [navigation]);

  const loadMetas = async () => {
    try {
      const saved = await AsyncStorage.getItem('metas');
      setMetas(saved ? JSON.parse(saved) : []);
    } catch (error) {
      console.error('Erro ao carregar metas:', error);
    }
  };

  const renderItem = ({ item, index }) => {
    const progresso = ((item.valorGuardado / item.valorObjetivo) * 100).toFixed(1);
    return (
      <TouchableOpacity
        style={styles.metaItem}
        onPress={() => navigation.navigate('DetalheMeta', { index })}
      >
        <Text style={styles.metaNome}>{item.nome}</Text>
        <Text>{`Guardado: R$ ${item.valorGuardado.toFixed(2)} / R$ ${item.valorObjetivo.toFixed(2)} (${progresso}%)`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Nova Meta" color="#F39C12" onPress={() => navigation.navigate('NovaMeta')} />
      <FlatList data={metas} renderItem={renderItem} keyExtractor={(_, i) => i.toString()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
    padding: 16,
  },
  metaItem: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#FFEED9',
    borderRadius: 5,
  },
  metaNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C2C2C',
  },
});
