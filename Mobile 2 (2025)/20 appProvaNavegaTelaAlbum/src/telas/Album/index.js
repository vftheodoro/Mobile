import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BASE_URL = 'http://10.239.0.200:8080/prova_victortheodoro';

export default function Album() {
  const [imagens, setImagens] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const fallback = useMemo(() => [
    // JPGs que já funcionam
    `${BASE_URL}/img/praia_cananeia.jpg`,
    `${BASE_URL}/img/praia_ilha_comprida.jpg`,
    `${BASE_URL}/img/pracamatriz_jacupiranga.jpg`,
    // Possíveis PNGs informados
    `${BASE_URL}/img/casadepedra_selfie.png`,
    `${BASE_URL}/img/cavernadodiabo_selfie.png`,
    `${BASE_URL}/img/pracaderegistro_selfie.png`,
    `${BASE_URL}/img/pracajacupiranga_selfie.png`,
    `${BASE_URL}/img/praiacananeia_selfie_.png`,
    `${BASE_URL}/img/praiailhacomprida_se_.png`,
  ], []);

  const timeoutFetch = async (url, ms = 8000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms);
    try {
      const res = await fetch(url, { signal: controller.signal });
      return res;
    } finally {
      clearTimeout(id);
    }
  };

  const carregar = useCallback(async () => {
    setErro('');
    setLoading(true);
    try {
      const res = await timeoutFetch(`${BASE_URL}/img/`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      const rx = /href=\"([^\"]+\.(?:jpg|jpeg|png|gif|webp))\"/gi;
      const urls = new Set();
      let m;
      while ((m = rx.exec(html)) !== null) {
        const nome = m[1].replace(/^\.\//, '').replace(/^\//, '');
        urls.add(`${BASE_URL}/img/${nome}`);
      }
      const list = Array.from(urls);
      if (list.length === 0) {
        setErro('Índice sem imagens. Exibindo fallback.');
        setImagens(fallback);
      } else {
        setImagens(list);
      }
    } catch (e) {
      setErro('Falha ao carregar automaticamente. Exibindo fallback.');
      setImagens(fallback);
    } finally {
      setLoading(false);
    }
  }, [fallback]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await carregar();
    setRefreshing(false);
  }, [carregar]);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity activeOpacity={0.85} style={styles.card}>
      <Image 
        source={{ uri: item }} 
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  ), []);

  const keyExtractor = useCallback((uri, index) => `${uri}-${index}`, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.info}>Carregando álbum...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="images" size={22} color="#4A90E2" />
        <Text style={styles.headerTitle}>Álbum de Fotos</Text>
        <View style={{ width: 22 }} />
      </View>

      {!!erro && <Text style={styles.warning}>{erro}</Text>}

      <FlatList
        data={imagens}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4A90E2"]} />
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  warning: {
    color: '#E67E22',
    textAlign: 'center',
    marginTop: 8,
  },
  listContent: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFF',
    width: '48%',
    height: 160,
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    marginTop: 8,
    color: '#7F8C8D',
  },
});