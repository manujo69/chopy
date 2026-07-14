export interface UserHairDTO {
    color: string;
    type: string;
}

export interface UserAddressDTO {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    country: string;
}

export interface UserBankDTO {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

export interface UserCompanyDTO {
    department: string;
    name: string;
    title: string;
    address: UserAddressDTO;
}

export interface UserCryptoDTO {
    coin: string;
    wallet: string;
    network: string;
}

export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: UserHairDTO;
    ip: string;
    address: UserAddressDTO;
    macAddress: string;
    university: string;
    bank: UserBankDTO;
    company: UserCompanyDTO;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: UserCryptoDTO;
    role: string;
}

export interface DeletedUserDTO extends UserDTO {
    isDeleted: boolean;
    deletedOn: string;
}

export interface UserListResponseDTO {
    users: UserDTO[];
    total: number;
    skip: number;
    limit: number;
}
