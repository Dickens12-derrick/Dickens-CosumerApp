// features/onboarding/view/SplashScreen.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSplashViewModel } from '../viewmodel/useSplashViewModel';
import LanguagePills from './components/LanguagePills';
import { getUiIcon } from '../../../utils/imageMapping';
import { useLanguage, LanguageCode } from '../../../services/LanguageContext';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const { language, setLanguage, t } = useLanguage();
  const {
    languages,
    onSelectLanguage,
    onGetStarted,
    onBrowseGuest,
    onLogin,
  } = useSplashViewModel();

  const handleSelectLanguage = (lang: LanguageCode) => {
    onSelectLanguage(lang);
    setLanguage(lang);
  };

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
        <Text style={styles.tagline}>{t('tagline')}</Text>

        {/* Illustration: three horizontal produce circles on a shadow ellipse */}
        <View style={styles.illustrationContainer}>
          {/* Produce row */}
          <View style={styles.produceRow}>
            {/* Tomato (Red circle with stem) */}
            <View style={styles.tomatoContainer}>
              <View style={styles.stem} />
              <View style={[styles.produceCircle, styles.produceRed]} />
            </View>
            {/* Orange */}
            <View style={[styles.produceCircle, styles.produceOrange]} />
            {/* Lime/Green */}
            <View style={[styles.produceCircle, styles.produceGreen]} />
          </View>
          {/* Shadow ellipse */}
          <View style={styles.shadowEllipse} />
        </View>
      </LinearGradient>

      {/* Bottom white panel: actions + language pills */}
      <View style={styles.panel}>
        {/* <View style={styles.panelCurve} /> */}

        <Pressable style={styles.primaryButton} onPress={onGetStarted}>
          <Text style={styles.primaryButtonText}>{t('getStarted')}</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onBrowseGuest}>
          <Text style={styles.secondaryButtonText}>{t('browseGuest')}</Text>
        </Pressable>

        <Pressable style={styles.linkButton} onPress={onLogin}>
          <Text style={styles.linkButtonText}>{t('loginText')}</Text>
        </Pressable>

        {/* Language pills at the very bottom */}
        <View style={styles.langRow}>
          <LanguagePills
            languages={languages}
            selected={language}
            onSelect={handleSelectLanguage}
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    width: 200,
    height: 90,
  },
  produceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    zIndex: 2,
  },
  tomatoContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  stem: {
    position: 'absolute',
    top: -6,
    width: 8,
    height: 12,
    backgroundColor: '#66BB6A',
    borderRadius: 1,
    zIndex: 3,
  },
  produceCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  produceRed: {
    backgroundColor: '#EC5B5B',
  },
  produceOrange: {
    backgroundColor: '#FFA82E',
  },
  produceGreen: {
    backgroundColor: '#9CD26A',
  },
  shadowEllipse: {
    marginTop: 6,
    width: 150,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.12)',
    zIndex: 1,
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