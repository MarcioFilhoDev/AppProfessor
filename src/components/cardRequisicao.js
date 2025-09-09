import { Text, View } from 'react-native';
import React from 'react';

export default function CardRequisicao({ pessoa }) {
  return (
    <View className="flex-1 items-center bg-red-500">
      <Text>Nome: {pessoa.nome}</Text>
    </View>
  );
}
