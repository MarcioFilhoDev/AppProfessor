import { createContext, useCallback, useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export const RequisicoesContext = createContext({});

export function RequsicaoProvider({ children }) {
  //  Variavel para armazenar as requisicoes
  const [reqs, setReqs] = useState([]);

  //  Funcao que resgata as requisicoes marcadas como "aguardando"
  async function ResgatandoRequisicoes() {
    const requisicoesAguardando = await firestore()
      .collection('requisicoes_treino')
      .where('status', '==', 'Aguardando')
      .get();

    const documentos = requisicoesAguardando.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReqs(documentos);
  }

  //  Passos para as fichas de treino chegar para o aluno
  //  1 - Professor grava as fichas temporariamente em uma colecao
  //      para facilitar que possa ser editado a ficha (adicionar ou remover exercicio)
  //  2 - Apos finalizado, professor clica em um botao e envia as informacoes para o usuario

  async function armazenarFicha(dados) {
    await firestore().collection('fichas_temporarias').doc();
  }

  useFocusEffect(useCallback(() => {}, []));

  useEffect(() => {
    ResgatandoRequisicoes();
  }, []);

  return (
    <RequisicoesContext.Provider value={{ reqs, armazenarFicha }}>
      {children}
    </RequisicoesContext.Provider>
  );
}
