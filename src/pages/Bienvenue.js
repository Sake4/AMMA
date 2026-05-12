import {
  View, Text, TouchableOpacity,
  StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Données de test — seront remplacées par les vraies classes du prof depuis l'API
const CLASSES_TEST = [
  { id: '1', nom: '6ème A', matiere: 'Mathématiques' },
  { id: '2', nom: '5ème B', matiere: 'Physique-Chimie' },
  { id: '3', nom: '4ème C', matiere: 'Mathématiques' },
];

export default function Bienvenue({ navigation }) {

  const handleSelectClasse = (classe) => {
    navigation.navigate('Accueil', { classe });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>

        {/* Illustration */}
        <View style={styles.illustrationWrapper}>
          <Ionicons name="clipboard-outline" size={80} color="#4CAF50" />
        </View>

        {/* Titre */}
        <Text style={styles.titre}>Bienvenue 👋</Text>
        <Text style={styles.sousTitre}>Se connecter à quelle classe ?</Text>

        {/* Liste des classes */}
        <FlatList
          data={CLASSES_TEST}
          keyExtractor={(item) => item.id}
          style={styles.liste}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.classeCard}
              onPress={() => handleSelectClasse(item)}
              activeOpacity={0.75}
            >
              <Text style={styles.classeNumero}>{index + 1} -</Text>
              <View style={styles.classeInfo}>
                <Text style={styles.classeNom}>{item.nom}</Text>
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
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  illustrationWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  titre: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 6,
  },
  sousTitre: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
  },
  liste: { width: '100%' },
  classeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  classeNumero: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
    marginRight: 12,
    width: 30,
  },
  classeInfo: { flex: 1 },
  classeNom: { fontSize: 15, fontWeight: '600', color: '#333' },
  classeMatiere: { fontSize: 12, color: '#999', marginTop: 2 },
});
