import { Text, ScrollView, View } from 'react-native';
import React from 'react';

import FormularioNovoTreino from '../../components/formularioNovoTreino';

export default function Requisicao({ route }) {
  const { pessoa } = route.params;

  return (
    <ScrollView className="flex-1 p-4">
      <View className="bg-neutral-50 rounded-md p-4 gap-1.5 elevation">
        {/* Nome do aluno */}
        <Text className="text-xl font-bold">
          Solicitação de treino:{' '}
          <Text className="font-normal">{pessoa.aluno}</Text>
        </Text>

        {/* Objetivo do aluno */}
        <Text className="text-lg font-semibold">
          Objetivo: <Text className="font-normal">{pessoa.objetivo}</Text>
        </Text>

        {/* Dor e descricao da dor */}
        <Text className="text-lg font-semibold">
          Possui dor? <Text className="font-normal">{pessoa.possui_dor}</Text>
        </Text>

        {/* Quantidade de treinos */}
        <Text className="text-lg font-semibold">
          Quantidade de treinos:{' '}
          <Text className="font-normal">{pessoa.quantidade_treinos}</Text>
        </Text>
      </View>

      {/* Formulario */}
      <FormularioNovoTreino />
    </ScrollView>
  );
}
