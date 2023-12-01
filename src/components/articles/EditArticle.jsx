import React from 'react'
import { useState ,useEffect} from 'react';

import axios from 'axios';

import { useNavigate , useParams } from 'react-router-dom';

import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const EditArticle = () => {

    const navigate=useNavigate();

    const {id} = useParams();

  const [reference, setReference] = useState("");
  const [designation, setDesignation] = useState("");
  const [marque, setMarque] = useState("");
  const [prix, setPrix] = useState("");
  const [qtestock, setQtestock] = useState("");
  const [imageart, setImageart] = useState("");
  const [scategorieID, setScategorieID] = useState("");
  const [scategories, setScategories] = useState([]);

  const [files, setFiles] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3001/api/articles/'+id).then(res => {
        setReference(res.data.reference);
        setDesignation(res.data.designation);
        setMarque(res.data.marque);
        setPrix(res.data.prix);
        setScategorieID(res.data.scategorieID);
        setQtestock(res.data.qtestock);
        setImageart(res.data.imageart);
        setFiles( [
            {
              source: res.data.imageart,
              options: { type: 'local' }
            }
            ])
    })
  },[id]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/scategories')
      .then((res) => {
        const data = res.data;
        setScategories(data);
       
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
        _id:id,
      reference,
      designation,
      marque,
      prix, 
      qtestock, 
      imageart,
      scategorieID
    };
  
//faire le add dans la BD
axios.put("http://localhost:3001/api/articles/"+id,newProduct)
.then(res => {  
console.log(res);
navigate("/")
  })   
.catch(error=>{
    console.log(error)
    alert("Erreur ! Modification non effectuée")
    })

}

const serverOptions = () => { console.log('server pond');
  return {
    load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function(response) {
          response.blob().then(function(myBlob) {
            load(myBlob);
          });
        });
      },
    process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file)
      const data = new FormData();
      
      data.append('file', file);
      data.append('upload_preset', 'Ecommerce_cloudinary');
      data.append('cloud_name', 'iset-sfax');
      data.append('public_id', file.name);

      axios.post('https://api.cloudinary.com/v1_1/iset-sfax/image/upload', data)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
         setImageart(data.url) ;
          load(data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          error('Upload failed');
          abort();
        });
    },
  };
};


  return (
    <div className="container">
        <h2>Modification d'un produit </h2>
        <form onSubmit={handleSubmit}>
    <div className="grid gap-3">
    <div className="col-sm-5 p-2 g-col-6">
        <input className="form-control"
          placeholder="Référence"
          type="text"
          value={reference}
          onChange={e => setReference(e.target.value)}
          />
     </div>
     <div className="col-sm-5 p-2 g-col-6">
        <input className="form-control"
          placeholder="Désignation"
          name="designation"
          type="text"
          value={designation}
          onChange={e => setDesignation(e.target.value)}
          />
     </div>
     <div className="col-sm-5 p-2 g-col-6">
        <input className="form-control"
          placeholder="Marque"
          type="text"
          value={marque}
          onChange={e => setMarque(e.target.value)}
          />
     </div>
    
     <div className="col-sm-5 p-2 g-col-6">
        <input className="form-control"
          placeholder="Prix"
          name="prix"
          type="number"
          value={prix}
          onChange={e => setPrix(e.target.value)}
          />
     </div>
     <div className="col-sm-5 p-2 g-col-6">
        <input className="form-control"
          placeholder="Quantité"
          type="number"
          value={qtestock}
          onChange={e => setQtestock(e.target.value)}
          />
     </div>
     <div className="col-sm-5 p-2 g-col-6">
     S/Catégorie
<select
value={scategorieID}
onChange={(e)=>setScategorieID(e.target.value)}
>
<option></option>
  
{scategories.map((scat)=><option key={scat._id}
value={scat._id}>{scat.nomscategorie}</option>
)}
</select>
     </div>
     <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
     <FilePond
                   files={files}
                   acceptedFileTypes="image/*"
                   onupdatefiles={setFiles}
                   allowMultiple={true}
                   server={serverOptions()}
                   name="file"
                  
          />
    </div>    
    <div>
    <button className="btn btn-success">Valider</button>
    </div>  
    </div>
    </form>
   
  </div>
  )
}

export default EditArticle
