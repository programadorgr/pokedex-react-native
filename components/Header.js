import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {headerStyles as styles} from '../styles';

export default function Header({
  tmp,
  setTmp,
  setSearch,
  title,
  description,
  showSearch,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {showSearch && (
        <TextInput
          placeholder="Search for a pokémon by name or number.."
          style={styles.search}
          value={tmp}
          maxLength={20} //Limitamos a 20 caracteres
          onChangeText={text => setTmp(text)}
          // cada vez que el usuario escriba, ese texto lo almacene en tmp
          onEndEditing={() => setSearch(tmp)}
          //se ejecuta al terminar de escribir
        />
      )}
    </View>
  );
}
