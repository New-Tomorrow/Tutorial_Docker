import './App.css';
import CadastroFuncionario from './pages/cadastroFuncionario';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListarFuncionario from './pages/listarFuncionario';
import Navbar from './components/navbar';
import AtualizarFuncionario from './pages/atualizarFuncionario';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path='/' element={<CadastroFuncionario />} />
            <Route path='/listar' element={<ListarFuncionario />} />
            <Route path='/atualizar/:id' element={<AtualizarFuncionario />} />
          </Routes>
        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
