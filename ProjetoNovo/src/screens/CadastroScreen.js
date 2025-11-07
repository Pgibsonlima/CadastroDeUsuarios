import { Platform, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { criarCadastro } from '../service/ProdutosService';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [CPF, setCPF] = useState('');
  const [logadouro, setLogadouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUF] = useState('');

  const cadastroUsuario = async () => {
    if (nome === '' || CPF === '' || logadouro === '') {
      Platform.OS === 'web'
        ? window.alert('Por favor, preencha os campos obrigatórios!')
        : Alert.alert('Erro!', 'Por favor, preencha os campos obrigatórios!');

      return;
    }

    const novoCadastro = {
      nome,
      telefone,
      CPF,
      logadouro,
      bairro,
      cidade,
      UF
    };

    try {
      await criarCadastro(novoCadastro);

      Platform.OS === 'web'
        ? window.alert('Usuário cadastrado com sucesso!')
        : Alert.alert('Sucesso!', 'Usuário cadastrado com sucesso!');

      setNome('');
      setTelefone('');
      setCPF('');
      setLogadouro('');
      setBairro('');
      setCidade('');
      setUF('');

    } catch (error) {
      console.error('Erro ao cadastrar o usuário', error);

      Platform.OS === 'web'
        ? window.alert('Erro ao cadastrar o usuário. Tente novamente mais tarde!')
        : Alert.alert('Erro!', 'Erro ao cadastrar o usuário. Tente novamente mais tarde!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome Completo *</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome completo"
        style={styles.input}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        value={telefone}
        onChangeText={setTelefone}
        placeholder="(xx) xxxxx-xxxx"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>CPF *</Text>
      <TextInput
        value={CPF}
        onChangeText={setCPF}
        keyboardType="numeric"
        placeholder="xxx.xxx.xxx-xx"
        style={styles.input}
      />

      <Text style={styles.label}>Logradouro *</Text>
      <TextInput
        value={logadouro}
        onChangeText={setLogadouro}
        placeholder="Digite seu endereço"
        style={styles.input}
      />

      <Text style={styles.label}>Bairro</Text>
      <TextInput
        value={bairro}
        onChangeText={setBairro}
        placeholder="Digite seu bairro"
        style={styles.input}
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        value={cidade}
        onChangeText={setCidade}
        placeholder="Digite sua cidade"
        style={styles.input}
      />

      <Text style={styles.label}>UF</Text>
      <TextInput
        value={UF}
        onChangeText={setUF}
        placeholder="UF"
        maxLength={2}
        style={styles.input}
      />

      <Button title="Cadastrar" onPress={cadastroUsuario} />
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
    height: 40,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
});
