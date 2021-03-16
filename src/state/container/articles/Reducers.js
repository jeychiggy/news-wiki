import * as Types from '../Types'

const initialState = {
	articles: []
}

export default (currentState = initialState, action) => {
	const { payload: { articles } = {} } = action

	switch (action.type) {
		case Types.ARTICLES_UPDATE:
			return {
				...currentState,
				articles: articles || currentState.articles
			}

		case Types.ARTICLES_CLEAR:
			return {
				...initialState
			}

		default:
			return currentState
	}
}
