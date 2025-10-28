import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Descricao({ navigation }) {
  const [nomeLocal, setNomeLocal] = useState('Registro - SP');
  const [habitantes, setHabitantes] = useState('56.000');
  const [areaTerritorial, setAreaTerritorial] = useState('722 km²');
  const [clima, setClima] = useState('Tropical Atlântico');
  const [altitude, setAltitude] = useState('25m');
  const [fundacao, setFundacao] = useState('1922');

  const salvarInformacoes = () => {
    Alert.alert(
      'Informações Salvas',
      'Os dados da cidade do Vale do Ribeira foram atualizados com sucesso!',
      [{ text: 'OK' }]
    );
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1506905925346-14b090dc332b?w=800' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Ionicons name="leaf" size={40} color="#FFFFFF" />
            <Text style={styles.title}>Vale do Ribeira</Text>
            <Text style={styles.subtitle}>Região rica em biodiversidade e cultura</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cidade do Vale do Ribeira</Text>
              <TextInput
                style={styles.textInput}
                value={nomeLocal}
                onChangeText={setNomeLocal}
                placeholder="Digite o nome da cidade"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quantidade de Habitantes</Text>
              <TextInput
                style={styles.textInput}
                value={habitantes}
                onChangeText={setHabitantes}
                placeholder="Número de habitantes"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Área Territorial</Text>
              <TextInput
                style={styles.textInput}
                value={areaTerritorial}
                onChangeText={setAreaTerritorial}
                placeholder="Área em km²"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Clima</Text>
                <TextInput
                  style={styles.textInput}
                  value={clima}
                  onChangeText={setClima}
                  placeholder="Tipo de clima"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Altitude</Text>
                <TextInput
                  style={styles.textInput}
                  value={altitude}
                  onChangeText={setAltitude}
                  placeholder="Altitude"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ano de Fundação</Text>
              <TextInput
                style={styles.textInput}
                value={fundacao}
                onChangeText={setFundacao}
                placeholder="Ano de fundação"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={salvarInformacoes}>
              <Ionicons name="save" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Salvar Informações</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <Ionicons name="people" size={24} color="#4A90E2" />
              <Text style={styles.infoTitle}>População</Text>
              <Text style={styles.infoValue}>{habitantes} habitantes</Text>
            </View>

            <View style={styles.infoCard}>
              <Ionicons name="map" size={24} color="#4A90E2" />
              <Text style={styles.infoTitle}>Área</Text>
              <Text style={styles.infoValue}>{areaTerritorial}</Text>
            </View>

            <View style={styles.infoCard}>
              <Ionicons name="thermometer" size={24} color="#4A90E2" />
              <Text style={styles.infoTitle}>Clima</Text>
              <Text style={styles.infoValue}>{clima}</Text>
            </View>
          </View>

          <View style={styles.valeInfo}>
            <Text style={styles.valeTitle}>Sobre o Vale do Ribeira</Text>
            <Text style={styles.valeText}>
              O Vale do Ribeira é uma região localizada entre os estados de São Paulo e Paraná, 
              conhecida por sua rica biodiversidade, preservação ambiental e comunidades tradicionais. 
              A região abriga a maior área contínua de Mata Atlântica do Brasil.
            </Text>
        </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
    container: {
      flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: '#E0E0E0',
    marginTop: 5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#2C3E50',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 12,
    color: '#5A6C7D',
    textAlign: 'center',
  },
  valeInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  valeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
        textAlign: 'center',
  },
  valeText: {
    fontSize: 16,
    color: '#5A6C7D',
    lineHeight: 24,
    textAlign: 'justify',
  },
  });