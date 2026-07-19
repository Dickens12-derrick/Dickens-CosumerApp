// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import { getUiIcon } from '../../utils/imageMapping';

function TabIcon({ iconName, focused }: { iconName: string; focused: boolean }) {
  return (
    <Image
      source={getUiIcon(iconName)}
      style={[styles.tabIcon, focused && styles.tabIconActive]}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#1B5E20',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon iconName="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => <TabIcon iconName="search" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => <TabIcon iconName="cart" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
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