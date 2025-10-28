import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const BASE_URL = 'http://10.239.0.200:8080/prova_victortheodoro';

export default function PontosTuristicos({ route }) {
  const [busca, setBusca] = useState('');

  // Pontos turísticos do Vale do Ribeira (usando imagens no XAMPP)
  const pontosTuristicos = [
    {
      id: 1,
      nome: 'Praia de Cananéia',
      descricao: 'Trecho de praia preservada com acesso por ilhas e manguezais.',
      imagem: `${BASE_URL}/img/praia_cananeia.jpg`,
      rating: 4.8,
      tipo: 'Praia',
      cidade: 'Cananéia/SP',
    },
    {
      id: 2,
      nome: 'Praça Matriz de Jacupiranga',
      descricao: 'Praça central tradicional, ponto de encontro da cidade.',
      imagem: `${BASE_URL}/img/pracamatriz_jacupiranga.jpg`,
      rating: 4.5,
      tipo: 'Praça',
      cidade: 'Jacupiranga/SP',
    },
    {
      id: 3,
      nome: 'Praia de Ilha Comprida',
      descricao: 'Extensa faixa litorânea com dunas e restingas, ideal para ecoturismo.',
      imagem: `${BASE_URL}/img/praia_ilha_comprida.jpg`,
      rating: 4.7,
      tipo: 'Praia',
      cidade: 'Ilha Comprida/SP',
    },
    {
      id: 4,
      nome: 'Praça Japonesa de Registro',
      descricao: 'Espaço cultural que celebra a imigração japonesa no Vale do Ribeira.',
      imagem: `${BASE_URL}/img/pracajaponesa_registro.jpg`,
      rating: 4.6,
      tipo: 'Cultura',
      cidade: 'Registro/SP',
    },
    {
      id: 5,
      nome: 'Casa de Pedra de Pariquera-Açu',
      descricao: 'Construção histórica em pedra, símbolo do patrimônio local.',
      imagem: `${BASE_URL}/img/casadepedra_pariquera.jpg`,
      rating: 4.4,
      tipo: 'Histórico',
      cidade: 'Pariquera-Açu/SP',
    },
    {
      id: 6,
      nome: 'Caverna do Diabo',
      descricao: 'Uma das maiores cavernas do Brasil, com formações rochosas impressionantes.',
      imagem: `${BASE_URL}/img/cavernadodiabo_eldorado.jpg`,
      rating: 4.9,
      tipo: 'Caverna',
      cidade: 'Eldorado/SP',
    },
  ];

  const pontosFiltrados = pontosTuristicos.filter(ponto =>
    ponto.nome.toLowerCase().includes(busca.toLowerCase()) ||
    ponto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
    ponto.cidade.toLowerCase().includes(busca.toLowerCase())
  );

  const renderPontoTuristico = (ponto) => (
    <TouchableOpacity key={ponto.id} style={styles.card}>
      <ImageBackground 
        source={{ uri: ponto.imagem }} 
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.imageOverlay}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{ponto.rating}</Text>
          </View>
          <View style={styles.tipoContainer}>
            <Text style={styles.tipo}>{ponto.tipo}</Text>
          </View>
        </View>
      </ImageBackground>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{ponto.nome}</Text>
        <Text style={styles.cardDescription}>{ponto.descricao}</Text>
        
        <View style={styles.cardFooter}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#4A90E2" />
            <Text style={styles.locationText}>{ponto.cidade}</Text>
          </View>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
            <Ionicons name="arrow-forward" size={16} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={{ uri: `${BASE_URL}/img/vale_ribeira_bg.jpg` }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Ionicons name="leaf" size={32} color="#FFFFFF" />
            <Text style={styles.title}>Pontos Turísticos</Text>
            <Text style={styles.subtitle}>Vale do Ribeira - SP/PR</Text>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar pontos turísticos..."
                placeholderTextColor="#8E8E93"
                value={busca}
                onChangeText={setBusca}
              />
              {busca.length > 0 && (
                <TouchableOpacity onPress={() => setBusca('')}>
                  <Ionicons name="close-circle" size={20} color="#8E8E93" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="location" size={24} color="#4A90E2" />
              <Text style={styles.statNumber}>{pontosTuristicos.length}</Text>
              <Text style={styles.statLabel}>Pontos</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="star" size={24} color="#FFD700" />
              <Text style={styles.statNumber}>4.7</Text>
              <Text style={styles.statLabel}>Avaliação</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="leaf" size={24} color="#4CAF50" />
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>Mata Atlântica</Text>
            </View>
          </View>

          <View style={styles.pointsContainer}>
            {pontosFiltrados.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="search" size={48} color="#8E8E93" />
                <Text style={styles.emptyTitle}>Nenhum ponto encontrado</Text>
                <Text style={styles.emptyText}>
                  Tente buscar por outro termo ou explore todos os pontos turísticos.
                </Text>
              </View>
            ) : (
              pontosFiltrados.map(renderPontoTuristico)
            )}
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statCard: {
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
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#5A6C7D',
    marginTop: 4,
  },
  pointsContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  tipoContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  tipo: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#5A6C7D',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  detailsButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});