import {
  View, Text, TouchableOpacity,
  StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function Bienvenue({ navigation, route }) {
  const prof = route.params?.prof;
  const classes = prof?.classes ?? [];

  const handleSelectClasse = (classeItem) => {
    navigation.navigate('Accueil', { classe: classeItem, prof });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>

        <View style={styles.illustrationWrapper}>
          <Ionicons name="clipboard-outline" size={80} color="#4CAF50" />
        </View>

        <Text style={styles.titre}>Bienvenue 👋</Text>
        <Text style={styles.sousTitre}>
          {prof ? `${prof.prenom} ${prof.nom}` : ''}
        </Text>
        <Text style={styles.question}>Se connecter à quelle classe ?</Text>

        <FlatList
          data={classes}
          keyExtractor={(item, index) => index.toString()}
          style={styles.liste}
          contentContainerStyle={{ gap: 12 }}
          ListEmptyComponent={
            <Text style={styles.empty}>Aucune classe assignée.</Text>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.classeCard}
              onPress={() => handleSelectClasse(item)}
              activeOpacity={0.75}
            >
              <Text style={styles.classeNumero}>{index + 1} -</Text>
              <View style={styles.classeInfo}>
                <Text style={styles.classeNom}>{item.nom_classe}</Text>
                <Text style={styles.classeMatiere}>{item.matiere}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#bbb" />
            </TouchableOpacity>
          )}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0faf0' },
  container: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 20 },
  illustrationWrapper: {
    width: 130, height: 130, borderRadius: 65,
    backgroundColor: '#e8f5e9', alignItems: 'center',
    justifyContent: 'center', marginBottom: 16,
  },
  titre: { fontSize: 28, fontWeight: '700', color: '#4CAF50', marginBottom: 4 },
  sousTitre: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 4 },
  question: { fontSize: 13, color: '#888', marginBottom: 32 },
  liste: { width: '100%' },
  empty: { textAlign: 'center', color: '#aaa', fontSize: 14, marginTop: 20 },
  classeCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 14, paddingHorizontal: 18, paddingVertical: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  classeNumero: { fontSize: 16, fontWeight: '700', color: '#4CAF50', marginRight: 12, width: 30 },
  classeInfo: { flex: 1 },
  classeNom: { fontSize: 15, fontWeight: '600', color: '#333' },
  classeMatiere: { fontSize: 12, color: '#999', marginTop: 2 },
});