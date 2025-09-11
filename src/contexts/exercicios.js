import { createContext, useContext } from 'react';
import { AuthContext } from './authentication';

import firestore from '@react-native-firebase/firestore';

export const ExerciciosContext = createContext({});

export function ExerciciosProvider({ children }) {
  const { user } = useContext(AuthContext);

  //    Funcao que cadastra um exercicio no banco de dados
  async function novoExercicio(informacoes) {
    //  informacoes é um array
    //  informacoes.grupoMuscular > inferiores, superiores, abdomen
    //  informacoes.nome > nome do exercicio - supino reto
    //  informacoes.nivel > inicante, intermediario, avancado
    await firestore()
      .collection('exercicios')
      .doc(informacoes.grupoMuscular)
      .set({
        cadastrado_em: new Date(),
        nome: informacoes.nome,
        nivel: informacoes.nivel,
        cadastrado_por: user.userID,
      });
  }

  //    Funcao que resgata os exericios para mostrar na tela

  return (
    <ExerciciosContext.Provider value={{ user, novoExercicio }}>
      {children}
    </ExerciciosContext.Provider>
  );
}
