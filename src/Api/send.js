import configs from '../configs';
import {get} from 'lodash';
import queryString from 'query-string';
export const send = async(Api, payload) => {
	const resolve = get(payload, 'resolve');
	const reject = get(payload, 'reject');
	delete payload.resolve, 
	delete payload.reject
	console.log(payload);
	const parame = queryString.stringify(payload)
	return new Promise(async(Presove, Preject) => {
		let timer = setTimeout(() => {
			reject('超时');
		}, 15000);
		try {
			const { method, path, baseUrl} = Api;			
			const url = `${baseUrl}${path}?${parame}`
			const res = await fetch(url).then(res => {
				return res.json()
			});
			if(res) {
				const json = res;
				clearTimeout(timer);
				timer = null;
				!!resolve && resolve(json);
				Presove(json);
			} else {
				!!reject && reject();
				Preject();
			}
		} catch(e) {
			console.log(e);
			!!reject && reject(e);
			Preject(e);
		}

	});
};