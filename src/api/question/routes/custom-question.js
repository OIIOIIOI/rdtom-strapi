module.exports = {
	routes: [
		{
			method: 'GET',
			path: '/questions/random',
			handler: 'question.getRandom',
		}
	]
}