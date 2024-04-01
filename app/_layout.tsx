import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

import {useColorScheme} from '@/components/useColorScheme';
import {Appbar, PaperProvider} from "react-native-paper";
import {NavigationBar} from "@/components/NavigationBar";
import {getHeaderTitle} from "@react-navigation/elements";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav/>;
}

function RootLayoutNav() {

  return (
    <PaperProvider>
      <Stack screenOptions={{
        header: (props) => {
          const title = getHeaderTitle(props.options, props.route.name);

          return (
            <Appbar.Header>
              {props.back ? (
                <Appbar.BackAction onPress={props.navigation.goBack}/>
              ) : null}
              <Appbar.Content title={title}/>
            </Appbar.Header>
          )
        },
      }}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      </Stack>
    </PaperProvider>
  );
}
