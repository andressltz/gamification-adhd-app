import axios from "axios";

export const api = axios.create({
	baseURL: 'http:/localhost:8080'
	// baseURL: 'http://macBook-pro-de-andres.local:8080'
})
