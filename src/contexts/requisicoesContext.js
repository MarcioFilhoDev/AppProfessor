import { createContext, useCallback, useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export const RequisicoesContext = createContext({});

export function RequsicaoProvider({ children }) {
  //  Variavel para armazenar as requisicoes
  const [reqs, setReqs] = useState([]);

  const [loading, setLoading] = useState(false);

  //  Envia os treinos para o usuario
  async function enviarTreinos(idAluno, fichasCriadas) {
    await firestore().collection('requisicoes_realizadas').doc(idAluno).set({
      id_requisicao: idAluno,
      quantidade_treinos: fichasCriadas.length,
      treinos: fichasCriadas,
      atualizado_em: new Date(),
    });

    //  Apos criada a colecao, deve apagar as fichas temporarias do aluno
    await firestore().collection('fichas_temporarias').doc(idAluno).delete();

    // Apos apagar as fichas, deve alterar para concluido a requisicao_solicitada

    await firestore().collection('requisicoes_treino').doc(idAluno).delete();
  }

  //  Salva as fichas na nuvem
  async function fichasTemporarias(fichasTemp, idAluno) {
    await firestore().collection('fichas_temporarias').doc(idAluno).set(
      {
        fichas: fichasTemp,
        atualizadoEm: new Date(),
      },
      //  Atualiza apenas os dados que foram alterados
      { merge: true },
    );
  }

  useEffect(() => {
    const ouvinte = firestore()
      .collection('requisicoes_treino')
      .where('status', '==', 'Aguardando')
      .onSnapshot(previa => {
        const documentos = previa.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReqs(documentos);
        setLoading(false);
      });

    // Remove o "ouvinte" quando terminar
    return () => ouvinte();
  }, []);

  return (
    <RequisicoesContext.Provider
      value={{ reqs, enviarTreinos, fichasTemporarias, loading }}
    >
      {children}
    </RequisicoesContext.Provider>
  );
}
