import React, {useState} from 'react';
import Error from './Error';

function Buscador({guardarBusquedaApp}){
    const [busqueda, guardarBusqueda] = useState('');
    const [error, guardarError] = useState(false);

    const buscarImagen = (e) => {
        e.preventDefault();

        //validar
        if(busqueda === ''){
            guardarError(true);
            return; //para que se detenga el código
        }
        guardarError(false);

        //después de haber sido validado, enviar al componente principal
        guardarBusquedaApp(busqueda);
    }

    return(
        <form
            onSubmit={buscarImagen}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ej: Karate, Café..."
                        onChange={ (e) => guardarBusqueda(e.target.value) }
                    />
                </div>

                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-warning btn-block btn-lg"
                        value="Buscar"
                    />
                </div>

            </div>

            { (error) ? <Error mensaje='debes llenar el campo' /> : null }

        </form>
    );
}

export default Buscador;
