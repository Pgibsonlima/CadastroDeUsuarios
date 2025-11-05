import { Platform, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { criarProduto } from '../service/ProdutosService';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [CPF, setCPF] = useState('');
  const [logadouro, setLogadouro] = useState('');
  const [bairro, setBairro] = useState ('');
  const [cidade, setCidade] = useState ('')
  const [UF, setUF] = useState ('');

  
  const handlerCadastro = async () => {
    if (nome === '' || telefone === '' || CPF === '') {
      Platform.OS === 'web'
        ? window.alert('Por favor, preencha todos os campos')
        : Alert.alert('Erro!', 'Por favor, preencha todos os campos.');
      return;
    }

    const precoConvertido = parseFloat(telefone); 
    if (isNaN(precoConvertido)) {
      Platform.OS === 'web'
        ? window.alert('Por favor, digite um preço válido')
        : Alert.alert('Erro!', 'Por favor, digite um preço válido.');
      return;
    }

    const novoProduto = {
      nome,
      telefone: precoConvertido,
      CPF,
    };

    try{
        const id = await criarProduto(novoProduto);
        Platform.OS === 'web'
      ? window.alert('Produto cadastrado com sucesso!')
      : Alert.alert('Sucesso!', 'Produto cadastrado com sucesso!');
      
      
      setNome('');
      setTelefone('');
      setCPF('');
    }catch(error){
      console.error('Erro ao cadastrar produto', error);
      Platform.OS === 'web'
      ? window.alert('Erro ao cadastrar o produto. Tente Novamante mais tarde')
      : Alert.alert('Erro','Erro ao cadastrar produto. Tente novamente mais tarde');

    } 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Produto</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do produto"
        style={styles.input}
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Digite o preço do produto"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={CPF}
        onChangeText={setCPF}
        placeholder="Descrição do produto"
        style={styles.input}
      />

      <Button title="Cadastrar" onPress={handlerCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0"
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height:40,
    borderWidth: 1,
    borderColor: '#gray',
    borderRadius: 5,
    paddingHorizontal:10,
    marginBottom: 10,
  },
});
