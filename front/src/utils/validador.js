export const validador = {
    estaVazio(texto) {
        return texto === null || texto.trim() === ""
    },
    validarSelect(select) {
        return select === null || select === ""
    },
   

}