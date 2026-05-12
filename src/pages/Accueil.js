import {
  View, Text, TouchableOpacity,
  StyleSheet, Alert, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function Accueil({ navigation, route }) {
  const classe = route.params?.classe ?? { nom: 'Ma classe', matiere: '' };

  const handleCahierTexte = () => {
    Alert.alert(
      'Bientôt disponible',
      'Le cahier de texte sera disponible dans une prochaine version.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="dark" />

      <View style={styles.wrapper}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerBonjour}>Bonjour !</Text>
            <Text style={styles.headerClasse}>{classe.nom} · {classe.matiere}</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Ionicons name="person" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Contenu scrollable */}
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitre}>Voici votre liste de classe</Text>

          {/* Carte classe */}
          <TouchableOpacity
            style={styles.classeCard}
            onPress={() => navigation.navigate('Notes', { classe })}
            activeOpacity={0.8}
          >
            <View style={styles.classeIconWrapper}>
              <Ionicons name="document-text" size={22} color="#fff" />
            </View>
            <Text style={styles.classeCardText}>Liste de classe</Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>

        </ScrollView>

        {/* Barre de navigation bas */}
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={22} color="#4CAF50" />
            <Text style={[styles.navLabel, styles.navActive]}>Accueil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Notes', { classe })}
          >
            <Ionicons name="document-text-outline" size={22} color="#aaa" />
            <Text style={styles.navLabel}>Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={handleCahierTexte}>
            <Ionicons name="pencil-outline" size={22} color="#aaa" />
            <Text style={styles.navLabel}>Ajouter</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0faf0' },
  wrapper: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  headerBonjour: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  headerClasse: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#bdbdbd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    gap: 16,
    flexGrow: 1,
  },
  sectionTitre: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  classeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: 14,
  },
  classeIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  classeCardText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#aaa',
  },
  navActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});
