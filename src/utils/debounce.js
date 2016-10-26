export default function debounce(func, wait, immediate) {
	let timeout

	return function() {
		let context = this
    let args = arguments

		function later() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}

		let callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}
