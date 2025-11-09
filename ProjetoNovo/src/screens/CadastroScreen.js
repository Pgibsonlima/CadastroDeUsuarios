import { Platform, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { criarCadastro } from '../service/CadastroService';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [CPF, setCPF] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUF] = useState('');

  const buscarCep = async () => {
    if (cep.length !== 8) {
      Platform.OS === 'web'
        ? window.alert('Por favor, insira um CEP válido com 8 dígitos!')
        : Alert.alert('Erro!', 'Por favor, insira um CEP válido com 8 dígitos!');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setLogradouro(data.logradouro || '');
        setBairro(data.bairro || '');
        setCidade(data.localidade || '');
        setUF(data.uf || '');
      } else {
        Platform.OS === 'web'
          ? window.alert('CEP não encontrado!')
          : Alert.alert('Erro!', 'CEP não encontrado!');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      Platform.OS === 'web'
        ? window.alert('Erro ao consultar o CEP!')
        : Alert.alert('Erro!', 'Erro ao consultar o CEP!');
    }
  };

  const cadastroUsuario = async () => {
    if (nome === '' || CPF === '' || logradouro === '' || cep === '') {
      Platform.OS === 'web'
        ? window.alert('Por favor, preencha os campos obrigatórios!')
        : Alert.alert('Erro!', 'Por favor, preencha os campos obrigatórios!');
      return;
    }

    const novoCadastro = {
      nome,
      telefone,
      CPF,
      cep,
      logradouro,
      bairro,
      cidade,
      UF,
    };

    try {
      await criarCadastro(novoCadastro);

      Platform.OS === 'web'
        ? window.alert('Usuário cadastrado com sucesso!')
        : Alert.alert('Sucesso!', 'Usuário cadastrado com sucesso!');

      setNome('');
      setTelefone('');
      setCPF('');
      setCep('');
      setLogradouro('');
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

      <Text style={styles.label}>CEP *</Text>
      <TextInput
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        placeholder="Digite o CEP"
        style={styles.input}
        onBlur={buscarCep} 
      />

      <Text style={styles.label}>Logradouro *</Text>
      <TextInput
        value={logradouro}
        onChangeText={setLogradouro}
        placeholder="Digite o seu endereço"
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
    backgroundColor: "#f0f0f0",
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});
