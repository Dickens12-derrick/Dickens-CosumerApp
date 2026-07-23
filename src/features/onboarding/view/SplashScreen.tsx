// features/onboarding/view/SplashScreen.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSplashViewModel } from '../viewmodel/useSplashViewModel';
import LanguagePills from './components/LanguagePills';
import { getUiIcon } from '../../../utils/imageMapping';
const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const {
    selectedLanguage,
    languages,
    onSelectLanguage,
    onGetStarted,
    onBrowseGuest,
    onLogin,
  } = useSplashViewModel();

  return (
    <View style={styles.container}>
      {/* Top green gradient section: ~65% of screen */}
      <LinearGradient
        colors={['#1B5E20', '#2E7D32']}
        style={styles.gradientSection}
      >
        {/* Logo mark — white rounded square with leaf icon */}
        <View style={styles.logoMark}>
          <Image source={getUiIcon('leaf')} style={styles.leafIcon} />
        </View>

        {/* App name */}
        <Text style={styles.appName}>E-Katale</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Fresh, Farm-direct, Delivered</Text>

        {/* Illustration: three overlapping circles on a shadow ellipse */}
        <View style={styles.illustrationContainer}>
          {/* Shadow ellipse */}
          <View style={styles.shadowEllipse} />
          {/* Overlapping produce circles */}
          <View style={[styles.produceCircle, styles.produceRed]} />
          <View style={[styles.produceCircle, styles.produceOrange, styles.produceOffset1]} />
          <View style={[styles.produceCircle, styles.produceGreen, styles.produceOffset2]} />
        </View>
      </LinearGradient>

      {/* Bottom white panel: actions + language pills */}
      <View style={styles.panel}>
        {/* <View style={styles.panelCurve} /> */}

        <Pressable style={styles.primaryButton} onPress={onGetStarted}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onBrowseGuest}>
          <Text style={styles.secondaryButtonText}>Browse as Guest</Text>
        </Pressable>

        <Pressable style={styles.linkButton} onPress={onLogin}>
          <Text style={styles.linkButtonText}>Already have an account? Log in</Text>
        </Pressable>

        {/* Language pills at the very bottom */}
        <View style={styles.langRow}>
          <LanguagePills
            languages={languages}
            selected={selectedLanguage}
            onSelect={onSelectLanguage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#FFFFFF',
  },
  // --- Top Gradient Section ---
  gradientSection: {
    flex: 0.65,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  logoMark: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    // subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  leafIcon: {
    width: 36,
    height: 36,
    borderRadius: 6,
  },
  appName: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 6,
    letterSpacing: 0.3,
  },
  // --- Illustration ---
  illustrationContainer: {
    width: 160,
    height: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  shadowEllipse: {
    position: 'absolute',
    bottom: 0,
    width: 100,
    height: 14,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  produceCircle: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    bottom: 10,
  },
  produceRed: {
    backgroundColor: '#E53935',
    left: width / 2 - 24 - 100,
  },
  produceOrange: {
    backgroundColor: '#FB8C00',
  },
  produceGreen: {
    backgroundColor: '#43A047',
  },
  produceOffset1: {
    left: width / 2 - 24 - 100 + 28,
    bottom: 24,
  },
  produceOffset2: {
    left: width / 2 - 24 - 100 + 56,
    bottom: 10,
  },
  // --- Bottom White Panel ---
  panel: {
    flex: 0.35,
    paddingHorizontal: 24,
    paddingTop: 32,
    justifyContent: 'space-between',
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    // shadow for button depth
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#1B5E20',
    fontSize: 16,
    fontWeight: '700',
  },
  linkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    marginBottom: 4,
  },
  linkButtonText: {
    color: '#2E7D32',
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  langRow: {
    alignItems: 'center',
  },
});