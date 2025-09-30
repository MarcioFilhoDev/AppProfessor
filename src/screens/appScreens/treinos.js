import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  KeyboardAvoidingView,
  Platform,
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
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="h-3/4 gap-4">
          {/* Formulário */}
          <View className="flex-1 mt-4">
            <FormNovoExercicio />
          </View>

          <View className="items-center w-full px-4">
            <View className="bg-black/20 w-full h-0.5 rounded-xl" />
          </View>

          {/* Tabela */}
          <View className="px-4">
            <View className="w-full bg-gray-100 rounded-md overflow-hidden">
              {/* Cabeçalho da tabela */}
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

              {/* Lista de exercicios criados */}
              <ScrollView>
                {exercicios.map(item => (
                  <TouchableOpacity
                    onPress={() => abrindoModal(item)}
                    activeOpacity={0.5}
                    key={item.id}
                    className="flex-row items-stretch bg-white elevation border-b border-orange-400"
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
              </ScrollView>
            </View>
          </View>

          {/* Modal com detalhes */}
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
