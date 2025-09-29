import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';

export default function DetalhesExercicio({
  nome,
  grupoMuscular,
  nivel,
  fecharModal,
  usuario,
  deletarExercicio,
  id,
}) {
  return (
    <TouchableWithoutFeedback onPress={fecharModal}>
      <View className="bg-black/30 flex-1 items-center justify-center">
        {/* Evita que o toque na caixa interna feche o modal */}
        <TouchableWithoutFeedback>
          <View className="bg-white w-11/12 p-4 rounded-lg">
            <Text>Nome: {nome}</Text>
            <Text>Grupo muscular: {grupoMuscular}</Text>
            <Text>Nível: {nivel}</Text>
            <Text>Cadastrado por: {usuario}</Text>

            <View className=" items-center">
              {/* Botão para cancelar a ficha */}
              <TouchableOpacity
                onPress={fecharModal}
                className="mt-4 px-5 py-3 rounded-lg bg-red-200"
              >
                <Text className="text-center font-medium text-red-500">
                  Cancelar
                </Text>
              </TouchableOpacity>

              {/* Botão para apagar exercicio criado */}
              <TouchableOpacity
                onPress={() => {
                  const exercicio = {
                    id,
                    nome,
                    grupoMuscular,
                    nivel,
                    cadastrado_por: usuario,
                  };
                  deletarExercicio(exercicio);
                  fecharModal();
                }}
                className="mt-4 px-5 py-3 rounded-lg bg-gray"
              >
                <Text className="text-center font-medium text-black">
                  Apagar exercicio
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}
