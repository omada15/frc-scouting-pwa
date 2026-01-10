export function generateCookie(name: string, value: string | null, days: number) {
    let expires = ""
    if (days) {
        let date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + value + expires + "; path=/"
}
export function readCookie(name: any) { // this function assumes the cookie exists
    let nameEQ = name + "="
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)    
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
}
