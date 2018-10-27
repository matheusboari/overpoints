class Utils {
    
}

export default {
	install (Vue) {
		Vue.prototype.$utils = new Utils()
	}
}