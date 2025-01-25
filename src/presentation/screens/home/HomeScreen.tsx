import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import PokeballBg from '../../components/ui/PomkeonBg';
import { Text } from 'react-native-paper';
import { globalTheme } from '../../../config/theme/global-theme';
import PokemonCard from '../../components/pokemons/PokemonCard';

const HomeScreen = () => {
  const { isLoading, data: pokemons = [] } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0), staleTime: 1000 * 60 * 60, //60 min
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: 16 }}
        ListHeaderComponent={() => (
          <Text variant="displayMedium" >Pokedex</Text>
        )}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
