import { StyleSheet, Text, View, ScrollView, Platform, Alert, Button, ActivityIndicator, TextInput } from 'react-native';
import { getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConnections';
import React, { useEffect, useState } from 'react';

export default function DetalhesScreens({ route, navigation }) {
  const { idProduto } = route.params;
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const docRef = doc(db, 'produtos', idProduto);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduto(data);
          setNome(data.nome);
          setPreco(String(data.preco));
          setDescricao(data.descricao);

        } else {
          Platform.OS === 'web'
            ? window.alert('Produto não encontrado')
            : Alert.alert('Erro!', 'Produto não encontrado');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Erro ao carregar produto', error);
        Alert.alert('Erro', 'Não foi possível carregar o produto.');
      } finally {
        setLoading(false);
      }
    };
    carregarProduto();
  }, []);

  const handlerAtualizar = async () => {
    if (!nome || !preco || !descricao) {
      Platform.OS === 'web'
        ? window.alert('Preencha todos os campos antes de atualizar!')
        : Alert.alert('Aviso', 'Preencha todos os campos antes de atualizar!');
      return;
    }

    try {
      const produtoRef = doc(db, "produtos", idProduto);
      await updateDoc(produtoRef, {
        nome,
        preco: parseFloat(preco),
        descricao,
      });

      Platform.OS === 'web'
        ? window.alert('Produto atualizado com sucesso!')
        : Alert.alert('Sucesso', 'Produto atualizado com sucesso!');

      setEditando(false);
      navigation.goBack()

    } catch (error) {
      console.error("Erro ao atualizar:", error);
      Alert.alert('Erro!', 'Não foi possível atualizar o produto.');
    }
  };

  const handlerExcluir = async () => {
    if (Platform.OS === 'web') {
      const confirmar = window.confirm("Deseja realmente excluir este produto?");
      if (!confirmar) return;

      try {
        await deleteDoc(doc(db, 'produtos', idProduto));
        alert("Produto excluído com sucesso!");
        navigation.goBack();
      } catch (error) {
        console.error("Erro ao deletar: ", error);
        alert("Não foi possível excluir o produto.");
      }
    } else {
      Alert.alert("Confirmação", "Deseja realmente excluir este produto?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "produtos", idProduto));
              Alert.alert("Excluído", "Produto removido com sucesso!");
              navigation.goBack();
            } catch (error) {
              console.error("Erro ao deletar", error);
              Alert.alert("Erro", "Não foi possível deletar o produto");
            }
          }
        }
      ]);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Produto</Text>

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
        value={preco}
        onChangeText={setPreco}
        editable={editando}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={descricao}
        onChangeText={setDescricao}
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
        <Button title='Excluir Produto' color="red" onPress={handlerExcluir} />
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
