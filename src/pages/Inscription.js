import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Alert, KeyboardAvoidingView,
  Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const MATIERES = [
  'Mathématiques', 'Français', 'Physique-Chimie', 'SVT',
  'Histoire-Géo', 'Anglais', 'Philosophie', 'Informatique',
];

const Field = ({ label, value, onChangeText, placeholder, icon, capitalize = 'sentences' }) => (
  <View style={styles.fieldWrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={17} color="#aaa" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={capitalize}
      />
    </View>
  </View>
);

export default function Inscription({ navigation }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [matricule, setMatricule] = useState('');
  const [classe, setClasse] = useState('');
  const [matiere, setMatiere] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmMdp, setConfirmMdp] = useState('');
  const [mdpVisible, setMdpVisible] = useState(false);
  const [matiereOpen, setMatiereOpen] = useState(false);

  const handleInscription = () => {
    if (!nom || !prenom || !matricule || !classe || !matiere || !motDePasse || !confirmMdp) {
      Alert.alert('Champs requis', 'Veuillez remplir tous les champs.');
      return;
    }
    if (motDePasse !== confirmMdp) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    if (motDePasse.length < 6) {
      Alert.alert('Mot de passe trop court', 'Minimum 6 caractères.');
      return;
    }
    // TODO: appel API inscription
    navigation.navigate('Bienvenue');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

          <TouchableOpacity style={styles.retour} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#4CAF50" />
          </TouchableOpacity>

          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          </View>

          <Text style={styles.titre}>Formulaire d'inscription</Text>
          <Text style={styles.sousTitre}>Informations du professeur</Text>

          {/* Identité */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Identité</Text>
            <Field
              label="Nom" value={nom} onChangeText={setNom}
              placeholder="Votre nom" icon="person-outline" capitalize="words"
            />
            <Field
              label="Prénom" value={prenom} onChangeText={setPrenom}
              placeholder="Votre prénom" icon="person-outline" capitalize="words"
            />
            <Field
              label="Matricule" value={matricule} onChangeText={setMatricule}
              placeholder="Ex : PROF-2024-001" icon="card-outline" capitalize="characters"
            />
          </View>

          {/* Classe & Matière */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Classe & Matière</Text>
            <Field
              label="Classe enseignée" value={classe} onChangeText={setClasse}
              placeholder="Ex : 6ème A, Terminale S" icon="school-outline" capitalize="characters"
            />

            {/* Dropdown matière */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Matière enseignée</Text>
              <TouchableOpacity
                style={styles.inputWrapper}
                onPress={() => setMatiereOpen(!matiereOpen)}
                activeOpacity={0.8}
              >
                <Ionicons name="book-outline" size={17} color="#aaa" style={styles.inputIcon} />
                <Text style={[styles.input, !matiere && { color: '#bbb' }]}>
                  {matiere || 'Sélectionner une matière'}
                </Text>
                <Ionicons name={matiereOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#aaa" />
              </TouchableOpacity>
              {matiereOpen && (
                <View style={styles.dropdown}>
                  {MATIERES.map(m => (
                    <TouchableOpacity
                      key={m}
                      style={[styles.dropdownItem, matiere === m && styles.dropdownItemActive]}
                      onPress={() => { setMatiere(m); setMatiereOpen(false); }}
                    >
                      <Text style={[styles.dropdownText, matiere === m && styles.dropdownTextActive]}>{m}</Text>
                      {matiere === m && <Ionicons name="checkmark" size={16} color="#4CAF50" />}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Sécurité */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Sécurité</Text>

            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Mot de passe</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={17} color="#aaa" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Minimum 6 caractères"
                  placeholderTextColor="#bbb"
                  value={motDePasse}
                  onChangeText={setMotDePasse}
                  secureTextEntry={!mdpVisible}
                />
                <TouchableOpacity onPress={() => setMdpVisible(!mdpVisible)}>
                  <Ionicons name={mdpVisible ? 'eye-off-outline' : 'eye-outline'} size={17} color="#aaa" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Confirmer le mot de passe</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={17} color="#aaa" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Répéter le mot de passe"
                  placeholderTextColor="#bbb"
                  value={confirmMdp}
                  onChangeText={setConfirmMdp}
                  secureTextEntry={!mdpVisible}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.bouton} onPress={handleInscription} activeOpacity={0.85}>
            <Text style={styles.boutonTexte}>S'inscrire</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0faf0' },
  container: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 24, paddingBottom: 40, paddingTop: 10 },
  retour: { alignSelf: 'flex-start', marginBottom: 16, padding: 4 },
  logoWrapper: {
    backgroundColor: '#fff', borderRadius: 20, padding: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 10, elevation: 3, marginBottom: 16,
  },
  logo: { width: 65, height: 65 },
  titre: { fontSize: 22, fontWeight: '700', color: '#4CAF50', marginBottom: 4 },
  sousTitre: { fontSize: 13, color: '#888', marginBottom: 24 },
  section: { width: '100%', marginBottom: 20 },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: '#555', marginBottom: 12 },
  fieldWrapper: { width: '100%', marginBottom: 12 },
  label: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 5, marginLeft: 2 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#333' },
  dropdown: {
    backgroundColor: '#fff', borderRadius: 12, marginTop: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 5, overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: '#f5f5f5',
  },
  dropdownItemActive: { backgroundColor: '#f0faf0' },
  dropdownText: { fontSize: 14, color: '#333' },
  dropdownTextActive: { color: '#4CAF50', fontWeight: '600' },
  bouton: {
    backgroundColor: '#4CAF50', borderRadius: 12, paddingVertical: 15,
    width: '100%', alignItems: 'center', marginTop: 8,
    shadowColor: '#4CAF50', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  boutonTexte: { color: '#fff', fontSize: 16, fontWeight: '600' },
});