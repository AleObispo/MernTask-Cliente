import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


function FormTarea() {

      //extraer si un poroyecto esta activo
      const proyectosContext = useContext(proyectoContext);
      const { proyecto } = proyectosContext;

      //obtener la funcion del context de tarea
      const tareasContext = useContext(tareaContext);
      const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea  } = tareasContext;

      //effect que detecta si hay una tare seleccionada
      useEffect(() => {
          if(tareaseleccionada !== null){
              guardarTarea(tareaseleccionada)
          }else {
              guardarTarea({
                  noombre:''
              })
          }
      }, [tareaseleccionada])

      //state del formualrio
      const [ tarea, guardarTarea ] = useState({
          nombre:'',
      })

      //extraer el nombre edl proyecto
      const { nombre } = tarea;


       //si no hay proyecto seleccionado
       if(!proyecto) return null;
       
       //array destructuring para extarer el proyecto actual
       const [proyectoActual]  = proyecto;

       //lee los valores del formulario
       const handleChange = e => {
           guardarTarea({
               ...tarea,
               [ e.target.name ] : e.target.value
           })
       }

       const onSubmit = e => {
           e.preventDefault();

           //validar
            if(nombre.trim() === ''){
                validarTarea();
                return;
            }

            //si es edicion o si es nueva tarea
            if (tareaseleccionada === null ){
                //agregar la nueva tarea al state de tarea
                tarea.proyecto = proyectoActual._id;
                
                agregarTarea(tarea);

            } else {
                //actualizar tarea existente
                actualizarTarea(tarea);

                //elimina tareaseleccionada del state
                limpiarTarea(); 
            }
           

           

           //obtener y filtrar las tareas del proyecto actual
           obtenerTareas(proyectoActual.id);

           //reiniciar el form
           guardarTarea({
               nombre: ''
           })
       }


    return (
        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div className='contenedor-input'>
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className='contenedor-input'>
                    <input
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />    
                </div>
            </form>

            {errortarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p>  : null}
        </div>
    )
}

export default FormTarea
