import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import ListArticles from "./components/articles/ListArticles";
import AjoutArticle from './components/articles/AjoutArticle';
import EditArticle from './components/articles/EditArticle';

function App() {
  

  return (
    <Router>
 
 <nav className="navbar navbar-expand-lg bg-primary">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Liste articles</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/ajoutArticle">Ajout articles</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

    <Routes>
  
    <Route path='/' element={<ListArticles/>}/>
    <Route path='/ajoutArticle' element={<AjoutArticle/>}/>
    <Route path='/editArticle/:id' element={<EditArticle/>}/>
   </Routes>
  </Router>
  )
}

export default App
