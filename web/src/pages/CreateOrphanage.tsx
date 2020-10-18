import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import {LeafletMouseEvent} from 'leaflet'
import Sidebar from "../components/Sidebar";
import happyMapIcon from "../utils/mapIcon";

import '../styles/pages/create-orphanage.css';
import Orphanage from "./Orphanage";
import api from "../services/api";
import { useHistory } from "react-router-dom";



const CreateOrphanage: React.FC = () => {
  const history = useHistory();
  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const handleMapClick = (event: LeafletMouseEvent) => {
    const {lat, lng } = event.latlng;
    setPosition({
      latitude: lat, 
      longitude: lng
    });
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const {latitude, longitude} =  position;
    
    const orphanageData = new FormData();

    orphanageData.append('name', name);
    orphanageData.append('about', about);
    orphanageData.append('latitude', String(latitude));
    orphanageData.append('longitude', String(longitude));
    orphanageData.append('instructions', instructions);
    orphanageData.append('opening_hours', opening_hours);
    orphanageData.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      orphanageData.append('images', image);
    });

    await api.post("/orphanages", orphanageData);

    alert('Cadastro realizado com sucesso!');
    
    history.push('/app');
  }

  const handleSelectImages = (event:ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }


  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.4457392,-48.3832063]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={happyMapIcon} 
                  position={[position.latitude,position.longitude]} 
                />
              ) 
              }

              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
              id="name"
              value={name}
              onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
              id="about" 
              maxLength={300}
              value={about}
              onChange={event => setAbout(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={Orphanage.name}/>
                  )
                })}
              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
              id="instructions"
              value={instructions}
              onChange={event => setInstructions(event.target.value)}
               />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
              id="opening_hours"
              value={opening_hours}
              onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button 
                type="button"
                className={!open_on_weekends ? 'active' : '' }
                onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateOrphanage;

