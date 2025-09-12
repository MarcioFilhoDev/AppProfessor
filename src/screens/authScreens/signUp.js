import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/authentication';

export default function SignUp() {
  const { cadastro } = useContext(AuthContext);

  const navegar = useNavigation();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSignup() {
    if (!nome || !sobrenome || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha os campos corretamente.');
      return;
    } else if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const nomeReal = nome + ' ' + sobrenome;
    cadastro(email, password, nomeReal);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        keyboardShouldPersistTaps="handled"
      >
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
                    value={nome}
                    onChangeText={text => setNome(text)}
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-base text-secondary mb-1">
                    Sobrenome
                  </Text>
                  <TextInput
                    className="w-full bg-white border border-gray rounded-lg p-4"
                    placeholder="Sobrenome"
                    placeholderTextColor="#A0A0A0"
                    value={sobrenome}
                    onChangeText={text => setSobrenome(text)}
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
                  onChangeText={text => setEmail(text)}
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
                  onChangeText={text => setPassword(text)}
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
                  onChangeText={text => setConfirmPassword(text)}
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
              <TouchableOpacity
                onPress={() => navegar.goBack()}
                className="mt-2"
              >
                <Text className="text-secondary text-center text-base">
                  Já possui uma conta?{' '}
                  <Text className="italic underline">Faça login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
