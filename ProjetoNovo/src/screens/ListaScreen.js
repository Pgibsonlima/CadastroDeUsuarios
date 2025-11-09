import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { subscribeUsuarios } from "../service/CadastroService"; 
import { useNavigation } from "@react-navigation/native";

export default function ListaScreen() {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeUsuarios(
      (itens) => {
        setUsuarios(itens);
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao buscar usuários:", error);
        setLoading(false);
      }
    );

    
    return () => unsubscribe();
  }, []);

  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("Detalhes", { idUsuario: item.id })}
    >
      <Text style={styles.nome}>Nome: {item.nome}</Text>
      <Text style={styles.info}>Telefone: {item.telefone}</Text>
      <Text style={styles.info}>CPF: {item.CPF}</Text>
      <Text style={styles.info}>Cidade: {item.cidade}</Text>
    </TouchableOpacity>
  );

  if (loading)
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários Cadastrados</Text>

      {usuarios.length > 0 ? (
        <FlatList
          data={usuarios}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noDataText}>Nenhum usuário cadastrado!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#e9ecef",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
    color: "#333",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#555",
  },
});
