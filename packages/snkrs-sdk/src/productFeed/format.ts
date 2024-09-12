import type { Level, ProductFeed, ProductInfo } from './model.ts'

interface Size {
	id: string
	gtin: string
	size: string
	level: Level
}

export const formatProductFeedResponse = (productsFeed: ProductFeed[]) =>
	productsFeed.map((productFeed) => getRelease(productFeed))

const getRelease = (productFeed: ProductFeed) => ({
	...productFeed,
	slug: productFeed.publishedContent.properties.seo.slug,
	title: productFeed.publishedContent.properties.coverCard.properties.title,
	models: productFeed.productInfo.map((product) => getProductModel(product)),
})

const getProductModel = (product: ProductInfo) => ({
	...product,
	modelName: product.merchProduct.labelName,
	id: product.merchProduct.id,
	sizes: getSizes(product),
})

const getSizes = ({ skus, availableGtins }: ProductInfo) => {
	const sizes: Size[] = []
	for (const { gtin, nikeSize, id } of skus) {
		const level = availableGtins?.find((available) => available.gtin === gtin)?.level
		if (!level) continue
		sizes.push({ id, gtin, size: nikeSize, level })
	}
	return sizes
}
