import { CountryProperty, customList } from 'country-codes-list';

export const countryCodesData = Object.keys(
  customList('countryCode' as CountryProperty),
);
