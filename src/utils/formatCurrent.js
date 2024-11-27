// export function formatCurrencyBRL(value) {
//     return value.toLocaleString('pt-BR', {
//         style: 'currency',
//         currency: 'BRL'
//     });
// }
export function formatCurrencyBRL(value) {
    if (typeof value !== 'number') {
        value = 0; // Define um valor padrão caso `value` não seja um número
    }
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
