import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ErrorStyles as styles} from '../styles';

export default function Error({tipo, mensaje}) {
  return (
    <View style={styles.container}>
      <Text style={styles.tipo}>
        {tipo === 'notfound' ? (
          <Icon name="search-off" size={30} color={'#ffa31a'} />
        ) : (
          <Icon name="heart-fill" size={30} color={'#ff3300'} />
        )}
      </Text>
      <Text style={styles.mensaje}>{mensaje}</Text>
    </View>
  );
}
