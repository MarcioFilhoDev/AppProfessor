import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Lucide from '@react-native-vector-icons/lucide';
import { useNavigation } from '@react-navigation/native';

export default function CardAluno({ pessoa }) {
  const navegar = useNavigation();

  return (
    <View className="w-full flex-row items-center justify-between bg-secondary rounded-full px-3 p-1.5 mb-3">
      <View className="flex-row items-center gap-3">
        <View className="bg-gray p-1 rounded-full">
          <Lucide name="user" size={28} color={'#fff'} />
        </View>
        <Text className="text-white text-xl font-bold">{pessoa.aluno}</Text>
      </View>

      <TouchableOpacity
        onPress={() => navegar.navigate('Requisicao', { pessoa })}
        className="bg-green-600 px-3 py-2 rounded-full"
      >
        <Text className="text-white text-base font-bold">Novo treino</Text>
      </TouchableOpacity>
    </View>
  );
}
