import {Link } from "react-router-dom";
function ElementsArticle(props) {
    return ( 
<div className="container">
  <div className="row">
{
props.articles && props.articles.map(article =>{
return(
<div key={article._id} className="col-sm-3">
<div className="card" style={{"width": "18rem"}}>
  <img src={article.imageart} className="card-img-top" alt={article.designation}/>
  <div className="card-body">
    <h5 className="card-title">{article.designation}</h5>
    <p className="card-text">{article.marque}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">{article.prix} TND</li>
  </ul>
  <div className="card-body">
  <Link to={`/editArticle/${article._id}`} className="btn btn-primary">Modifier</Link>
  <button onClick={()=>{props.deleteProd(article._id)}} className="btn btn-danger">Supprimer</button>
  </div>
</div>
                    </div>
                )
            })
        }
</div>
</div>
     );
}

export default ElementsArticle;
