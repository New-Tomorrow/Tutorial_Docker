import { useState, } from "react";
import Botao from "../components/botao";
import CampoCadastro from "../components/campoCadastro";
import SelectCargo from "../components/select";
import { validador } from "../utils/validador";
import { useNavigate, } from "react-router-dom";
import Header from "../components/header";
const Swal = require('sweetalert2')


const CadastroFuncionario = () => {

  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [data, setData] = useState("")
  const cargos = ["DESENVOLVEDOR", "ADMINISTRADOR"]
  const [cargo, setCargo] = useState("")
  let location = useNavigate();
  function comeback() {
    location('/listar');
  }

  function CadastrarFunc() {
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
        title: "Por favor selecione o cargo.",
      })
      return
    }

    fetch("http://localhost:3001/employee/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ nome: nome, sobrenome: sobrenome, data: data, cargos: cargo }),
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        if (data.error) {
          Swal.fire({
            icon: 'error',
            title: "Erro ao cadastrar o funcionário.",
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: "Funcionário cadastrado com sucesso.",
          }).then((result) => result.isConfirmed ? comeback() : '');
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        Swal.fire({
          icon: 'error',
          title: "Erro ao processar a requisição.",
        });
      });
  }


  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border max-w-md p-0 dark:bg-blue-50 dark:border-gray-900">
          <div className="p-6 space-y-4">
            <Header titulo="Cadastro de funcionário" />
            <form className="space-y-4" action="#">
              <CampoCadastro titulo="Nome" type="text" id="nome" placeholder="Digite o nome" value={nome} setValue={setNome} />
              <CampoCadastro para="sobrenome" titulo="Sobrenome" type="text" name="sobrenome" id="sobrenome" placeholder="Digite o sobrenome" value={sobrenome} setValue={setSobrenome} />
              <CampoCadastro para="data" titulo="Data de início" type="date" name="data" id="data" value={data} setValue={setData} />
              <SelectCargo setCargo={setCargo} listaCargos={cargos} />
              <Botao titulo="Cadastrar" className="w-full text-gray-900 bg-blue-200 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onclick={() => CadastrarFunc()} />
            </form>
          </div>
        </div>
      </div>

    </>
  );
}

export default CadastroFuncionario;
