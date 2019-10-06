import React, {useEffect, useState} from 'react';
import Buscador from './components/Buscador';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busquedaApp, guardarBusquedaApp] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);


  useEffect(()=>{
    const consultarAPI = async () => {

      //previniendo que me arroje la primera consulta involuntaria
      if(busquedaApp === '') return;

      const imagenesPorPagina = 20;
      const key = '13846915-bc0d58e852d5242541d29b979';

      const url = `https://pixabay.com/api/?key=${key}&q=${busquedaApp}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);
      
      //calcular y guardar el total de páginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //cuando se le dé en anterior o en siguiente scrollear automáticamente hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth', block: 'end'});
    }

    consultarAPI();
  }, [busquedaApp, paginaActual]);

  function paginaAnterior(){
    let nuevaPaginaActual = paginaActual - 1;

    //ahora a colocarlo en el sate
    guardarPaginaActual(nuevaPaginaActual);
  }

  function paginaSiguiente(){
    let nuevaPaginaActual = paginaActual + 1;

    //ahora a colocarlo en el state
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Buscador
          guardarBusquedaApp={guardarBusquedaApp}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />

      { (paginaActual === 1) ? null : ( <button onClick={paginaAnterior} type="button" className="btn btn-outline-warning mr-1">&laquo; Anterior</button>) }
      
      {  (paginaActual === totalPaginas) ? null : ( <button onClick={paginaSiguiente} type="button" className="btn btn-outline-warning">Siguiente &raquo;</button>) }
      
      </div>  
    </div>
  );
}

export default App;
