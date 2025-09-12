import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';

import { ExerciciosContext } from '../contexts/exercicios';
import { colors } from '../constants/colors';

export default function FormNovoExercicio() {
  const { criarExercicio } = useContext(ExerciciosContext);

  let niveis = [
    {
      nivel: 1,
      classificacao: 'Iniciante',
    },
    {
      nivel: 2,
      classificacao: 'Intermediário',
    },
    {
      nivel: 3,
      classificacao: 'Avançado',
    },
    {
      nivel: 4,
      classificacao: 'Profissional',
    },
  ];

  const [nomeExercicio, setNomeExercicio] = useState('');

  const [grupoMuscular, setGrupoMuscular] = useState('');

  const [nivel, setNivel] = useState(null);

  // Salva o exercicio realizado pelo professor
  function salvandoExercicio() {
    // Verifica se os "campos" estão preenchidos
    if (!nomeExercicio || !grupoMuscular || !nivel) {
      Alert.alert('Erro', 'Preencha corretamente os campos.');
      return;
    }

    // Cria-se um objeto para armazenar os dados
    let dados = {
      nome: nomeExercicio,
      grupoMuscular: grupoMuscular,
      nivel: nivel,
    };

    // Chama a função que cadastra no banco de dados o exercicio
    criarExercicio(dados);
    // Reseta os campos
    setGrupoMuscular('');
    setNomeExercicio('');
    setNivel('');
  }

  return (
    <View className="flex-1 items-center w-full ">
      <View className="w-4/5 h-full justify-end gap-6">
        <Text className="text-center text-lg">Criando um novo exercício</Text>
        {/* Definindo o nome do exercicio */}
        <View className="flex-row items-center w-full gap-2 ">
          <Text>Nome do exercicio: </Text>
          <TextInput
            placeholder="Ex: supino reto"
            placeholderTextColor={'#7a7b7d'}
            className="bg-white flex-1 elevation rounded p-2"
            maxLength={50}
            value={nomeExercicio}
            onChangeText={text => setNomeExercicio(text)}
          />
        </View>

        {/* Definindo grupo muscular */}
        <View className="flex-col  w-full gap-2">
          <Text>Selecione o grupo muscular: </Text>

          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={() => setGrupoMuscular('Inferiores')}
              className={`bg-white flex-1 items-center elevation rounded p-2 border-2 ${
                grupoMuscular === 'Inferiores'
                  ? 'border-primary'
                  : 'border-white'
              }`}
            >
              <Text>Inferiroes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setGrupoMuscular('Superiores')}
              className={`bg-white flex-1 items-center elevation rounded p-2 border-2 ${
                grupoMuscular === 'Superiores'
                  ? 'border-primary'
                  : 'border-white'
              }`}
            >
              <Text>Superiores</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setGrupoMuscular('Abdomen')}
              className={`bg-white flex-1 items-center elevation rounded p-2 border-2 ${
                grupoMuscular === 'Abdomen' ? 'border-primary' : 'border-white'
              }`}
            >
              <Text>Abdomen</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Definindo nivel do exercicio */}
        <View className="flex-row justify-between">
          {niveis.map(item => {
            return (
              <View key={item.nivel} className="items-center gap-1.5">
                <TouchableOpacity
                  onPress={() => setNivel(item.classificacao)}
                  className={`bg-white items-center elevation rounded-lg px-6 py-4 border-2 ${
                    nivel === item.classificacao
                      ? 'border-primary'
                      : 'border-white'
                  }`}
                >
                  <Text className="font-medium">{item.nivel}</Text>
                </TouchableOpacity>

                <Text>{item.classificacao}</Text>
              </View>
            );
          })}
        </View>

        {/* Botão para salvar exercicio */}
        <View className="items-center">
          <TouchableOpacity
            onPress={salvandoExercicio}
            className="bg-primary items-center w-1/2 p-3.5 rounded-lg elevation"
          >
            <Text className="font-medium text-white">Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
