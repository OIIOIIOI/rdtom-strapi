'use strict';

const {getService} = require("@strapi/plugin-i18n/server/utils");
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
		const { getDefaultLocale } = getService('locales');
		// Get requested or default locale
		const locale = ctx.query.locale || await getDefaultLocale()
		// Get count for locale
		const count = await strapi.db.query('api::question.question').count({
			where: {
				locale: { $eq: locale },
			},
		})
		// Randomize offset
		const randomOffset = Math.floor(Math.random()*count)
		// Create custom query
		let entity = await strapi.db.query('api::question.question').findOne({
			populate: { 'answers': true },
			where: {
				locale: { $eq: locale },
			},
			orderBy: 'id',
			offset: randomOffset,
			limit: 1,
		})
		// Sanitize data
		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
		// Return transformed response
		return this.transformResponse(sanitizedEntity)
	}
}));
