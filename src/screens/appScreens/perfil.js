import { Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authentication';

export default function Perfil() {
  const { logout } = useContext(AuthContext);

  async function deslogandoUsuario() {
    await logout();
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Tela do perfil</Text>

      <TouchableOpacity onPress={deslogandoUsuario}>
        <Text>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}
