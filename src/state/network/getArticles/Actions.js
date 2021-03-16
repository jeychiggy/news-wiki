import HandleRequest from '../HandleRequest'
import { GET_ARTICLES_REQUEST, GET_ARTICLES_SUCCESS, GET_ARTICLES_FAILURE } from './Types'

export const getArticlesSuccess = payload => ({
	type: GET_ARTICLES_SUCCESS,
	payload
})

export const getArticlesFailure = payload => ({
	type: GET_ARTICLES_FAILURE,
	payload
})

export const getArticlesRequest = (payload = {}) => dispatch => {
	const { config = {}, ...params } = payload

	const apiKey = '3c4d2fa9ac704c73982a2dc9dc307ffe'

	dispatch({
		type: GET_ARTICLES_REQUEST,
		payload: params
	})

	let queryString = '?'
	if (params.sources) queryString += `sources=${params.sources}&apiKey=${apiKey}`

	return HandleRequest({
		actionSuccess: getArticlesSuccess,
		actionFailure: getArticlesFailure,
		dispatch,
		requestConfig: {
			method: 'get',
			url: `top-headlines${queryString}`
		}
	})
}
