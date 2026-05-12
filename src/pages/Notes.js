import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  FlatList, TextInput, Modal, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Données de test — seront remplacées par l'API
const ELEVES_TEST = [
  { id: '1', nom: 'Koné', prenom: 'Aminata', notes: [14, 12] },
  { id: '2', nom: 'Traoré', prenom: 'Seydou', notes: [10, 15] },
  { id: '3', nom: 'Diallo', prenom: 'Fatoumata', notes: [18] },
  { id: '4', nom: 'Coulibaly', prenom: 'Ibrahim', notes: [] },
];

export default function Notes({ navigation, route }) {
  const classe = route.params?.classe ?? { nom: 'Classe', matiere: '' };
  const [eleves, setEleves] = useState(ELEVES_TEST);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEleve, setSelectedEleve] = useState(null);
  const [nouvelleNote, setNouvelleNote] = useState('');

  const handleCahierTexte = () => {
    Alert.alert('Bientôt disponible', 'Le cahier de texte sera disponible prochainement.', [{ text: 'OK' }]);
  };

  const ouvrirModal = (eleve) => {
    setSelectedEleve(eleve);
    setNouvelleNote('');
    setModalVisible(true);
  };

  const ajouterNote = () => {
    const valeur = parseFloat(nouvelleNote.replace(',', '.'));
    if (isNaN(valeur) || valeur < 0 || valeur > 20) {
      Alert.alert('Note invalide', 'Entrez une note entre 0 et 20.');
      return;
    }
    setEleves(prev =>
      prev.map(e =>
        e.id === selectedEleve.id
          ? { ...e, notes: [...e.notes, valeur] }
          : e
      )
    );
    setModalVisible(false);
  };

  const moyenne = (notes) => {
    if (!notes.length) return '—';
    return (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(1);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.wrapper}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitre}>Mes notes</Text>
            <Text style={styles.headerSous}>{classe.nom} · {classe.matiere}</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={() => eleves.length && ouvrirModal(eleves[0])}>
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Liste élèves */}
        {eleves.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="document-text-outline" size={50} color="#ccc" />
            </View>
            <Text style={styles.emptyTitre}>Aucune note pour le moment</Text>
            <Text style={styles.emptySous}>Ajoutez votre première note en cliquant sur le bouton +.</Text>
          </View>
        ) : (
          <FlatList
            data={eleves}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.liste}
            renderItem={({ item }) => (
              <View style={styles.eleveCard}>
                <View style={styles.eleveInfo}>
                  <Text style={styles.eleveNom}>{item.prenom} {item.nom}</Text>
                  <Text style={styles.eleveNotes}>
                    Notes : {item.notes.length ? item.notes.join(', ') : 'Aucune'}
                  </Text>
                  <Text style={styles.eleveMoyenne}>Moyenne : {moyenne(item.notes)}</Text>
                </View>
                <TouchableOpacity
                  style={styles.addNoteBtn}
                  onPress={() => ouvrirModal(item)}
                >
                  <Ionicons name="add-circle-outline" size={28} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* Barre navigation */}
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Accueil', { classe })}>
            <Ionicons name="home-outline" size={22} color="#aaa" />
            <Text style={styles.navLabel}>Accueil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="document-text" size={22} color="#4CAF50" />
            <Text style={[styles.navLabel, styles.navActive]}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleCahierTexte}>
            <Ionicons name="pencil-outline" size={22} color="#aaa" />
            <Text style={styles.navLabel}>Ajouter</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* Modal ajout note */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitre}>Ajouter une note</Text>
            {selectedEleve && (
              <Text style={styles.modalEleve}>
                {selectedEleve.prenom} {selectedEleve.nom}
              </Text>
            )}
            <TextInput
              style={styles.modalInput}
              placeholder="Note sur 20 (ex: 14.5)"
              placeholderTextColor="#bbb"
              keyboardType="decimal-pad"
              value={nouvelleNote}
              onChangeText={setNouvelleNote}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={ajouterNote}>
                <Text style={styles.modalConfirmText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  headerLeft: { flex: 1 },
  headerTitre: { fontSize: 20, fontWeight: '700', color: '#4CAF50' },
  headerSous: { fontSize: 12, color: '#999', marginTop: 2 },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liste: { padding: 20, gap: 12 },
  eleveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  eleveInfo: { flex: 1 },
  eleveNom: { fontSize: 15, fontWeight: '600', color: '#333' },
  eleveNotes: { fontSize: 12, color: '#888', marginTop: 4 },
  eleveMoyenne: { fontSize: 12, color: '#4CAF50', fontWeight: '600', marginTop: 2 },
  addNoteBtn: { padding: 4 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 12,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyTitre: { fontSize: 16, fontWeight: '700', color: '#333', textAlign: 'center' },
  emptySous: { fontSize: 13, color: '#aaa', textAlign: 'center', lineHeight: 20 },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
  },
  navItem: { alignItems: 'center', gap: 4 },
  navLabel: { fontSize: 11, color: '#aaa' },
  navActive: { color: '#4CAF50', fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    gap: 16,
  },
  modalTitre: { fontSize: 18, fontWeight: '700', color: '#333' },
  modalEleve: { fontSize: 14, color: '#4CAF50', fontWeight: '600' },
  modalInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  modalButtons: { flexDirection: 'row', gap: 12 },
  modalCancel: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  modalCancelText: { color: '#888', fontWeight: '600' },
  modalConfirm: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  modalConfirmText: { color: '#fff', fontWeight: '600' },
});
