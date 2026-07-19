import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { getProductImage } from '../utils/imageMapping';

interface ProductImageProps {
  name?: string;
  category?: string;
  height?: number;
  width?: number;
  borderRadius?: number;
  containerStyle?: ViewStyle;
}

export function ProductImage({
  name,
  category,
  height = 100,
  width = '100%',
  borderRadius = 12,
  containerStyle,
}: ProductImageProps) {
  const imageSource = getProductImage(name, category);

  return (
    <View
      style={[
        styles.container,
        {
          height,
          borderRadius,
        },
        containerStyle,
      ]}
    >
      <Image
        source={imageSource}
        style={[
          styles.image,
          {
            height,
            borderRadius,
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6FBF6',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
});
