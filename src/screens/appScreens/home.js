import { Text, View } from 'react-native';
import React from 'react';

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-center">
        Tela que terá um card em baixo com as listas dos alunos que solicitaram
        treinos
      </Text>
    </View>
  );
}
