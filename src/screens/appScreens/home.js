import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import React, { useContext } from 'react';

import { RequisicoesContext } from '../../contexts/requisicoesContext';
import CardAluno from '../../components/cardRequisicao';
import { colors } from '../../constants/colors';

export default function Home() {
  const { reqs, loading } = useContext(RequisicoesContext);

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4 text-center">
        Requisições de Treino
      </Text>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={34} color={colors.secondary} />
          <Text className="text-secondary text-lg">Carregando informações</Text>
        </View>
      ) : reqs.length === 0 ? (
        <Text className="text-center text-gray-500">
          Nenhuma requisição aguardando
        </Text>
      ) : (
        <FlatList
          data={reqs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CardAluno pessoa={item} />}
        />
      )}
    </View>
  );
}
