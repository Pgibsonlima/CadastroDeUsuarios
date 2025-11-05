import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { subscribeProdutos } from "../service/ProdutosService";
import { useNavigation } from "@react-navigation/native";

export default function ListaScreen() {
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeProdutos(
      (itens) => {
        setProdutos(itens);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("Detalhes", { idProduto: item.id })}
    >
      <Text style={styles.produto}>Produto: {item.nome}</Text>
      <Text style={styles.precoproduto}>
        Preço R$: {item.preco ? Number(item.preco).toFixed(2) : "0.00"}
      </Text>
      <Text style={styles.precoproduto}>Descrição: {item.descricao}</Text>
    </TouchableOpacity>
  );

  if (loading)
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Produtos</Text>

      {produtos.length > 0 ? (
        <FlatList
          data={produtos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noDataText}>Nenhum produto cadastrado!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: "#ddd",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  produto: {
    fontSize: 18,
    fontWeight: "bold",
  },
  precoproduto: {
    fontSize: 16,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#444",
  },
});
