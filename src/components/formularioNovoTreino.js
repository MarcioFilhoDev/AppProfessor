import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useContext, useState } from 'react';

import { ExerciciosContext } from '../contexts/exercicios';
import Lucide from '@react-native-vector-icons/lucide';
import { colors } from '../constants/colors';

export default function FormularioNovoTreino() {
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
    if (!exercicioEscolhido || !series || !repeticoes) return;

    setExerciciosDaFicha([
      ...exerciciosDaFicha,
      { nome: exercicioEscolhido, series, repeticoes },
    ]);

    setExercicioEscolhido(null);
    setSeries('');
    setRepeticoes('');
  }

  function finalizarFicha() {
    if (exerciciosDaFicha.length === 0) return;

    setFichas([...fichas, exerciciosDaFicha]);
    setNovaFicha(false);
    setExerciciosDaFicha([]);
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      touchSoundDisabled={true}
    >
      <View className="flex-1 mt-4">
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
          <View className="p-2">
            <View className="p-2 border-2 border-gray/45 rounded-md mb-2">
              <Text className="font-bold text-lg">Nome da ficha: </Text>

              <TextInput
                className="bg-white p-2 elevation rounded"
                maxLength={35}
                value={nomeFicha}
                onChangeText={text => setNomeFicha(text)}
                placeholder="Treino A ou Treino de Inferiores"
                placeholderTextColor={colors.gray}
              />
            </View>

            <Text className="font-bold text-lg mb-2">Exercícios</Text>

            {/* Lista com os exercícios cadastrados no banco de dados */}
            <ScrollView className="max-h-32 border-2 border-gray/45 rounded-md mb-2">
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
                  <Text>{item.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Definindo a quantidade de series e repeticoes */}
            <View className="flex-row justify-between mb-2">
              {/* Numero de series */}
              <View className="border-2 border-gray/60 rounded-md p-2">
                <Text className="text-center">Número séries</Text>

                <View className="flex-row items-center gap-4">
                  {/* Botao de menos */}
                  <TouchableOpacity
                    onPress={() => setSeries(prev => Math.max(0, prev - 1))}
                    className="bg-slate-300 rounded-full"
                  >
                    <Lucide name="minus" size={24} color={colors.secondary} />
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
                    <Lucide name="plus" size={24} color={colors.secondary} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Numero de repeticoes */}
              <View className="border-2 border-gray/60 rounded-md p-2">
                <Text className="text-center">Número repetições</Text>

                <View className="flex-row items-center gap-4">
                  {/* Botao de menos */}
                  <TouchableOpacity
                    onPress={() => setRepeticoes(prev => Math.max(0, prev - 1))}
                    className="bg-slate-300 rounded-full"
                  >
                    <Lucide name="minus" size={24} color={colors.secondary} />
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
                    <Lucide name="plus" size={24} color={colors.secondary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Botão adicionar exercício */}
            <TouchableOpacity
              onPress={adicionarExercicio}
              className="bg-green-600 p-2.5 rounded-md mb-2"
            >
              <Text className="text-white text-center">
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

            {/* Botão finalizar ficha */}
            <TouchableOpacity
              onPress={finalizarFicha}
              className="bg-secondary p-2.5 rounded-md mt-2"
            >
              <Text className="text-white text-center">
                Gravar dados da ficha
              </Text>
            </TouchableOpacity>

            {/* Botao para cancelar */}
            <TouchableOpacity
              onPress={() => setNovaFicha(false)}
              className="bg-red-300 p-3 rounded elevation"
            >
              <Text className="text-center font-medium">Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}

        {novaFicha ? (
          <View />
        ) : (
          <View className="mt-4">
            <Text className="font-bold mb-2">Fichas Salvas:</Text>
            {fichas.map((ficha, i) => (
              <View key={i} className="border-2 border-gray/45 p-2 mb-2">
                <Text className="font-bold">Ficha {i + 1}</Text>
                {ficha.map((ex, idx) => (
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
