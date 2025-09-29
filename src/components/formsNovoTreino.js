import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import Lucide from '@react-native-vector-icons/lucide';
import { colors } from '../constants/colors';

import firestore from '@react-native-firebase/firestore';

import { ExerciciosContext } from '../contexts/exercicios';
import { RequisicoesContext } from '../contexts/requisicoesContext';

export default function FormularioNovoTreino({ idAluno }) {
  const { fichasTemporarias } = useContext(RequisicoesContext);
  const { exercicios } = useContext(ExerciciosContext);

  const [nomeFicha, setNomeFicha] = useState('');
  const [fichas, setFichas] = useState([]);
  const [novaFicha, setNovaFicha] = useState(false);
  const [exerciciosDaFicha, setExerciciosDaFicha] = useState([]);
  const [exercicioEscolhido, setExercicioEscolhido] = useState(null);
  const [series, setSeries] = useState(0);
  const [repeticoes, setRepeticoes] = useState(0);

  function iniciarNovaFicha() {
    setNovaFicha(true);
    setExerciciosDaFicha([]);
    setExercicioEscolhido(null);
    setSeries('');
    setRepeticoes('');
  }

  function adicionarExercicio() {
    if (!exercicioEscolhido || !series || !repeticoes) {
      Alert.alert(
        'Existem campos não preenchidos',
        'Por favor, preencha corretamente os campos.',
      );
      return;
    }

    setExerciciosDaFicha([
      ...exerciciosDaFicha,
      { nome: exercicioEscolhido, series, repeticoes },
    ]);

    setExercicioEscolhido(null);
    setSeries('');
    setRepeticoes('');
  }

  function finalizarFicha() {
    //  Verifica se tem algum exercicio na ficha de treinos
    if (exerciciosDaFicha.length === 0) {
      Alert.alert(
        'Nenhum exercício adicionado',
        'Insira ao menos 1 exercício.',
      );
      return;
    }

    //  Armazenando as fichas
    const novasFichas = [
      ...fichas,
      {
        nome: nomeFicha,
        exercicios: exerciciosDaFicha,
      },
    ];

    setFichas(novasFichas);
    setNovaFicha(false);
    setExerciciosDaFicha([]);
    setNomeFicha('');

    //  Chama a funcao para salvar as fichas temporarias
    fichasTemporarias(novasFichas, idAluno);
  }

  //  Busca as fichas de treino temporarias para o aluno que fez a requisicao
  useEffect(() => {
    async function carregarFichas() {
      const docRef = await firestore()
        .collection('fichas_temporarias')
        .doc(idAluno)
        .get();

      if (docRef.exists) {
        const data = docRef.data();
        setFichas(data.fichas || []); // 👈 já popula suas fichas salvas
      }
    }

    if (idAluno) {
      carregarFichas();
    }
  }, [idAluno]);

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      touchSoundDisabled={true}
    >
      <View className="flex-1">
        {!novaFicha && (
          <TouchableOpacity
            onPress={iniciarNovaFicha}
            className="p-3 bg-secondary rounded-md mb-3 elevation"
          >
            <Text className="text-white font-semibold text-center">
              Iniciar
            </Text>
          </TouchableOpacity>
        )}
        {novaFicha && (
          <View className="gap-2">
            {/* Inserindo nome da ficha */}
            <View className="p-2 border-2 border-gray/45 elevation-sm bg-white rounded-md">
              <Text className="font-bold text-lg">Nome da ficha: </Text>

              <TextInput
                className="p-2 border-2 border-gray/35 rounded-md"
                maxLength={35}
                value={nomeFicha}
                onChangeText={text => setNomeFicha(text)}
                placeholder="Treino A ou Treino de Inferiores"
                placeholderTextColor={colors.gray}
              />
            </View>

            <Text className="font-bold text-lg">Exercícios</Text>

            {/* Lista com os exercícios cadastrados no banco de dados */}
            <ScrollView className="max-h-32 border-2 border-gray/45 elevation-sm rounded-md">
              {exercicios.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setExercicioEscolhido(item.nome)}
                  style={{
                    backgroundColor:
                      exercicioEscolhido === item.nome ? '#a3cef1' : '#fff',
                  }}
                  className={`p-2.5`}
                >
                  <Text className="text-dark">{item.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Definindo a quantidade de series e repeticoes */}
            <View className="flex-row justify-between">
              {/* Numero de series */}
              <View className="border-2 border-gray/60 bg-white elevation-sm rounded-md p-2">
                <Text className="text-center">Número séries</Text>

                <View className="flex-row items-center gap-4">
                  {/* Botao de menos */}
                  <TouchableOpacity
                    onPress={() => setSeries(prev => Math.max(0, prev - 1))}
                    className="bg-slate-300 rounded-full"
                  >
                    <Lucide name="minus" size={24} color={colors.dark} />
                  </TouchableOpacity>

                  <TextInput
                    placeholder="0"
                    placeholderTextColor={colors.secondary}
                    editable={false}
                    value={String(series)}
                    className="text-xl px-5 rounded-full bg-white elevation font-bold"
                  />

                  {/* Botao de mais */}
                  <TouchableOpacity
                    onPress={() => setSeries(prev => Math.max(0, prev + 1))}
                    className="bg-slate-300 rounded-full"
                  >
                    <Lucide name="plus" size={24} color={colors.dark} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Numero de repeticoes */}
              <View className="border-2 border-gray/60 bg-white elevation-sm rounded-md p-2">
                <Text className="text-center">Número repetições</Text>

                <View className="flex-row items-center gap-4">
                  {/* Botao de menos */}
                  <TouchableOpacity
                    onPress={() => setRepeticoes(prev => Math.max(0, prev - 1))}
                    className="bg-slate-300 rounded-full"
                  >
                    <Lucide name="minus" size={24} color={colors.dark} />
                  </TouchableOpacity>

                  <TextInput
                    placeholder="0"
                    editable={false}
                    value={String(repeticoes)}
                    className="text-xl px-5 rounded-full bg-white elevation font-bold"
                  />

                  {/* Botao de mais */}
                  <TouchableOpacity
                    onPress={() => setRepeticoes(prev => Math.max(0, prev + 1))}
                    className="bg-slate-300 rounded-full"
                  >
                    <Lucide name="plus" size={24} color={colors.dark} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Botao para adicionar exercício */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={adicionarExercicio}
              className="bg-green-600 p-2.5 rounded-md elevation-sm mt-2"
            >
              <Text className="text-white font-bold text-center">
                Adicionar Exercício
              </Text>
            </TouchableOpacity>

            {/* Lista de exercícios adicionados */}
            <Text className="font-bold mb-1">Exercícios da Ficha:</Text>
            {exerciciosDaFicha.length === 0 && (
              <Text>Nenhum exercício adicionado ainda.</Text>
            )}
            {exerciciosDaFicha.map((ex, idx) => (
              <Text key={idx}>
                {ex.nome} - {ex.series} x {ex.repeticoes}
              </Text>
            ))}

            {/*  Botoes de ação */}
            <View className="flex-1 flex-row-reverse gap-4">
              {/* Botão finalizar ficha */}
              <TouchableOpacity
                onPress={finalizarFicha}
                className="bg-secondary p-3 rounded elevation flex-1"
              >
                <Text className="text-white text-center">Gravar dados</Text>
              </TouchableOpacity>

              {/* Botao para cancelar */}
              <TouchableOpacity
                onPress={() => setNovaFicha(false)}
                className="bg-red-300 p-3 rounded elevation flex-1"
              >
                <Text className="text-center font-medium">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {novaFicha ? (
          <View />
        ) : (
          <View className="mt-4">
            <Text className="font-bold">Fichas Salvas:</Text>
            {fichas.map((ficha, i) => (
              <View key={i} className="border-2 border-gray/45 p-2">
                <Text className="font-bold">{ficha.nome}</Text>
                {ficha.exercicios.map((ex, idx) => (
                  <Text key={idx}>
                    {ex.nome} - {ex.series} x {ex.repeticoes}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
