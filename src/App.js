import './App.css'
import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import Thunk from 'redux-thunk'

import Container from '../src/container'
import reducers from './redux/Reducers'

const store = createStore(reducers, compose(applyMiddleware(Thunk)))

const persistor = persistStore(store)

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Container />
			</PersistGate>
		</Provider>
	)
}

export default App
