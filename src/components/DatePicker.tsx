import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Text from '../components/Text';
import {formatLongDate} from '../services/Datetime';

/**
 * Date display with left and right arrows to navigate forward/back
 */
export default function DatePicker({
  timestamp,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: {
  timestamp: number;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}) {
  return (
    <View style={styles.datePicker}>
      <TouchableOpacity onPress={onPrev} disabled={!canGoPrev}>
        <Image
          source={require('../assets/arrow.png')}
          style={{
            width: 24,
            height: 24,
            resizeMode: 'contain',
            transform: [{rotate: '180deg'}],
            opacity: canGoPrev ? 1 : 0.4,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.datePickerText}>{formatLongDate(timestamp)}</Text>
      <TouchableOpacity onPress={onNext} disabled={!canGoNext}>
        <Image
          source={require('../assets/arrow.png')}
          style={{
            width: 24,
            height: 24,
            resizeMode: 'contain',
            opacity: canGoNext ? 1 : 0.4,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  datePickerText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
