import { ActivityIndicator, Alert, View } from 'react-native';
import { createContext, useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscando usuario salvo
    async function loadStorage() {
      try {
        const data_user = await AsyncStorage.getItem('@userCredentials');

        // Verificando se existe alguma informacao salva
        if (data_user) {
          setUser(JSON.parse(data_user));
          setLoading(false);
        }
      } catch (error) {
        Alert.alert('Error ao carregar dados do usuário', error.message);
      } finally {
        setLoading(false);
      }
    }
    loadStorage();
  }, []);

  // Armazenando usuarios
  async function armazenandoUser(data) {
    await AsyncStorage.setItem('@userCredentials', JSON.stringify(data));
  }

  async function removendoUser() {
    await AsyncStorage.removeItem('@userCredentials');
  }

  // Cadastro
  async function cadastro(email, password, nome) {
    setLoading(true);
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async values => {
        let uid = values.user.uid;

        await firestore()
          .collection('professores')
          .doc(uid)
          .set({
            nome: nome,
            email: values.user.email,
            cadastrado_em: new Date(),
          })

          .then(() => {
            let data = {
              userID: uid,
              nome: nome,
              email: values.user.email,
            };

            setUser(data);
            armazenandoUser(data);
            setLoading(false);
            // Enviar para AsyncStorage
          })
          .catch(error => {
            if (error.message === 'auth/invalid-email') {
              Alert.alert('E-mail inválido', 'Insira um e-mail válido');
            }
            setLoading(false);
            Alert.alert('Error', error.message);
          });
      });
  }

  // Login
  async function login(email, password) {
    setLoading(true);
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async values => {
        let uid = values.user.uid;

        const response = await firestore()
          .collection('professores')
          .doc(uid)
          .get();

        let data = {
          userID: uid,
          nome: response.data().nome,
          email: response.data().email,
        };

        setUser(data);
        armazenandoUser(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Erro', error.messsage);
      });
  }

  // Logout
  async function logout() {
    setLoading(true);
    await auth()
      .signOut()
      .then(() => {
        setUser(null);
        removendoUser();
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Erro', error.message);
        return;
      });
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={48} className="text-primary" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{ cadastro, login, logout, userSigned: !!user, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
