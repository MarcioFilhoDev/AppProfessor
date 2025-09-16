import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';

import { RequisicoesContext } from '../../contexts/requisicoes';
import CardRequisicao from '../../components/cardRequisicao';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navegar = useNavigation();
  //  De onde vem os documentos criados
  const { reqs } = useContext(RequisicoesContext);

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4 text-center">
        Requisições de Treino
      </Text>

      {reqs.length === 0 ? (
        <Text className="text-center text-gray-500">
          Nenhuma requisição aguardando
        </Text>
      ) : (
        <FlatList
          data={reqs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CardRequisicao pessoa={item} />}
        />
      )}
    </View>
  );
}
