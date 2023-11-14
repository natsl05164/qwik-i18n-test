import  type{ RequestHandler } from "@builder.io/qwik-city";
 
export const onRequest: RequestHandler = async ({request,locale, redirect, url}) => {
    let lang: string | null = null;
    const cookie = request.headers.get('cookie');
    if (cookie) {
        const result = new RegExp('(?:^|; )' + encodeURIComponent('locale') + '=([^;]*)').exec(cookie);
        if (result) {
          lang =result[1];// JSON.parse(result[1])['lang'];
        }
    }
    // Set Qwik locale
    locale(lang);
}