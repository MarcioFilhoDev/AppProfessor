import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';

import FormularioNovoTreino from '../../components/formsNovoTreino';
import { RequisicoesContext } from '../../contexts/requisicoesContext';
import Lucide from '@react-native-vector-icons/lucide';
import { useNavigation } from '@react-navigation/native';

export default function Requisicao({ route }) {
  const navegar = useNavigation();

  const { enviarTreinos } = useContext(RequisicoesContext);

  const { pessoa } = route.params;

  //  Armazena as fichas criadas
  const [fichas, setFichas] = useState([]);

  const [statusFormulario, setStatusFormulario] = useState(false);

  function enviarAsFichas(novasFichas) {
    //  Insere/atualiza as fichas com as novas
    setFichas(novasFichas);
  }

  // Resgatando as fichas salvas temporariamente
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('fichas_temporarias')
      .doc(pessoa.id) //  Id do aluno
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          const dados = snapshot.data();
          setFichas(dados?.fichas);
        }
      });

    return () => unsubscribe();
  }, [pessoa.id]);

  return (
    <ScrollView className="flex-1 p-6">
      <View className="mb-4">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => navegar.goBack()}
        >
          <Lucide name="arrow-left" size={28} className="elevation-20" />
        </TouchableOpacity>
      </View>

      <View className="bg-neutral-50 rounded-md p-4 gap-1.5 elevation mb-4">
        {/* Nome do aluno */}
        <Text className="text-lg font-bold">
          Solicitado por: <Text className="font-normal">{pessoa.aluno}</Text>
        </Text>

        {/* Objetivo do aluno */}
        <Text className="text-lg font-semibold">
          Objetivo: <Text className="font-normal">{pessoa.objetivo}</Text>
        </Text>

        {/* Dor e descricao da dor */}
        <Text className="text-lg font-semibold">
          Possui dor? <Text className="font-normal">{pessoa.possui_dor}</Text>
        </Text>

        {/* Quantidade de treinos */}
        <Text className="text-lg font-semibold">
          Quantidade de treinos:{' '}
          <Text className="font-normal">{pessoa.quantidade_treinos}</Text>
        </Text>
      </View>

      <FormularioNovoTreino idAluno={pessoa.id} enviando={enviarAsFichas} />

      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-slate-500 mt-4 p-2.5 items-center rounded-md elevation-md"
        onPress={() => {
          enviarTreinos(pessoa.id, fichas);
          navegar.goBack();
        }} //  Envia as fichas para o bd
      >
        <Text className="text-white font-medium">Enviar treinos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
