'use strict';

/**
 *  question controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::question.question', ({ strapi }) => ({
	async find(ctx) {
		const populateList = [
			'answers',
		]
		// Push any additional query params to the array
		populateList.push(ctx.query.populate)
		ctx.query.populate = populateList.join(',')
		
		const content = await super.find(ctx)
		return content
	}
}));