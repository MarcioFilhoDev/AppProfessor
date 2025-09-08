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

export default function SignUp() {
  const navegar = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    console.log(
      'Cadastro:',
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      touchSoundDisabled
    >
      <View className="flex-1 bg-lightGray px-6 justify-center items-center w-full">
        <View className="w-4/5 gap-4">
          <Text className="text-3xl font-bold text-secondary text-center">
            Cadastrar-se
          </Text>

          {/* Nome e Sobrenome */}
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-base text-secondary mb-1">Nome</Text>
              <TextInput
                className="w-full bg-white border border-gray rounded-lg p-4"
                placeholder="Nome"
                placeholderTextColor="#A0A0A0"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View className="flex-1">
              <Text className="text-base text-secondary mb-1">Sobrenome</Text>
              <TextInput
                className="w-full bg-white border border-gray rounded-lg p-4"
                placeholder="Sobrenome"
                placeholderTextColor="#A0A0A0"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          {/* Email */}
          <View>
            <Text className="text-base text-secondary mb-1">E-mail</Text>
            <TextInput
              className="w-full bg-white border border-gray rounded-lg p-4"
              placeholder="E-mail"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Senha */}
          <View>
            <Text className="text-base text-secondary mb-1">Senha</Text>
            <TextInput
              className="w-full bg-white border border-gray rounded-lg p-4"
              placeholder="Senha"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Confirmar senha */}
          <View>
            <Text className="text-base text-secondary mb-1">
              Confirmar senha
            </Text>
            <TextInput
              className="w-full bg-white border border-gray rounded-lg p-4"
              placeholder="Confirmar senha"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Botão cadastrar */}
          <TouchableOpacity
            className="w-full bg-primary rounded-lg py-4 elevation"
            onPress={handleSignup}
          >
            <Text className="text-white text-center font-bold text-xl">
              Cadastrar
            </Text>
          </TouchableOpacity>

          {/* Botão login */}
          <TouchableOpacity onPress={() => navegar.goBack()} className="mt-2">
            <Text className="text-secondary text-center text-base">
              Já possui uma conta?{' '}
              <Text className="italic underline">Faça login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
