import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Card, Button, ProgressCircle } from '../components';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, DAILY_GOALS } from '../utils/constants';
import { getGreeting, formatDate } from '../utils/dateUtils';

interface HomeScreenProps {
  navigation?: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [steps, setSteps] = useState(0);
  const [water, setWater] = useState(0);
  const [calories, setCalories] = useState(0);
  const [sleep, setSleep] = useState(0);

  useEffect(() => {
    // Simulated data - replace with actual data from storage/API
    setSteps(7542);
    setWater(1200);
    setCalories(1450);
    setSleep(7.5);
  }, []);

  const stepsProgress = steps / DAILY_GOALS.steps;
  const waterProgress = water / DAILY_GOALS.water;
  const caloriesProgress = calories / DAILY_GOALS.calories;
  const sleepProgress = sleep / DAILY_GOALS.sleep;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}! 👋</Text>
            <Text style={styles.date}>{formatDate(new Date())}</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Text style={styles.avatarText}>JP</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Summary */}
        <Card variant="elevated" style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Resumo do Dia</Text>
          <View style={styles.progressGrid}>
            <View style={styles.progressItem}>
              <ProgressCircle
                progress={stepsProgress}
                size={80}
                strokeWidth={6}
                color={COLORS.primary}
                label="Passos"
                value={`${steps.toLocaleString()}`}
              />
            </View>
            <View style={styles.progressItem}>
              <ProgressCircle
                progress={waterProgress}
                size={80}
                strokeWidth={6}
                color={COLORS.info}
                label="Água"
                value={`${water}ml`}
              />
            </View>
            <View style={styles.progressItem}>
              <ProgressCircle
                progress={caloriesProgress}
                size={80}
                strokeWidth={6}
                color={COLORS.accent}
                label="Calorias"
                value={`${calories}`}
              />
            </View>
            <View style={styles.progressItem}>
              <ProgressCircle
                progress={sleepProgress}
                size={80}
                strokeWidth={6}
                color={COLORS.secondary}
                label="Sono"
                value={`${sleep}h`}
              />
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: COLORS.info + '20' }]}>
              <Text style={styles.quickActionEmoji}>💧</Text>
            </View>
            <Text style={styles.quickActionText}>Água</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: COLORS.accent + '20' }]}>
              <Text style={styles.quickActionEmoji}>🍽️</Text>
            </View>
            <Text style={styles.quickActionText}>Refeição</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: COLORS.secondary + '20' }]}>
              <Text style={styles.quickActionEmoji}>💊</Text>
            </View>
            <Text style={styles.quickActionText}>Remédio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: COLORS.moodHappy + '20' }]}>
              <Text style={styles.quickActionEmoji}>😊</Text>
            </View>
            <Text style={styles.quickActionText}>Humor</Text>
          </TouchableOpacity>
        </View>

        {/* Mood Check */}
        <Card style={styles.moodCard}>
          <Text style={styles.cardTitle}>Como você está se sentindo?</Text>
          <View style={styles.moodOptions}>
            {['😊', '😐', '😢', '😰', '😴'].map((emoji, index) => (
              <TouchableOpacity key={index} style={styles.moodOption}>
                <Text style={styles.moodEmoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            title="Registrar Humor"
            variant="primary"
            onPress={() => {}}
            style={styles.moodButton}
          />
        </Card>

        {/* Streak Info */}
        <Card style={styles.streakCard}>
          <View style={styles.streakContent}>
            <View style={styles.streakInfo}>
              <Text style={styles.streakEmoji}>🔥</Text>
              <View>
                <Text style={styles.streakCount}>7 dias</Text>
                <Text style={styles.streakLabel}>Sequência de atividades</Text>
              </View>
            </View>
            <Text style={styles.streakGoal}>Meta: 30 dias</Text>
          </View>
          <View style={styles.streakProgress}>
            <View style={styles.streakProgressBar}>
              <View style={[styles.streakProgressFill, { width: '23%' }]} />
            </View>
          </View>
        </Card>

        {/* Modules Grid */}
        <Text style={styles.sectionTitle}>Módulos</Text>
        <View style={styles.modulesGrid}>
          <TouchableOpacity style={styles.moduleCard}>
            <Text style={styles.moduleEmoji}>🚶</Text>
            <Text style={styles.moduleTitle}>Atividade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moduleCard}>
            <Text style={styles.moduleEmoji}>🍎</Text>
            <Text style={styles.moduleTitle}>Nutrição</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moduleCard}>
            <Text style={styles.moduleEmoji}>😴</Text>
            <Text style={styles.moduleTitle}>Sono</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moduleCard}>
            <Text style={styles.moduleEmoji}>🩸</Text>
            <Text style={styles.moduleTitle}>Ciclo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moduleCard}>
            <Text style={styles.moduleEmoji}>💊</Text>
            <Text style={styles.moduleTitle}>Medicamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moduleCard}>
            <Text style={styles.moduleEmoji}>🧠</Text>
            <Text style={styles.moduleTitle}>Bem-estar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  date: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  progressItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  moodCard: {
    backgroundColor: COLORS.surface,
  },
  cardTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.md,
  },
  moodOption: {
    padding: SPACING.sm,
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodButton: {
    marginTop: SPACING.xs,
  },
  streakCard: {
    backgroundColor: COLORS.surface,
  },
  streakContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakEmoji: {
    fontSize: 32,
    marginRight: SPACING.sm,
  },
  streakCount: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  streakLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  streakGoal: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  streakProgress: {
    marginTop: SPACING.xs,
  },
  streakProgressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  streakProgressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.full,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleCard: {
    width: '31%',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  moduleEmoji: {
    fontSize: 28,
    marginBottom: SPACING.xs,
  },
  moduleTitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;
