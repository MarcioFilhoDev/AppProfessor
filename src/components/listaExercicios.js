import { ScrollView, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';

import { ExerciciosContext } from '../contexts/exercicios';

export default function ListaExercicios({ exercicioEscolhido }) {
  const { exercicios } = useContext(ExerciciosContext);

  return (
    <ScrollView className="bg-red-500 flex-1 h-20">
      {exercicios.map(item => {
        return (
          <TouchableOpacity
            onPress={() => exercicioEscolhido(item.nome)}
            key={item.id}
          >
            <Text>{item.nome}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
