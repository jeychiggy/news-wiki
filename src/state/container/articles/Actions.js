import * as Types from '../Types'

export const articlesUpdate = payload => ({
	type: Types.ARTICLES_UPDATE,
	payload
})

export const articlesClear = payload => ({
	type: Types.ARTICLES_CLEAR,
	payload
})
