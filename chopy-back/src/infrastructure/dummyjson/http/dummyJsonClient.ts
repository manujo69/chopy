const BASE_URL = 'https://dummyjson.com';

export class DummyJsonApiError extends Error {
    constructor(public readonly status: number, message: string) {
        super(message);
        this.name = 'DummyJsonApiError';
    }
}

async function parseOrThrow<T>(res: Response, path: string): Promise<T> {
    if (!res.ok) {
        throw new DummyJsonApiError(res.status, `DummyJSON request to ${path} failed with status ${res.status}`);
    }
    return res.json() as Promise<T>;
}

export async function dummyJsonFetchJson<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, init);
    return parseOrThrow<T>(res, path);
}

export async function dummyJsonFetchJsonOrNull<T>(path: string, init?: RequestInit): Promise<T | null> {
    const res = await fetch(`${BASE_URL}${path}`, init);
    if (res.status === 404) {
        return null;
    }
    return parseOrThrow<T>(res, path);
}

export function toQueryString(params: Record<string, string | number | undefined>): string {
    const entries = Object.entries(params).filter(
        (entry): entry is [string, string | number] => entry[1] !== undefined,
    );
    if (entries.length === 0) {
        return '';
    }
    const search = new URLSearchParams(entries.map(([key, value]): [string, string] => [key, String(value)]));
    return `?${search.toString()}`;
}
