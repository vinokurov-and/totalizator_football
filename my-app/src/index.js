import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './store/index.js';
import { ApolloProvider } from '@apollo/client';
import client from './services/apollo';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StateProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StateProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
