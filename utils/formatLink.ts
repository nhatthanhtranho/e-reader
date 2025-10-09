export function formatLink(url: string) {
    if (process.env.NEXT_PUBLIC_APP_ENV === 'PROD') {
        return `${url}.html`;
    }
    if (url === '/' || url === '') {
        return '/';
    }
    
    return `${url}`;
}