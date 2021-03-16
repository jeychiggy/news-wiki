import AsyncStorage from '@react-native-async-storage/async-storage'
import { reducer as FormReducer } from 'redux-form'
import { persistCombineReducers } from 'redux-persist'

import { NetworkReducers, ContainerReducers } from '../state'

const config = {
	key: 'root',
	storage: AsyncStorage,
	debug: true
}

const rootReducer = persistCombineReducers(config, {
	container: ContainerReducers,
	network: NetworkReducers,
	form: FormReducer
})

export default rootReducer
