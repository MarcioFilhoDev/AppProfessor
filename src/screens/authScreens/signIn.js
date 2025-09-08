import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const navegar = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', email, password);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      touchSoundDisabled
    >
      <View className="flex-1 justify-center items-center bg-lightGray w-full">
        <View className="w-4/5 gap-4">
          <Text className="text-3xl font-bold text-secondary mb-8">
            AcademiaApp
          </Text>

          {/* E-mail */}
          <View>
            <Text className="text-xl text-secondary font-medium">E-mail</Text>
            <TextInput
              className="w-full bg-white border border-gray rounded-lg p-4"
              placeholder="E-mail"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          {/* Senha */}
          <View>
            <Text className="text-xl text-secondary font-medium">Senha</Text>
            <TextInput
              className="w-full bg-white border border-gray rounded-lg p-4"
              placeholder="Senha"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>

          {/* Botão aceesar */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-full bg-primary rounded-lg py-4 elevation"
            onPress={handleLogin}
          >
            <Text className="text-white text-center font-bold text-xl">
              Acessar
            </Text>
          </TouchableOpacity>

          {/* Botão criar conta */}
          <TouchableOpacity onPress={() => navegar.navigate('SignUp')}>
            <Text className="text-secondary text-center text-base">
              Não possui uma conta?{' '}
              <Text className="italic underline">Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
