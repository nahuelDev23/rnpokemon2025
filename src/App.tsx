import React from 'react';
import { StackNav } from './presentation/navigation/Navigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <StackNav />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

export default App;

