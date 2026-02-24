import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import InserirEmail from "./pages/InserirEmail"
import InserirImpresso from "./pages/InserirImpresso"
import InserirQuestionario from './pages/InserirQuestionario';
import ListarEmail from './pages/ListarEmail';
import ListarImpresso from './pages/ListarImpresso';
import ListarQuestionario from './pages/ListarQuestionario';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListarQuestionario />} />
        <Route path="/inserir-questionario" element={<InserirQuestionario />} />
      </Routes>
      <Routes>
        <Route path="/" element={<InserirQuestionario />} />
        <Route path="/listar-questionario" element={<ListarQuestionario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;