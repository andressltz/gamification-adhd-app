import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

// const API_URL = 'http://localhost:8080'
const API_URL = 'https://api.tarefasgamificadas.com.br'

export const ApiClient = () => {
	// var token = undefined
	// var headers = undefined

	// const getAuth = async () => {
	// 	try {
	// 		const item = await AsyncStorage.getItem('@App:token')
	// 		// console.log(item)
	// 		// console.log(item !== null ? JSON.parse(item) : undefined)
	// 		return item
	// 	} catch (error) {
	// 		Alert.alert('Não foi possível carregar do storage', error)
	// 		return undefined
	// 	}
	// }

	// getAuth().then((data) => {
	// 	token = data
	// 	headers = token ? { Authorization: `Bearer ${token}` } : undefined
	// })

	const api = axios.create({
		baseURL: API_URL,
	})

	api.interceptors.request.use(
		async (config) => {
			const token = await AsyncStorage.getItem('@App:token')
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		},
		(error) => Promise.reject(error),
	)

	const get = async (path, params) => {
		try {
			const response = await api.get(path, { params })
			if (response?.data?.error) {
				return response.data.error
			}
			return response
		} catch (error) {
			return errorMessage(error)
		}
	}

	const post = async (path, body, params) => {
		try {
			const response = await api.post(path, body, params)
			if (response?.data?.error) {
				return response.data.error
			}
			return response
		} catch (error) {
			return errorMessage(error)
		}
	}

	const put = async (path, body, params) => {
		try {
			const response = await api.put(path, body, params)
			if (response?.data?.error) {
				return response.data.error
			}
			return response
		} catch (error) {
			return errorMessage(error)
		}
	}

	const patch = async (path, body, params) => {
		try {
			const response = await api.patch(path, body, params)
			return response
		} catch (error) {
			return errorMessage(error)
		}
	}

	const del = async (path) => {
		try {
			const response = await api.delete(path)
			if (response?.data?.error) {
				return response.data.error
			}
			return response
		} catch (error) {
			return errorMessage(error)
		}
	}

	const errorMessage = (error) => {
		if (error?.code === 'ERR_NETWORK') {
			return 'Não foi possível se conectar com o servidor.'
		}
		return error?.message
	}

	return { get, post, patch, put, del }
}
