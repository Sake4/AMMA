import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Alert, KeyboardAvoidingView,
  Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connexion } from '../../services/api';

export default function Connexion({ navigation }) {
  const [matricule, setMatricule] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [mdpVisible, setMdpVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnexion = async () => {
    if (!matricule.trim() || !motDePasse.trim()) {
      Alert.alert('Champs requis', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      const data = await connexion(matricule.trim(), motDePasse);

      // Sauvegarder le token et les infos du prof
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('prof', JSON.stringify(data.prof));

      navigation.replace('Bienvenue', { prof: data.prof });
    } catch (err) {
      Alert.alert('Erreur', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          </View>

          <Text style={styles.titre}>Connexion</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Matricule"
              placeholderTextColor="#bbb"
              value={matricule}
              onChangeText={setMatricule}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Mot de passe"
              placeholderTextColor="#bbb"
              value={motDePasse}
              onChangeText={setMotDePasse}
              secureTextEntry={!mdpVisible}
            />
            <TouchableOpacity onPress={() => setMdpVisible(!mdpVisible)}>
              <Ionicons name={mdpVisible ? 'eye-off-outline' : 'eye-outline'} size={18} color="#aaa" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.bouton} onPress={handleConnexion} activeOpacity={0.85} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.boutonTexte}>Se connecter</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
            <Text style={styles.lienInscription}>S'inscrire</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0faf0' },
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 40 },
  logoWrapper: {
    backgroundColor: '#fff', borderRadius: 24, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4, marginBottom: 28,
  },
  logo: { width: 80, height: 80 },
  titre: { fontSize: 26, fontWeight: '700', color: '#4CAF50', marginBottom: 28 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    marginBottom: 14, width: '100%',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#333' },
  bouton: {
    backgroundColor: '#4CAF50', borderRadius: 12, paddingVertical: 15,
    width: '100%', alignItems: 'center', marginTop: 8, marginBottom: 20,
    shadowColor: '#4CAF50', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  boutonTexte: { color: '#fff', fontSize: 16, fontWeight: '600' },
  lienInscription: { color: '#4CAF50', fontSize: 15, fontWeight: '500' },
});