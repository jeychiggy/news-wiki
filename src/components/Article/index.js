/* eslint-disable react/jsx-no-literals */
import { Button } from '@material-ui/core'
import React, { memo } from 'react'

const Article = ({
	isMainArticle,
	imgSource,
	publisher,
	articleDescription,
	articleTitle,
	publishedDate,
	buttonText,
	onClickButton
}) =>
	isMainArticle ? (
		<div className="main-article" style={{ width: '100%' }}>
			<img alt="article_img" className="article-img" src={imgSource} style={{ height: 150, width: '100%' }} />
			<div className="main-date">
				<p className="main-publisher">{publisher}</p>
				<p className="published-date">{publishedDate}</p>
			</div>
			<p className="article-title">{articleTitle}</p>
			<p className="article-desc">{articleDescription}</p>

			<Button variant="contained" onClick={onClickButton}>
				{buttonText}
			</Button>
		</div>
	) : (
		<div className="article" style={{ width: '100%', flex: 1, borderWidth: 1 }}>
			<img alt="article_img" className="article-img" src={imgSource} style={{ height: 150, width: '100%' }} />
			<p className="publisher">{publisher}</p>
			<p className="article-title">{articleTitle}</p>
			<p className="published-date">{publishedDate}</p>
			<Button variant="outlined" onClick={onClickButton}>
				{buttonText}
			</Button>
		</div>
	)

export default memo(Article)
