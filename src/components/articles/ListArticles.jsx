import axios from 'axios';
import { useEffect, useState } from 'react';
import ElementArticle from './ElementsArticle';

export default function ListArticles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [mot, setMot] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/articles')
      .then((res) => {
        const data = res.data;
        setArticles(data);
        setFilteredArticles(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteProd = async (id) => {
    if (!window.confirm('Are you sure you want to delete')) {
      return;
    }

    await axios.delete('http://localhost:3001/api/articles/' + id)
      .then(() => {
        console.log('successfully deleted!');
        setArticles((prevArticles) => prevArticles.filter((article) => article._id !== id));
        setFilteredArticles((prevArticles) => prevArticles.filter((article) => article._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rechProd = (e) => {
    const searchTerm = e.target.value;
    setMot(searchTerm);

    if (searchTerm === '') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter((item) => {
        return item.designation.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      }));
    }
  };

  return (
    <div className="container">
      Recherche:
      <input
        type="text"
        value={mot}
        onChange={(event) => rechProd(event)}
      />
      <ElementArticle articles={filteredArticles} deleteProd={deleteProd} />
    </div>
  );
}

