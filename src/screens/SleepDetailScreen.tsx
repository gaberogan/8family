import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Button, ScrollView} from 'react-native';
import Text from '../components/Text';

export default function SleepDetailScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: '#fff'}}>Sleep Detail Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}
