import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './authentication';

import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const ExerciciosContext = createContext({});

export function ExerciciosProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [exercicios, setExercicios] = useState([]);

  //    Funcao que cadastra um exercicio no banco de dados
  async function criarExercicio(informacoes) {
    //  informacoes é um array
    //  informacoes.grupoMuscular > inferiores, superiores, abdomen
    //  informacoes.nome > nome do exercicio - supino reto
    //  informacoes.nivel > inicante, intermediario, avancado
    await firestore().collection('exercicios').add({
      nome: informacoes.nome,
      nivel: informacoes.nivel,
      grupoMuscular: informacoes.grupoMuscular,
      cadastrado_por: user.nome,
      cadastrado_em: new Date(),
    });
  }

  //    Funcao que apaga um exercicio no banco de dados
  async function deletarExercicio(exercicio) {
    const { id, nome, grupoMuscular, nivel, cadastrado_por } = exercicio;

    await firestore()
      .collection('exercicios')
      .doc(id)
      .delete()
      .then(async () => {
        // Se deu certo, quero adicionar esse exercicio em uma colecao backup
        const docRef = firestore().collection('backup_exercicios').doc(id);
        await docRef.set({
          nome: nome,
          grupoMuscular: grupoMuscular,
          nivel: nivel,
          cadastrado_por: cadastrado_por,
          deletado_em: new Date(),
          deletado_por: user.userID,
        });

        Alert.alert('Sucesso', 'Exercício deletado!');
      })
      .catch(error => {
        Alert.alert('Erro', error.message);
      });
  }

  // Responsavel por ficar "ouvindo" as alterações na coleção "exercicios"
  useEffect(() => {
    const dados = firestore()
      .collection('exercicios')
      .onSnapshot(
        snapshot => {
          let exerciciosEncontrados = snapshot.docs.map(document => {
            const data = document.data(); // pega os campos salvos no doc
            return {
              id: document.id,
              nome: data.nome,
              nivel: data.nivel,
              grupoMuscular: data.grupoMuscular,
              cadastrado_por: data.cadastrado_por,
              cadastrado_em: data.cadastrado_em,
            };
          });
          setExercicios(exerciciosEncontrados);
        },
        error => {
          Alert.alert('Erro', error.message);
        },
      );

    return () => dados();
  }, []);

  return (
    <ExerciciosContext.Provider
      value={{ user, criarExercicio, exercicios, deletarExercicio }}
    >
      {children}
    </ExerciciosContext.Provider>
  );
}
