/**
 * Created by liangfangzheng on 2018/6/16.
 */
import React, { PureComponent } from 'react';
import {
	Text,
	View,
} from 'react-native';

export default class Me extends PureComponent {

	constructor() {
		super();
	}

	loadData() {
		return fetch('http://zhan-toefl.smartstudy.com/api/mobile/zhike/camps?examinationId=1', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	render() {
		return <View>
			<Text>我是ME</Text>
		</View>;
	}
}