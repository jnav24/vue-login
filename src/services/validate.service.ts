class ValidateService {
    public isValidLength(value: string): boolean {
        return value.length >= 8;
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
}

export default ValidateService;
