import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useEffect } from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import migrations from "../drizzle/migrations";
import { db } from "@/db/db";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { error: migrationError } = useMigrations(db, migrations);

  if (migrationError) {
    alert("Something went wrong setting up the app.\n" + migrationError);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <BottomSheetModalProvider>
            <Stack
              screenOptions={{
                header: (props) => {
                  const title = getHeaderTitle(props.options, props.route.name);

                  return (
                    <Appbar.Header>
                      {props.back ? (
                        <Appbar.BackAction onPress={props.navigation.goBack} />
                      ) : null}
                      <Appbar.Content title={title} />
                    </Appbar.Header>
                  );
                },
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </BottomSheetModalProvider>
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
