import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/Navigator';
import { useQuery } from '@tanstack/react-query';
import { getPokemonById } from '../../../actions/pokemons';
import { Formatter } from '../../../config/helpers/formatter';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Chip } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { }

const PokemonScreen = ({ route }: Props) => {
  const { pokemonId } = route.params;
  const { isDark } = useContext(ThemeContext);
  const { data: pokemon } = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 60, // 1H
  });
  const pokeballImg = isDark
    ? require('../../../assets/pokeball-dark.png')
    : require('../../../assets/pokeball-light.png');

  if (!pokemon) {
    return ('loading');
  }
  return (
    <ScrollView
      style={{ flex: 1 }}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
          }}>
          {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
        </Text>

        {/* Pokeball */}
        <Image source={pokeballImg} style={styles.pokeball} />

        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
      </View>

      {/* Types */}
      <View
        style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
        {pokemon.types.map(type => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor="white"
            style={{ marginLeft: 10 }}>
            {type}
          </Chip>
        ))}
      </View>

      {/* Sprites */}
      <FlatList
        data={pokemon.sprites}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        style={{
          marginTop: 20,
          height: 100,
        }}
        renderItem={({ item }) => (
          <FadeInImage
            uri={item}
            style={{ width: 100, height: 100, marginHorizontal: 5 }}
          />
        )}
      />


      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default PokemonScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
});
