import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Circles } from 'react-loader-spinner';
import './Publish.css';

function Publish() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  // dropzone
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  // gestion de la soumission du formulaire (connexion au back à l'étape 2)
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // back connecté ici  ==> TODO
    // pour l'instant console.log
    console.log({
      title,
      description,
      brand,
      size,
      color,
      condition,
      city,
      price,
      exchange,
      file,
    });
    setIsLoading(false);
  };

  return (
    <div className="publish-container">
      <h1>Vends ton article</h1>
      {/* upload image avec react-dropzone */}
      <div className="photo-placeholder" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="photo-upload-label">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="photo-upload-btn">+</span>
            <span className="photo-upload-text">
              {file
                ? file.name
                : isDragActive
                  ? "Déposez l'image ici..."
                  : "Ajoute une photo"}
            </span>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", margin: "40px 0" }}>
          <Circles
            height={60}
            width={60}
            color="#2cb1ba"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      ) : (
        <form className="publish-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre</label>
            <input
              type="text"
              placeholder="ex: Chemise Sézane verte"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Décris ton article</label>
            <input
              type="text"
              placeholder="ex: porté quelques fois, taille correctement"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Marque</label>
            <input
              type="text"
              placeholder="ex: Zara"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Taille</label>
            <input
              type="text"
              placeholder="ex: L / 40 / 12"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Couleur</label>
            <input
              type="text"
              placeholder="ex: Fushia"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>État</label>
            <input
              type="text"
              placeholder="Neuf avec étiquette"
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Lieu</label>
            <input
              type="text"
              placeholder="ex: Paris"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Prix</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00 €"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={exchange}
              onChange={(event) => setExchange(event.target.checked)}
            />
            <label>Je suis intéressé(e) par les échanges</label>
          </div>
          <button type="submit" disabled={isLoading}>Ajouter</button>
        </form>
      )}
    </div>
  );
}

export default Publish; 