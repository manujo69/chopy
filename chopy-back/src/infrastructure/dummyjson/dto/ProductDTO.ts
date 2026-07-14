export interface ProductDimensionsDTO {
    width: number;
    height: number;
    depth: number;
}

export interface ProductReviewDTO {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface ProductMetaDTO {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}

export interface ProductDTO {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: ProductDimensionsDTO;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: ProductReviewDTO[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: ProductMetaDTO;
    thumbnail: string;
    images: string[];
}

export interface DeletedProductDTO extends ProductDTO {
    isDeleted: boolean;
    deletedOn: string;
}

export interface ProductListResponseDTO {
    products: ProductDTO[];
    total: number;
    skip: number;
    limit: number;
}

export interface ProductCategoryDTO {
    slug: string;
    name: string;
    url: string;
}
