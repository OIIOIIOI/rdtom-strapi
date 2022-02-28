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
		
		return await super.find(ctx)
	},
	async findOne(ctx) {
		const populateList = [
			'answers',
		]
		// Push any additional query params to the array
		populateList.push(ctx.query.populate)
		ctx.query.populate = populateList.join(',')
		
		return await super.findOne(ctx)
	},
	async getRandom(ctx) {
		const populateList = [
			'answers',
		]
		// Push any additional query params to the array
		populateList.push(ctx.query.populate)
		ctx.query.populate = populateList.join(',')
		
		const { data, meta } = await super.index(ctx);
		console.log(data)
		
		return await super.index(ctx)
	}
}));
