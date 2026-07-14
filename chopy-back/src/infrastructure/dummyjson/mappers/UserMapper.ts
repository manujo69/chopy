import { User, UserAddress, UserBank, UserCompany, UserCrypto, UserHair } from '../../../domain/entities/User.js';
import { UserAddressDTO, UserBankDTO, UserCompanyDTO, UserCryptoDTO, UserDTO, UserHairDTO } from '../dto/UserDTO.js';

function toHair(dto: UserHairDTO): UserHair {
    return { color: dto.color, type: dto.type };
}

function toAddress(dto: UserAddressDTO): UserAddress {
    return {
        address: dto.address,
        city: dto.city,
        state: dto.state,
        stateCode: dto.stateCode,
        postalCode: dto.postalCode,
        coordinates: { lat: dto.coordinates.lat, lng: dto.coordinates.lng },
        country: dto.country,
    };
}

function toBank(dto: UserBankDTO): UserBank {
    return {
        cardExpire: dto.cardExpire,
        cardNumber: dto.cardNumber,
        cardType: dto.cardType,
        currency: dto.currency,
        iban: dto.iban,
    };
}

function toCompany(dto: UserCompanyDTO): UserCompany {
    return {
        department: dto.department,
        name: dto.name,
        title: dto.title,
        address: toAddress(dto.address),
    };
}

function toCrypto(dto: UserCryptoDTO): UserCrypto {
    return { coin: dto.coin, wallet: dto.wallet, network: dto.network };
}

export function toUser(dto: UserDTO): User {
    return {
        id: dto.id,
        firstName: dto.firstName,
        lastName: dto.lastName,
        maidenName: dto.maidenName,
        age: dto.age,
        gender: dto.gender,
        email: dto.email,
        phone: dto.phone,
        username: dto.username,
        password: dto.password,
        birthDate: dto.birthDate,
        image: dto.image,
        bloodGroup: dto.bloodGroup,
        height: dto.height,
        weight: dto.weight,
        eyeColor: dto.eyeColor,
        hair: toHair(dto.hair),
        ip: dto.ip,
        address: toAddress(dto.address),
        macAddress: dto.macAddress,
        university: dto.university,
        bank: toBank(dto.bank),
        company: toCompany(dto.company),
        ein: dto.ein,
        ssn: dto.ssn,
        userAgent: dto.userAgent,
        crypto: toCrypto(dto.crypto),
        role: dto.role,
    };
}
