function matchToy(needle, toyList) {
	return match(needle, toyList.name) || match(needle, toyList.description)
}

function match(needle, haystack) {
	haystack = haystack.toLowerCase()
	needle = needle.toLowerCase()
	return haystack.includes(needle)
}

export { match, matchToy }