import { Product, ProductDimensions, ProductMeta, ProductReview } from '../../../domain/entities/Product.js';
import { ProductDTO, ProductDimensionsDTO, ProductMetaDTO, ProductReviewDTO } from '../dto/ProductDTO.js';

function toDimensions(dto: ProductDimensionsDTO): ProductDimensions {
    return { width: dto.width, height: dto.height, depth: dto.depth };
}

function toReview(dto: ProductReviewDTO): ProductReview {
    return {
        rating: dto.rating,
        comment: dto.comment,
        date: dto.date,
        reviewerName: dto.reviewerName,
        reviewerEmail: dto.reviewerEmail,
    };
}

function toMeta(dto: ProductMetaDTO): ProductMeta {
    return {
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
        barcode: dto.barcode,
        qrCode: dto.qrCode,
    };
}

export function toProduct(dto: ProductDTO): Product {
    return {
        id: dto.id,
        title: dto.title,
        description: dto.description,
        category: dto.category,
        price: dto.price,
        discountPercentage: dto.discountPercentage,
        rating: dto.rating,
        stock: dto.stock,
        tags: dto.tags,
        brand: dto.brand,
        sku: dto.sku,
        weight: dto.weight,
        dimensions: toDimensions(dto.dimensions),
        warrantyInformation: dto.warrantyInformation,
        shippingInformation: dto.shippingInformation,
        availabilityStatus: dto.availabilityStatus,
        reviews: dto.reviews.map(toReview),
        returnPolicy: dto.returnPolicy,
        minimumOrderQuantity: dto.minimumOrderQuantity,
        meta: toMeta(dto.meta),
        thumbnail: dto.thumbnail,
        images: dto.images,
    };
}
