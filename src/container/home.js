/**
 * Created by liangfangzheng on 2018/6/16.
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { fetchData, homeMergeData } from '../models/home';
import { createPromise } from '../utils';
import { FlatListState } from '../components';

const queryParams = {
	'channel': 'T1457068979049',
	'subtab': 'Video_Comic',
	'passport': '',
	'devId': 'Yot35DNkCmCjhl+DiPBAEtCw9+TJu7Lh/rwgZSt0OXOajwqSf9r37EcT2ocnU/pA',
	'version': '33.1',
	'spever': 'false',
	'net': 'wifi',
	'lat': 'hz22gEWHhRVC86Sj4K/Ckg==',
	'lon': 'hgi37bA86qxyvamJLQDsSw==',
	'ts': '1519652509',
	'sign': 'M2Y3hkCYcLfWUYz5RGMhywQxOlUESmVBPlenRJoT3hZ48ErR02zJ6/KXOnxX046I',
	'encryption': '1',
	'canal': 'appstore',
	'size': '10',
	'fn': '1'
}

class App extends PureComponent {

    constructor() {
		super();
		this.state = {
			offset: 0,
			refreshing: false
		}
	}

	componentDidMount() {
       this.props.fetchData({
		   ...queryParams,
		   offset: this.state.offset,
	   });
    }
    renderRow = data => {
		return (
		    <Image 
			   style={{marginTop: 10, width: 375, height: 200}} 
			   source={{uri: data.item.cover}}
			/>
		)
	}
	onRefresh = async() => {
		this.setState({refreshing: true})
        const { fetchData } = this.props;
		await createPromise(fetchData, {
			...queryParams,
			offset: 0,
		})
		this.setState({refreshing: false})
	}

	onEndReached = async() => {
		const { fetchData } = this.props;
	    const data = await createPromise(fetchData, {
			...queryParams,
			offset: this.state.offset + 1,
		})
		this.setState({offset: this.state.offset + 1})
		console.log(data);
	}

	render() {
	    const { home } = this.props;
		const data = home.data;
		return (
			<View>
				<FlatListState
				  data={data}
				  refreshing={this.state.refreshing}
				  onRefresh={this.onRefresh}
				  renderItem={this.renderRow}
				  onEndReached={this.onEndReached}
				/>
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