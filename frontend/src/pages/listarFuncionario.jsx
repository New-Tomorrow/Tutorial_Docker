import { useEffect, useState } from "react"
import Header from "../components/header"
import Botao from "../components/botao"
const Swal = require('sweetalert2')


const ListarFuncionario = () => {
    const header = ["Nome", "Sobrenome", "Cargo", "Data de inicio", "Atualizar", "Deletar"]
    const [funcionarios, setFuncionarios] = useState([])
    const [procurarTermo, setProcurarTermo] = useState('');
    const [funcionariosFiltrados, setFuncionariosFiltrados] = useState([])

    function getData() {
        fetch("http://34.197.2.245:3001/employee/list", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            } 
        }).then((resposta) => resposta.json()).then((data) => {
            setFuncionarios(data)
            setFuncionariosFiltrados(data)
        })
    }

    function filtrarFuncionarios(termo) {
        if (!termo) {
            return funcionarios
        }
        return funcionarios.filter((funcionario) => {
            const campos = JSON.stringify(Object.values(funcionario)) //pegando os campos(valores) de todos os funcionarios
            return campos.toLowerCase().includes(termo.toLowerCase())
        })
    }

    function deletarFunc(id) {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Essa ação não pode ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Deletar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("http://34.197.2.245:3001/employee/delete/", {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ id: id })
                }).then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: "Funcionário deletado com sucesso!",
                        }).then(() => {
                            window.location.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: "Erro ao deletar o funcionário.",
                        });
                    }
                });
            }
        });
    }

    function formatarData(data) {
        const partes = data.split("-");
        const ano = partes[0];
        const mes = partes[1];
        const dia = partes[2];

        return `${dia}/${mes}/${ano}`;
    }

    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        setFuncionariosFiltrados(filtrarFuncionarios(procurarTermo))
    }, [procurarTermo])
    return (
        <>
            <div className="flex flex-col w-auto  justify-center px-6 py-8 mx-auto h-screen">
                <div className="bg-white rounded-lg  shadow dark:border mt-0 max-w-auto p-0 dark:bg-blue-50 dark:border-gray-900">
                    <div className="p-6 space-y-4">
                        <Header titulo="Lista de funcionários"/>
                        <div className="block relative">
                            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </span>
                            <input placeholder="Procurar" onChange={(e) => setProcurarTermo(e.target.value)}
                                className="appearance-none rounded-full border border-gray-400 border-b block pl-8 pr-6 py-2 w-44 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400 content-center">
                                    <tr>
                                        {header.map((header) =>
                                            <th scope="col" className="px-6 py-3" key={header}>
                                                {header}
                                            </th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {funcionariosFiltrados.sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio)).map(funcionario => {

                                        return (
                                            <tr
                                                key={funcionario.nome}
                                                className="bg-white hover:bg-gray-50 dark:hover:bg-gray-300 content-center"
                                            >
                                                <td

                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray"
                                                >
                                                    {funcionario.nome}
                                                </td>
                                                <td

                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray"
                                                >
                                                    {funcionario.sobrenome}
                                                </td>
                                                <td

                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray"
                                                >
                                                    {funcionario.cargos}
                                                </td>
                                                <td

                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray"
                                                >
                                                    {formatarData(funcionario.data)}
                                                </td>

                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                                    <Botao onclick={()=>{
                                                            window.location.href = "/atualizar/" + funcionario.id;
                                                        }} 
                                                        titulo="Atualizar" className="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"/>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                                    <Botao onclick={() => deletarFunc(funcionario.id)}
                                                        titulo="Deletar" className="bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center" />
                                                    
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ListarFuncionario;