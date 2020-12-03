import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageInfo from './pages/CreateOrphanage/OrphanageInfo';
import Header from './components/Header';

const {Navigator, Screen} = createStackNavigator();


const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{
        headerShown: false, 
        cardStyle: { backgroundColor: '#f2f3f5'}
        }}>
        <Screen name="OrphanagesMap" component={OrphanagesMap}/>
        <Screen 
        name="OrphanageDetails" 
        component={OrphanageDetails}
        options={{
          headerShown: true,
          header:  () => <Header showCancel={false} title="Orphanage"/>
        }}
        />
        <Screen 
        name="SelectMapPosition" 
        component={SelectMapPosition}
        options={{
          headerShown: true,
          header:  () => <Header title="Select position on map"/>
        }}
        />
        <Screen 
        name="OrphanageInfo" 
        component={OrphanageInfo}
        options={{
          headerShown: true,
          header:  () => <Header title="Add an orphanage"/>
        }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;