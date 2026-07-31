import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { HomeScreen, LoginScreen } from './src/screens';
import { notificationService } from './src/services';
import { AppProvider } from './src/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize notification service
      await notificationService.initialize();

      // Schedule default reminders
      await notificationService.scheduleWaterReminder(2);

      const loginState = await AsyncStorage.getItem('@user_logged_in');
      if (loginState === 'true') {
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Error initializing app:', err);
      setError('Erro ao inicializar o aplicativo');
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = async () => {
    try {
      await AsyncStorage.setItem('@user_logged_in', 'true');
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Erro ao salvar estado de login:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@user_logged_in');
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Erro ao deslogar:', err);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <HomeScreen onLogout={handleLogout} />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
  },
});
