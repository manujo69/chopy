import { Cart, CartItem } from '../../../domain/entities/Cart.js';
import { CartDTO, CartItemDTO } from '../dto/CartDTO.js';

function toCartItem(dto: CartItemDTO): CartItem {
    return {
        id: dto.id,
        title: dto.title,
        price: dto.price,
        quantity: dto.quantity,
        total: dto.total,
        discountPercentage: dto.discountPercentage,
        discountedTotal: dto.discountedTotal,
        thumbnail: dto.thumbnail,
    };
}

export function toCart(dto: CartDTO): Cart {
    return {
        id: dto.id,
        products: dto.products.map(toCartItem),
        total: dto.total,
        discountedTotal: dto.discountedTotal,
        userId: dto.userId,
        totalProducts: dto.totalProducts,
        totalQuantity: dto.totalQuantity,
    };
}
