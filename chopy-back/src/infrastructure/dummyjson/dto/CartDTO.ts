export interface CartItemDTO {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
}

export interface CartDTO {
    id: number;
    products: CartItemDTO[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface DeletedCartDTO extends CartDTO {
    isDeleted: boolean;
    deletedOn: string;
}

export interface CartListResponseDTO {
    carts: CartDTO[];
    total: number;
    skip: number;
    limit: number;
}
