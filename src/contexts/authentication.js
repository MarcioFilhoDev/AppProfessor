import { createContext, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function cadastro(email, password, nome) {
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
            // Enviar para AsyncStorage
          })
          .catch(error => {
            if (error.message === 'auth/invalid-email') {
              Alert.alert('E-mail inválido', 'Insira um e-mail válido');
            }
            Alert.alert('Error', error.message);
          });
      });
  }

  async function login(email, password) {
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
        // Adicionar o AsyncStorage
      })
      .catch(error => Alert.alert('Erro', error.messsage));
  }

  return (
    <AuthContext.Provider value={{ cadastro, login, userSigned: !!user, user }}>
      {children}
    </AuthContext.Provider>
  );
}
