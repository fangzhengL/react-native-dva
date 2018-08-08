import {
	createStackNavigator,
} from 'react-navigation';

import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import {
	reduxifyNavigator,
	createReactNavigationReduxMiddleware,
	createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import React from 'react';
import Home from './src/container/home';
import Me from './src/container/me';

const HomeNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: Home,
			path: 'Home',
			navigationOptions: {
				title: '训练营',
				headerStyle: {
					backgroundColor: 'red',
				},
			},
		},
		Account: {screen: Me},
	},
	{
		tabBarComponent: BottomTabBar,
		initialRouteName: 'Home',
		tabBarPosition: 'bottom',
		swipeEnabled: false,
		animationEnabled: false,
		lazyLoad: false,
	},
);

const AppNavigator = createStackNavigator(
	{
		HomeNavigator: {screen: HomeNavigator},
		Detail: {
			screen: Me,
			navigationOptions: {
				title: '训练营',
				headerStyle: {
					backgroundColor: 'red',
				},
			},
		},
	},
	{
		headerMode: 'float',
	},
);

export const routerReducer = createNavigationReducer(AppNavigator);

export const routerMiddleware = createReactNavigationReduxMiddleware(
	"root",
	state => state.router,
);

const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
	state: state.router,
});
const AppWithNavigationState = connect(mapStateToProps)(App);


class Root extends React.Component {
	render() {
		console.log(this.props, 'this.props');
		return (
			<AppWithNavigationState/>
		);
	}
}


export default Root;