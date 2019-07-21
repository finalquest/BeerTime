import { NavigationActions } from 'react-navigation';

export const navigateTo = (routeName, params) => NavigationActions.navigate({ routeName, params });

export const back = (key = null) => NavigationActions.back({ key });
