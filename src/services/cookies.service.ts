class CookiesService {
    public getCookie(name: string): string | null {
        const match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) {
            return match[1];
        }

        return null;
    }

    public setCookie(name: string, value: string): void {
        document.cookie = `${name}=${value}`;
    }

    public deleteCookie(name: string): void {
        document.cookie = `${name} =; Max-Age=-99999999;`;
    }
}

export default CookiesService;
