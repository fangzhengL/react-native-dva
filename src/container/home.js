/**
 * Created by liangfangzheng on 2018/6/16.
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { fetchData, homeMergeData } from '../models/home';
import { createPromise } from '../utils';

class App extends PureComponent {

	constructor() {
		super();
		this.state = {
			currentPage: 1
		}
	}

	componentDidMount() {
		this.props.fetchData({
			examinationId: 1,
			page: this.state.currentPage
		});
	}

	render() {
		return (
			<View>
				<Text>woshiHome</Text>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	home: state.home,
});

const mapDispatchToProps = {
	fetchData,
	homeMergeData
};

export default connect(mapStateToProps, mapDispatchToProps)(App);