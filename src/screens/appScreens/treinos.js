import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
} from 'react-native';
import { useContext, useState } from 'react';

import { ExerciciosContext } from '../../contexts/exercicios';

import FormNovoExercicio from '../../components/formNovoExercicio';
import DetalhesExercicio from '../../components/detalhesExercicio';

export default function Treinos() {
  const { exercicios, deletarExercicio } = useContext(ExerciciosContext);

  const [statusModal, setStatusModal] = useState(false);
  const [exercicioSelecionado, setExercicioSelecionado] = useState(null);

  function abrindoModal(item) {
    setExercicioSelecionado(item);
    setStatusModal(true);
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      touchSoundDisabled
    >
      <View className="flex-1 gap-4">
        {/* Formulario para cadastrar novo exercicio */}
        <FormNovoExercicio />

        <View className="items-center w-full px-4">
          <View className="bg-black/20 w-full h-0.5 rounded-xl" />
        </View>

        {/* Lista de exercicios */}
        <ScrollView className="flex-1 bg-gray-100">
          <View className="w-full items-center">
            <View className="w-11/12 rounded-md">
              <View className="flex-row bg-primary rounded-t-md">
                <Text className="flex-1 text-white text-base font-bold text-center py-2 border-r border-orange-300">
                  Exercícios
                </Text>
                <Text className="flex-1 text-white text-base font-bold text-center py-2 border-r border-orange-300">
                  Grupo Muscular
                </Text>
                <Text className="flex-1 text-white text-base font-bold text-center py-2 border-orange-300">
                  Nível
                </Text>
              </View>

              {exercicios.map(item => (
                // Quando pressionar um botão abre um modal com as informacoes
                // Sendo possivel deletar ou editar os dados
                <TouchableOpacity
                  onPress={() => abrindoModal(item)}
                  activeOpacity={0.5}
                  key={item.id}
                  className="flex-row items-stretch bg-white elevation border-b border-orange-400 rounded-b-md"
                >
                  <Text className="flex-1 text-secondary text-center py-2 border-r border-orange-400 self-stretch">
                    {item.nome}
                  </Text>

                  <Text className="flex-1 text-secondary text-center py-2 border-r border-orange-400 self-stretch">
                    {item.grupoMuscular}
                  </Text>

                  <Text className="flex-1 text-secondary text-center py-2 self-stretch">
                    {item.nivel}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <Modal visible={statusModal} animationType="slide" transparent={true}>
          {exercicioSelecionado && (
            <DetalhesExercicio
              fecharModal={() => setStatusModal(false)}
              nome={exercicioSelecionado.nome}
              grupoMuscular={exercicioSelecionado.grupoMuscular}
              nivel={exercicioSelecionado.nivel}
              usuario={exercicioSelecionado.cadastrado_por}
              id={exercicioSelecionado.id}
              deletarExercicio={deletarExercicio}
            />
          )}
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}
