import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/pages/SplashScreen';
import Connexion from './src/pages/Connexion';
import Inscription from './src/pages/Inscription';
import Bienvenue from './src/pages/Bienvenue';
import Accueil from "./src/pages/Accueil";
import Notes from './src/pages/Notes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ animationTypeForReplace: 'push' }}
        />
        <Stack.Screen
          name="Connexion"
          component={Connexion}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="Inscription"
          component={Inscription}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Bienvenue"
          component={Bienvenue}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="Accueil"
          component={Accueil}
          options={{ animation: 'slide_from_right', gestureEnabled: false }}
        />
        <Stack.Screen
          name="Notes"
          component={Notes}
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
