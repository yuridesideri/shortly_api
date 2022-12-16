import generator from "generate-password";


export function generateKey(){
    const password = generator.generate({
        length: 32,
        numbers: true,
        symbols: true,
    })

    return password;
}