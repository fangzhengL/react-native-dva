import configs from '../configs';
import {get} from 'lodash';
export const send = async(Api, payload) => {
	const resolve = get(payload, 'resolve');
	const reject = get(payload, 'reject');

	console.log(resolve, 'resolve');
	return new Promise(async(Presove, Preject) => {
		let timer = setTimeout(() => {
			reject('超时');
		}, 15000);
		try {
			const { method, path, baseUrl} = Api;

			const res = await fetch(`${baseUrl}${path}?examinationId=${payload.examinationId}&page=${payload.page}`, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if(res) {
				const json = res.json();
				clearTimeout(timer);
				timer = null;
				!!resolve && resolve(json);
				Presove(json);
			} else {
				!!reject && reject();
				Preject();
			}
		} catch(e) {
			!!reject && reject(e);
			Preject(e);
		}

	});
};