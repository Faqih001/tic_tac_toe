/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// register the app component with the AppRegistry and the name of the app as appName
AppRegistry.registerComponent(appName, () => App);
