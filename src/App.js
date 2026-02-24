import logo from './logo.svg';
import './App.css';
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import InserirEmail from "./pages/InserirEmail"
import InserirImpresso from "./pages/InserirImpresso"
import InserirQuestionario from './pages/InserirQuestionario';
import ListarEmail from './pages/ListarEmail';
import ListarImpresso from './pages/ListarImpresso';
import ListarQuestionario from './pages/ListarQuestionario';

function App() {
  //return <LogIn />;
  //return <HomePage />;
  //return <InserirEmail />;
  //return <InserirImpresso />;
  return <InserirQuestionario />;
  //return <ListarEmail />;
  //return <ListarImpresso />;
  //return <ListarQuestionario />;
}

export default App;