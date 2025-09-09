import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';

export default function Home() {
  const navegar = useNavigation();

  // Esses dados virão do Firestore
  // Acessar coleção user_treinos_config -> mapear e renderizar os documentos
  const especificacoes = [
    {
      id: 1,
      nome: 'Marcio',
      idade: 22,
      treinos: [
        {
          nome: 'A',
          exercicios: [
            {
              nome: 'Supino reto',
              repeticoes: 12,
              series: 4,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      nome: 'Lara',
      idade: 18,
    },
  ];

  return (
    <View className="flex-1 justify-center items-center gap-4">
      {especificacoes.map(item => (
        <TouchableOpacity
          className="bg-gray w-4/5 p-4 rounded"
          key={item.id}
          onPress={() => navegar.navigate('Requisicao', { pessoa: item })} // envia os dados
        >
          <Lucide name="user" size={30} />
          <Text>{item.nome}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
