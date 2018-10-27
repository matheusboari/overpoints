import axios from 'axios'

export const http = axios.create({
	// baseURL: 'http://localhost:3000/api/'
})

export default function install (Vue) {
	Object.defineProperty(Vue.prototype, '$http', {
		get () {
			return http
		}
	})
}