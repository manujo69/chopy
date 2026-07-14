import { Paginated } from '../../../domain/shared/Paginated.js';

export function toPaginated<TDto, TDomain>(
    dtoItems: TDto[],
    envelope: { total: number; skip: number; limit: number },
    mapItem: (dto: TDto) => TDomain,
): Paginated<TDomain> {
    return {
        items: dtoItems.map(mapItem),
        total: envelope.total,
        skip: envelope.skip,
        limit: envelope.limit,
    };
}
