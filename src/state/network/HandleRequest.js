import axios from 'axios'
import _ from 'lodash'

const baseURL = 'http://newsapi.org/v2/'

const ApiKey = '3c4d2fa9ac704c73982a2dc9dc307ffe'

export default ({ actionSuccess, actionFailure, dispatch, requestConfig }) =>
	new Promise((resolve, reject) => {
		const handleSuccess = response => {
			const { data } = response

			dispatch(actionSuccess(data))
			resolve(data)
		}

		const handleError = error => {
			const { response } = error
			let errorResponse

			if (!response) {
				// Set the error for axios time out
				errorResponse = {
					code: 1504,
					messageTitle: 'Connection error',
					messageBody: 'It took too long to get a response, please try again'
				}
			} else if (_.isEmpty(response.data) || (!_.isEmpty(response.data) && !response.data.messageTitle)) {
				// Set the error for a bad server response
				errorResponse = {
					code: 1500,
					messageTitle: 'Something went wrong',
					messageBody: 'An unexpected error occurred, please wait a minute & then try again'
				}
			} else {
				// Use the server response
				errorResponse = response.data
			}

			dispatch(actionFailure(errorResponse))
		}

		axios({
			baseURL: baseURL,
			timeout: 30000,
			...requestConfig
			// headers: {
			// 	'Content-Type': 'application/json',
			// 	// apiKey: ApiKey,
			// 	...requestConfig.headers
			// }
		})
			.then(response => handleSuccess(response))
			.catch(error => handleError(error))
	})
