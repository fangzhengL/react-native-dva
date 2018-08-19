/**
 * Created by liangfangzheng on 2018/6/17.
 */

import { get } from 'lodash';
import * as Api from '../Api';
import { createAction } from 'redux-actions';

const replaceData = createAction('replaceData');
const mergeData = createAction('mergeData');

export const homeMergeData = createAction('home/mergeData');
export const fetchData = createAction('home/fetchData');

export default {
	namespace: 'home',
	state: {
		data: [],
		list: {},
	},
	reducers: {
		mergeData(state, {payload}) {
			const data = state.data.concat(payload.data);
			return {...state, data};
		},
		replaceData(state, {payload}) {
			return {...state, ...payload};
		},
	},
	effects: {
		* fetchData({payload}, {call, put}) {
			const data = yield call(Api.send, Api.getNeteaseVideo, payload);
			const rows = get(data, '视频');
			if(payload.offset === 0) {
				yield put(replaceData({data: rows}));
			} else {
				yield put(mergeData({data: rows}));
			}
		},
	},
};




