'use strict';

const {getService} = require("@strapi/plugin-i18n/server/utils");
const _collection = require('lodash/collection');
const Helpers = require('../../../helpers');

/**
 *  rules-section controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::rules-section.rules-section', ({ strapi }) => ({
	async getStructured (ctx)
	{
		const { getDefaultLocale } = getService('locales');
		// Get requested or default locale
		const locale = ctx.query.locale || await getDefaultLocale();
		// Create custom query
		let entities = await strapi.db.query('api::rules-section.rules-section').findMany({
			populate: { 'parent_section': true },
			where: {
				locale: { $eq: locale },
			},
			orderBy: 'order',
		});
		// Init data structure
		let data = [];
		// Filter root chapters
		const chapters = _collection.filter(entities, ['parent_section', null]);
		_collection.forEach(chapters, function(chapter) {
			chapter.children = Helpers.getChildren(entities, chapter, true);
			data.push(chapter);
		});
		// Return structured data
		return data;
		// return entities;
	},
}));
