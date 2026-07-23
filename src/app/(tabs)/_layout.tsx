import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import { getUiIcon } from '../../utils/imageMapping';
import { useTheme } from '../../services/ThemeContext';
import { useLanguage } from '../../services/LanguageContext';

function TabIcon({ iconName, focused }: { iconName: string; focused: boolean }) {
  return (
    <Image
      source={getUiIcon(iconName)}
      style={[styles.tabIcon, focused && styles.tabIconActive]}
    />
  );
}

export default function TabsLayout() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: colors.cardBackground, borderTopColor: colors.border }],
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t('tabHome'),
          tabBarIcon: ({ focused }) => <TabIcon iconName="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: t('tabDiscover'),
          tabBarIcon: ({ focused }) => <TabIcon iconName="search" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: t('tabCart'),
          tabBarIcon: ({ focused }) => <TabIcon iconName="cart" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabProfile'),
          tabBarIcon: ({ focused }) => <TabIcon iconName="profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8F5E9',
    paddingTop: 6,
    height: 60,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  tabIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
});