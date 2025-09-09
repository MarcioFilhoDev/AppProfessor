import { Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authentication';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <View>
      <Text>{user.nome}</Text>
    </View>
  );
}
