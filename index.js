
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import './gesture-handler.native.js';

AppRegistry.registerComponent(appName, () => App);
