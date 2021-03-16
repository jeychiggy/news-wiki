import FlatList from 'flatlist-react'
import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Article, SearchForm } from '../components/'
import { NetworkActions, ContainerActions } from '../state'

class Container extends Component {
	constructor(props) {
		super(props)

		this.state = {
			articles: [],
			publishers: [],
			mainArticle: {},
			publisherFilter: null,
			searchTerm: null
		}
	}

	async componentDidMount() {
		await this.getArticlesRequest()
		this.setMainArticle()
		this.setPublishers()
	}

	getArticlesRequest = async () => {
		const { getArticlesRequest, articlesUpdate } = this.props
		try {
			let response = await getArticlesRequest({ sources: 'techcrunch' })

			await articlesUpdate({
				articles: response?.articles
			})
			this.setArticles()
		} catch (e) {}
	}

	setArticles = () => {
		const { articles } = this.props

		this.setState({
			articles: articles
		})
	}

	setMainArticle = () => {
		const { articles } = this.state

		this.setState({
			mainArticle: articles[0]
		})
	}

	setPublishers = () => {
		const { articles } = this.state

		const authors = []

		if (articles.length > 0) articles.forEach(article => authors.push(article.author))

		this.setState({
			publishers: authors
		})
	}

	renderArticle = ({ article, key }) => (
		<Article
			articleTitle={article.title}
			buttonText="READ MORE"
			imgSource={article.urlToImage}
			key={key}
			publishedDate={article.publishedAt}
			publisher={article.author}
		/>
	)

	renderArticleList = () => {
		const { articles, searchTerm } = this.state

		const renderedData = searchTerm ? this.filterValues() : articles

		return (
			<div>
				<FlatList
					display={{ grid: true }}
					list={renderedData}
					renderItem={(article, index) => this.renderArticle({ article: article, key: index })}
				/>
			</div>
		)
	}

	renderPublisherList = () => {
		const { publishers } = this.state

		return (
			<div>
				<p style={{ alignItems: 'center' }}>PUBLISHER</p>
				<FlatList
					list={publishers}
					renderItem={(publisher, index) => (
						<div key={index}>
							<p className="container-publisher-name">{publisher.toUpperCase()}</p>
						</div>
					)}
				/>
			</div>
		)
	}

	onSearchChange = text => {
		this.setState({
			searchTerm: text
		})
	}

	filterValues = () => {
		const { articles, searchTerm } = this.state
		console.log(searchTerm)

		if (searchTerm) {
			const filterData = []

			articles.filter(value => {
				if (value.author.toLowerCase().includes(searchTerm)) {
					filterData.push(value)
				}
				return
			})

			return _.uniq(filterData)
		}
		return articles
	}

	render() {
		const { mainArticle, publishers } = this.state

		return [
			<SearchForm handleChange={text => this.onSearchChange({ text })} key={1} />,
			<div className="container-main-div" key={2}>
				<div style={{ width: '50%', marginLeft: 80 }}>
					<div style={{ width: '100%', padding: 'inherit', marginBottom: 50 }}>
						<Article
							articleDescription={mainArticle?.description}
							articleTitle={mainArticle?.title}
							buttonText="READ MORE"
							imgSource={mainArticle?.urlToImage}
							isMainArticle={!_.isEmpty(mainArticle)}
							publishedDate={mainArticle?.publishedAt}
							publisher={mainArticle?.author}
						/>
					</div>
					{this.renderArticleList()}
				</div>
				<div style={{ marginLeft: 60 }}>{this.renderPublisherList()}</div>
			</div>
		]
	}
}

const mapStateToProps = state => ({
	articles: state.container.articles.articles
})

const mapDispatchToProps = dispatch => ({
	getArticlesRequest: payload => dispatch(NetworkActions.getArticlesRequest(payload)),
	articlesUpdate: payload => dispatch(ContainerActions.articlesUpdate(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)
