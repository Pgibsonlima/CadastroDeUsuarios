import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';


export default function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> GERENCIADOR DE PRODUTO</Text>
        <TouchableOpacity 
        style={styles.styleButtom}
        onPress={()=> navigation.navigate('Cadastro')}>
        
        <Text style={styles.buttomText}>Cadastrar Produto</Text>

        </TouchableOpacity>
        
        
        <TouchableOpacity 
        style={styles.styleButtom}
        onPress={()=> navigation.navigate('Lista')}>
        
        <Text style={styles.buttomText}>Listar Produto</Text>

        </TouchableOpacity>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title:{
      fontSize:25,
      fontWeight: 'bold',
      marginBottom: 40
    },
    styleButtom:{
      backgroundColor:'#007BFF',
      padding: 15,
      borderRadius:12,
      width:'80%',
      alignItems: 'center',
      marginBottom:20
    },
    buttomText:{
      color:'#fff',
      fontSize: 18,
      fontWeight:'bold'
    }
  });