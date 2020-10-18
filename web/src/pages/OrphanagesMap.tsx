import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {FiArrowRight, FiPlus} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import happyMapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/orphanages-map.css';


interface Image {
  id: number;
  url: string;
}

export interface OrphanageType {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean,
  images: Image[];
}



const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageType[]>([])

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, []);


  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita :)</p>
        </header>

        <footer>
          <strong>Rio Verde</strong>
          <span>Goiás</span>
        </footer>
      </aside>

      <Map
      // center={[-17.803552, -50.915815]} Rio Verde
      center={[-27.4457392,-48.3832063]}
      zoom={17}
      style={{
        width:'100%',
        height: '100%'
      }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>

        {orphanages.map(orphanage => (
          <Marker
          key={orphanage.id}
          icon={happyMapIcon}
          position={[orphanage.latitude, orphanage.longitude]} 
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`} >
                <FiArrowRight size={20} color="#fff"/>
              </Link>
            </Popup>
          </Marker>
        ))}

      </Map>
      <Link to="orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff"/>
      </Link>

    </div>
  );
}

export default OrphanagesMap;