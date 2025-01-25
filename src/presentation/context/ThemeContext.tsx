import React from 'react';
import { PropsWithChildren, createContext } from 'react';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';

import { useColorScheme } from 'react-native';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});


export const ThemeContext = createContext({
  isDark: false,
  theme: LightTheme,
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {

  const colorsScheme = useColorScheme();
  const isDark = colorsScheme === 'dark';
  const theme = isDark ? DarkTheme : LightTheme;

  //Importamos aca PaperProvider y NavigationContainer porque ambnos
  //esperan la prop `theme`
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme} >
        <ThemeContext.Provider value={{ isDark, theme }}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};


