const Botao = ({titulo,onclick,className}) => {
    return (
    <button onClick={onclick} type="button" className={className}>{titulo}</button>
    );
}

export default Botao;