import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import PokeballBg from '../../components/ui/PomkeonBg';
import { FAB, Text, useTheme } from 'react-native-paper';
import { globalTheme } from '../../../config/theme/global-theme';
import PokemonCard from '../../components/pokemons/PokemonCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> { }

const HomeScreen = ({ navigation }: Props) => {

  const theme = useTheme();
  const queryClient = useQueryClient();
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async params => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });
      return pokemons;
    },

    getNextPageParam: (lastpage, pages) => pages.length,
    staleTime: 1000 * 60 * 60, //60 min
  });


  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: 16 }}
        ListHeaderComponent={() => (
          <Text variant="displayMedium" >Pokedex</Text>
        )}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
      <FAB label="buscar"
        onPress={() => navigation.push('SearchScreen')}
        color={theme.dark ? 'white' : 'black'}
        style={[{ backgroundColor: theme.colors.primary }, styles.fab]} />

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
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
