import { StyleSheet, Text, View, ScrollView, Alert, Button, ActivityIndicator, TextInput, Platform } from 'react-native';
import { getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConnections';
import React, { useEffect, useState } from 'react';

export default function DetalhesScreens({ route, navigation }) {
  const { idUsuario } = route.params;
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [CPF, setCPF] = useState('');
  const [cep, setCep] = useState('');
  const [logadouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUF] = useState('');

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const docRef = doc(db, 'usuarios', idUsuario); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setNome(data.nome || '');
          setTelefone(String(data.telefone || ''));
          setCPF(data.CPF || '');
          setCep(data.cep || '');
          setLogradouro(data.logadouro || '');
          setBairro(data.bairro || '');
          setCidade(data.cidade || '');
          setUF(data.UF || '');
        } else {
          Alert.alert('Erro', 'Usuário não encontrado');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };
    carregarUsuario();
  }, []);

  const buscarCep = async () => {
    if (cep.length !== 8) {
      Alert.alert('Erro', 'Digite um CEP válido com 8 dígitos.');
      return;
    }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('CEP não encontrado!');
        return;
      }

      setLogradouro(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);
      setUF(data.uf);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      Alert.alert('Erro ao buscar CEP!');
    }
  };

  
  const handlerAtualizar = async () => {
    if (!nome || !CPF || !cep || !logadouro) {
      Platform.OS === 'web'
        ?window.alert('Preencha todos os campos obrigatórios!')
        :Alert.alert('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      const usuarioRef = doc(db, 'usuarios', idUsuario);
      await updateDoc(usuarioRef, {
        nome,
        telefone,
        CPF,
        cep,
        logadouro,
        bairro,
        cidade,
        UF,
      });
      Platform.OS === 'web'
        ?window.alert('Usuário atualizado com sucesso!')
        :Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
      setEditando(false);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      Alert.alert('Erro ao atualizar o usuário.');
    }
  };

  const handlerExcluir = async () => {
  if (Platform.OS === 'web') {
    const confirmar = window.confirm('Deseja excluir este usuário?');
    if (!confirmar) return; 

    try {
      await deleteDoc(doc(db, 'usuarios', idUsuario));
      window.alert('Usuário excluído com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao excluir:', error);
      window.alert('Erro ao excluir usuário.');
    }
  } else {
    Alert.alert('Confirmação', 'Deseja excluir este usuário?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'usuarios', idUsuario));
            Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
            navigation.goBack();
          } catch (error) {
            console.error('Erro ao excluir:', error);
            Alert.alert('Erro ao excluir usuário.');
          }
        },
      },
    ]);
  }
};
  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Usuário</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} editable={editando} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} editable={editando} keyboardType="numeric" />

      <Text style={styles.label}>CPF</Text>
      <TextInput style={styles.input} value={CPF} onChangeText={setCPF} editable={editando} keyboardType="numeric" />

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        editable={editando}
        keyboardType="numeric"
        onBlur={buscarCep} 
      />

      <Text style={styles.label}>Logradouro</Text>
      <TextInput style={styles.input} value={logadouro} onChangeText={setLogradouro} editable={editando} />

      <Text style={styles.label}>Bairro</Text>
      <TextInput style={styles.input} value={bairro} onChangeText={setBairro} editable={editando} />

      <Text style={styles.label}>Cidade</Text>
      <TextInput style={styles.input} value={cidade} onChangeText={setCidade} editable={editando} />

      <Text style={styles.label}>UF</Text>
      <TextInput style={styles.input} value={UF} onChangeText={setUF} editable={editando} maxLength={2} />

      <View style={styles.botoes}>
        {!editando ? (
          <Button title="Editar" onPress={() => setEditando(true)} />
        ) : (
          <Button title="Salvar Alterações" onPress={handlerAtualizar} />
        )}
      </View>

      <View style={styles.botoes}>
        <Button title="Excluir Usuário" color="red" onPress={handlerExcluir} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 5,
  },
  botoes: {
    marginTop: 15,
  },
});
