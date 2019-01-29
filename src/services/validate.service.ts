class ValidateService {
    public isValidLength(value: string | any[]= '', len: number = 8): boolean {
        return value.length >= len;
    }

    public isUppercasePresent(value: string): boolean {
        return /[A-Z]/.test(value);
    }

    public isLowercasePresent(value: string): boolean {
        return /[a-z]/.test(value);
    }

    public doesPasswordsMatch(value: string, confirm: string): boolean {
        return value === confirm;
    }

    public isNumberPresent(value: string): boolean {
        return /\d/.test(value);
    }

    public isPostalCode(value: string): boolean {
        return /^\d{5}$/.test(value);
    }

    public isPhoneNumber(phone: string): boolean {
        if (typeof phone !== 'undefined' && phone.trim() !== '') {
            const num = phone.replace('+1', '');
            return /^\d{10}$/.test(num);
        }

        return false;
    }

    public isEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    public isValueInObject(val: any, list: any[], label: string): boolean {
        return !list.filter((item: any) => item[label] === val).length;
    }
}

export default ValidateService;
