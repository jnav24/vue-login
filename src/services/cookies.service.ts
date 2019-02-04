class CookiesService {
    public getCookie(name: string): string | null {
        this.resetCookies();
        const match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) {
            return match[1];
        }

        return null;
    }

    public setCookie(name: string, value: string): void {
        const d = new Date();
        d.setTime(d.getTime() + (1000 * 60 * 60 * 24));
        const expire = d.toString();
        document.cookie = `${name}=${value}; expires=${expire}; path=/; SameSite=Strict; domain=`;
    }

    public deleteCookie(name: string): void {
        const d = new Date();
        d.setTime(d.getTime() - (1000 * 60 * 60 * 24));
        const expires = 'expires=' + d.toString();
        document.cookie = `${name} =; ${expires}; path=/; Max-Age=-99999999;`;
    }

    public getStorage(name: string): string | null {
        return localStorage.getItem(name);
    }

    public setStorage(name: string, value: string): void {
        localStorage.setItem(name, value);
    }

    public deleteStorage(name: string): void {
        localStorage.removeItem(name);
    }

    public clearStorage(): void {
        localStorage.clear();
    }

    public checkStorage(store: string, state: string): {} | boolean {
        const storage = this.getStorage(store);

        if (storage) {
            const data = JSON.parse(storage);

            if (data.hasOwnProperty(state)) {
                return data[state];
            }
        }

        return false;
    }

    public addDataToStorage(store: string, state: string, data: {}): void {
        const storage = this.getStorage(store);
        let finalData: {[k: string]: any} = {};

        if (storage) {
            const storedData = JSON.parse(storage);
            (storedData as any)[state] = data;
            finalData = storedData;
        } else {
            finalData[state] = data;
        }

        this.setStorage(store, JSON.stringify(finalData));
    }

    private resetCookies() {
        const newCookies = {};
        const cookieList: string[] = document.cookie.replace(/\s+/, '').split(';');

        for (const cookie of cookieList) {
            const [name, value] = cookie.split('=');
            (newCookies as any)[name] = value;
            this.deleteCookie(name);
        }

        for (const cook of Object.keys(newCookies)) {
            if (cook.trim() !== '') {
                this.setCookie(cook, (newCookies as any)[cook]);
            }
        }
    }
}

export default CookiesService;
