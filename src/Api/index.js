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


