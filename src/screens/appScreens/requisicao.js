import { View, Text } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

export default function Requisicao() {
  const route = useRoute();
  const { pessoa } = route.params; // resgata os dados enviados

  /*
    Ideia: professor acessa a requisicao do aluno, 
    preenche um formulario, inserindo os dados do treino,
    e envia para o banco de dados
  */

  return (
    <View className="p-4 m-2 border rounded bg-gray-100 w-64">
      <Text className="text-lg font-bold">Nome: {pessoa.nome}</Text>
      <Text>Idade: {pessoa.idade}</Text>

      {pessoa.treinos && pessoa.treinos.length > 0 && (
        <View className="mt-2">
          <Text className="font-bold">Treinos:</Text>
          {pessoa.treinos.map((treino, index) => (
            <View key={index} className="ml-2 mt-1">
              <Text>Treino: {treino.nome}</Text>
              {treino.exercicios.map((exercicio, i) => (
                <Text key={i} className="ml-2">
                  {exercicio.nome} - {exercicio.series}x{exercicio.repeticoes}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
