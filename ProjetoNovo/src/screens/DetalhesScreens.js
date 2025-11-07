import { StyleSheet, Text, View, ScrollView, Platform, Alert, Button, ActivityIndicator, TextInput } from 'react-native';
import { getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConnections';
import React, { useEffect, useState } from 'react';

export default function DetalhesScreens({ route, navigation }) {
  const { idUsuario } = route.params;
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [CPF, setCPF] = useState('');
  const [logadouro, setLogadouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUF] = useState('');

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const docRef = doc(db, 'Usuários', idUsuario);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsuario(data);
          setNome(data.nome);
          setTelefone(String(data.telefone));
          setCPF(data.CPF);
          setLogadouro(data.logadouro);
          setBairro(data.setBairro);
          setCidade(data.cidade);
          setUF(data.UF)

        } else {
          Platform.OS === 'web'
            ? window.alert('Usuário não encontrado')
            : Alert.alert('Erro!', 'Usuário não encontrado');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Erro ao carregar os dados do usuario', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuario.');
      } finally {
        setLoading(false);
      }
    };
    carregarUsuario();
  }, []);

  const handlerAtualizar = async () => {
    if (!nome || !logadouro || !CPF || !telefone || !bairro || !cidade ||!UF )  {
      Platform.OS === 'web'
        ? window.alert('Preencha todos os campos antes de atualizar')
        : Alert.alert('Aviso', 'Preencha todos os campos antes de atualizar!');
      return;
    }

    try {
      const usuarioRef = doc(db, "usuarios", idUsuario);
      await updateDoc(usuarioRef, {
        nome,
        telefone,
        CPF,
        logadouro,
        bairro,
        cidade,
        UF
      });

      Platform.OS === 'web'
        ? window.alert('Usuário atualizado com sucesso!')
        : Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');

      setEditando(false);
      navigation.goBack()

    } catch (error) {
      console.error("Erro ao atualizar:", error);
      Alert.alert('Erro!', 'Não foi possível atualizar o usuario.');
    }
  };

  const handlerExcluir = async () => {
    if (Platform.OS === 'web') {
      const confirmar = window.confirm("Deseja realmente excluir este usuario?");
      if (!confirmar) return;

      try {
        await deleteDoc(doc(db, 'Usuários', idUsuario));
        alert("Usuário excluído com sucesso!");
        navigation.goBack();
      } catch (error) {
        console.error("Erro ao deletar: ", error);
        alert("Não foi possível excluir o usuario.");
      }
    } else {
      Alert.alert("Confirmação", "Deseja realmente excluir este usuario?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "Usuários", idUsuario));
              Alert.alert("Excluído", "Usuário removido com sucesso!");
              navigation.goBack();
            } catch (error) {
              console.error("Erro ao deletar", error);
              Alert.alert("Erro", "Não foi possível deletar o usuario");
            }
          }
        }
      ]);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Usuário</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        editable={editando}
        multiline
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        editable={editando}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={CPF}
        onChangeText={setCPF}
        editable={editando}
        multiline
      />

      <View style={styles.botoes}>
        {!editando ? (
          <Button title='Editar' onPress={() => setEditando(true)} />
        ) : (
          <Button title='Salvar Alterações' onPress={handlerAtualizar} />
        )}
      </View>

      <View style={styles.botoes}>
        <Button title='Excluir Usuário' color="red" onPress={handlerExcluir} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff"
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "600"
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    fontSize: 16
  },
  botoes: {
    marginTop: 20
  }
});
