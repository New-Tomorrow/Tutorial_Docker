import { useEffect, useState } from "react";

import Botao from "../components/botao";
import CampoCadastro from "../components/campoCadastro";
import SelectCargo from "../components/select";
import { validador } from "../utils/validador";
import { useNavigate, useParams } from "react-router-dom";
const Swal = require('sweetalert2')


const AtualizarFuncionario = () => {
    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [data, setData] = useState("")
    const cargosEmpresa = ["DESENVOLVEDOR", "ADMINISTRADOR"]
    const [cargo, setCargo] = useState("")
    const { id } = useParams();

    let location = useNavigate();
    function comeback() {
        location('/listar');
    }

    function AtualizarFuncionario() {
        if (validador.estaVazio(nome)) {
            Swal.fire({
                icon: 'error',
                title: "O nome não pode estar vazio.",
                text: "Por favor preencha o nome.",
            })
            return
        }
        if (validador.estaVazio(sobrenome)) {
            Swal.fire({
                icon: 'error',
                title: "O sobrenome não pode estar vazio.",
                text: "Por favor preencha o sobrenome.",
            })
            return
        }

        if (!data) {
            Swal.fire({
                icon: 'error',
                title: "A data não pode esta vazia.",
                text: "Por favor preencha a data;.",
            })
            return
        }
        if (validador.validarSelect(cargo)) {
            Swal.fire({
                icon: 'error',
                title: "Por favor selecione uma opção.",
            })
            return
        }

        fetch("http://34.197.2.245:3001/employee/update/" + id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ nome: nome, sobrenome: sobrenome, cargos: cargo, data: data })
        }).then((response) => {
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: "Funcionário atualizado com sucesso.",
                }).then((result) => result.isConfirmed ? comeback() : '')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Erro ao atualizar o funcionário.",
                })
            }
        })
    }
    function getPorId(id) {
        if (id) {
            fetch("http://34.197.2.245:3001/employee/one/" + id, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((resposta) => resposta.json())
                .then((data) => {
                    if (data != null) {
                        setNome(data.nome)
                        setSobrenome(data.sobrenome)
                        setCargo(data.cargos)
                        setData(data.data)
                    }
                });
        }
    }
    useEffect(() => {
        getPorId(id);

    }, [id])
    return (
        <>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
                <div className="w-full bg-white rounded-lg shadow dark:border mt-0 max-w-md p-0 dark:bg-blue-50 dark:border-gray-900">
                    <div className="p-6 space-y-4">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:gray-900">
                            Atualizar Funcionário
                        </h1>
                        <form className="space-y-4" action="#">
                            <CampoCadastro titulo="Nome" type="text" id="nome" placeholder="Digite o nome" value={nome} setValue={setNome} />
                            <CampoCadastro para="sobrenome" titulo="Sobrenome" type="text" name="sobrenome" id="sobrenome" placeholder="Digite o sobrenome" value={sobrenome} setValue={setSobrenome} />
                            <CampoCadastro para="data" titulo="Data de início" type="date" name="data" id="data" value={data} setValue={setData} />
                            <SelectCargo cargo={cargo} setCargo={setCargo} listaCargos={cargosEmpresa} />
                            <Botao titulo="Salvar" className="w-full text-gray-900 bg-blue-200 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onclick={() => AtualizarFuncionario()} />
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AtualizarFuncionario;
