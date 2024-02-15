import React from 'react';
import {
  Text as NativeText,
  TextProps as NativeTextProps,
  StyleSheet,
  useColorScheme,
} from 'react-native';

export type TextProps = NativeTextProps & {light?: boolean};

export default function Text(props: TextProps) {
  const scheme = useColorScheme();
  const style = StyleSheet.flatten([
    scheme === 'dark' ? {color: '#fff'} : {},
    props.style,
  ]);
  return <NativeText {...props} style={style} />;
}
