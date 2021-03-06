import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SessionProvider } from '@/components/Session';
import configureStore from '@/configureStore';

const TEST_SCREEN = 'TestScreen';
const Stack = createStackNavigator();

const renderOtherScreens = (otherScreens: any[]) => {
  // @ts-ignore
  return otherScreens.map(({ name, component }) => {
    return <Stack.Screen key={name} name={name} component={component} />;
  });
}

export const renderWithNavigation = (component: React.ComponentType<any>, componentParams: any = {}, otherScreens?: any[], preloadedState?: any) => {
  const store = configureStore(preloadedState);

  const App = () => (
    <Provider store={store}>
      <SessionProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              key={TEST_SCREEN}
              name={TEST_SCREEN}
              component={component}
              initialParams={componentParams}
            />
            {otherScreens && renderOtherScreens(otherScreens)}
          </Stack.Navigator>
        </NavigationContainer>
      </SessionProvider>
    </Provider>
  );

  return { ...render(<App />) };
};
