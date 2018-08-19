import PropTypes from 'prop-types';
const {
	number,
	shape,
	oneOf,
	string,
	arrayOf,
} = PropTypes;
import  configs  from '../configs';
const baseUrl = configs.baseUrl;
const GET = 'GET';
const POST = 'POST';

// function fetchNeteaseVideo() {
// 	const fetchUrl = 'https://c.m.163.com/recommend/getChanListNews'
//    const queryParams = {
//    'channel': 'T1457068979049',
//    'subtab': 'Video_Comic',
//    'passport': '',
//    'devId': 'Yot35DNkCmCjhl+DiPBAEtCw9+TJu7Lh/rwgZSt0OXOajwqSf9r37EcT2ocnU/pA',
//    'version': '33.1',
//    'spever': 'false',
//    'net': 'wifi',
//    'lat': 'hz22gEWHhRVC86Sj4K/Ckg==',
//    'lon': 'hgi37bA86qxyvamJLQDsSw==',
//    'ts': '1519652509',
//    'sign': 'M2Y3hkCYcLfWUYz5RGMhywQxOlUESmVBPlenRJoT3hZ48ErR02zJ6/KXOnxX046I',
//    'encryption': '1',
//    'canal': 'appstore',
//    'offset': '0',
//    'size': '10',
//    'fn': '1'
// }
//    return fetchData('GET',fetchUrl,queryParams)
// }

export const getNeteaseVideo = {
	method: GET,
	path: '/recommend/getChanListNews',
	baseUrl,
};

export const getActiveList = {
	method: GET,
	path: '/api/mobile/zhike/camps',
	baseUrl,
	params: shape({
		examinationId: number.isRequired,
		page: number
	}).isRequired,
};


export * from './send'


