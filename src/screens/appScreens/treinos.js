import { useContext, useState } from 'react';
import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ExerciciosContext } from '../../contexts/exercicios';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../constants/colors';

export default function Treinos() {
  const { novoExercicio } = useContext(ExerciciosContext);

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

  const [grupoMuscular, setGrupoMuscular] = useState('');

  const [nomeExercicio, setNomeExercicio] = useState('');

  const [nivel, setNivel] = useState(null);

  function salvandoExercicio() {
    if (!nomeExercicio || !grupoMuscular || !nivel) {
      Alert.alert('Erro', 'Preencha corretamente os campos.');
      return;
    }

    let dados = {
      nome: nomeExercicio,
      grupoMuscular: grupoMuscular,
      nivel: nivel,
    };

    // Alert.alert(
    //   'Salvo',
    //   `${dados.nome} - ${dados.grupoMuscular} - Nivel: ${dados.nivel}`,
    // );

    novoExercicio(dados);
    setGrupoMuscular('');
    setNomeExercicio('');
    setNivel('');
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      touchSoundDisabled
    >
      <View className="flex-1 justify-center items-center w-full">
        <View className="w-4/5 gap-6">
          {/* Digitando nome */}
          <View className="flex-row items-center w-full gap-2">
            <Text>Nome do exercicio: </Text>
            <TextInput
              placeholder="Ex: supino reto"
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
                onPress={() => setGrupoMuscular('inferiores')}
                className={`bg-white flex-1 items-center elevation rounded p-2 border-2 ${
                  grupoMuscular === 'inferiores'
                    ? 'border-primary'
                    : 'border-white'
                }`}
              >
                <Text>Inferiroes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setGrupoMuscular('superiores')}
                className={`bg-white flex-1 items-center elevation rounded p-2 border-2 ${
                  grupoMuscular === 'superiores'
                    ? 'border-primary'
                    : 'border-white'
                }`}
              >
                <Text>Superiores</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setGrupoMuscular('abdomen')}
                className={`bg-white flex-1 items-center elevation rounded p-2 border-2 ${
                  grupoMuscular === 'abdomen'
                    ? 'border-primary'
                    : 'border-white'
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
                <View className="items-center gap-1.5">
                  <TouchableOpacity
                    onPress={() => setNivel(item.classificacao)}
                    className={`bg-white items-center elevation rounded-lg py-4 px-6 border-2 ${
                      nivel === item.classificacao
                        ? 'border-primary'
                        : 'border-white'
                    }`}
                  >
                    <Text>{item.nivel}</Text>
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
    </TouchableWithoutFeedback>
  );
}
