import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import { RecipeListProvider } from './context/RecipeListContext';
import { combineProviders } from './utility_js/combineProviders'

const Providers = combineProviders([
  BrowserRouter,
  RecipeListProvider,
  ThemeProvider,
  AuthProvider,
  LoadingProvider
])
console.dir(Providers);

ReactDOM.render(
  <Providers>
    <App />
  </Providers>
  ,
  document.getElementById('root')
);

