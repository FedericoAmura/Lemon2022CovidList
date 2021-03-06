import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { useLoading } from '@rootstrap/redux-tools';
import { object } from 'prop-types';

import { getCountries } from '@/actions/covid';
import CountryItem from '@/components/CountryItem';
import LoadingBar from '@/components/LoadingBar';
import Separator from '@/components/Separator';
import screens from '@/constants/screens';
import testIds from '@/constants/testIds';
import { Country } from '@/services/covid';

// @ts-ignore
const Countries = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useLoading(getCountries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  // @ts-ignore
  const countries = useSelector(({ covid }) => covid.countries, shallowEqual);

  const goToCountryScreen = useCallback((name: string, slug: string) => {
    navigation.navigate(screens.COUNTRY, { name, slug });
  }, [navigation]);

  const countryKeyExtractor = useCallback((country: Country) => country.Slug, []);
  const renderCountryItem = useCallback(({ item }) => <CountryItem country={item} onPress={() => goToCountryScreen(item.Country, item.Slug)} />,[]);

  return (
    <View style={styles.container} testID={testIds.COUNTRIES_SCREEN.container}>
      {isLoading && <LoadingBar />}
      <FlatList testID={testIds.COUNTRIES_SCREEN.countryList} style={styles.countryList} ItemSeparatorComponent={Separator} data={countries} keyExtractor={countryKeyExtractor} renderItem={renderCountryItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryList: {
    flex: 1,
    width: '100%',
  },
});

Countries.propTypes = {
  navigation: object.isRequired,
};

export default Countries;
