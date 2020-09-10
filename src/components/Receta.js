import React, {useContext, useState} from 'react';
import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
}));

const Receta = ({receta}) => {

    //Configuración del modal de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    //extraer los valores del context
    const {informacion, guardarIdReceta, guardarInformacion} = useContext(ModalContext);

    //muestra y formatea los ingredientes
    const mostrarIngredientes = informacion => {
        let ingredientes = [];

        for (let i = 0; i < 16; i++) {
            if(informacion[`strIngredient${i}`]){
                ingredientes.push(
                <li>{informacion[`strMeasure${i}`]} {informacion[`strIngredient${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header text-center">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} atl={`Imagen de ${receta.strDrink}`}/>

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() =>{
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >
                        Ver Receta
                    </button>
                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null);
                            guardarInformacion({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper} align="center">
                            <h2>{informacion.strDrink}</h2>
                            <h5 className="mt-4">Instrucciones</h5>
                            <p align="justify">
                                {informacion.strInstructions}
                            </p>
                            <img className="img-fluid my-4" width="30%" height="30%" src={informacion.strDrinkThumb} alt={informacion.strDrink}/>
                            <h5>Ingredientes y cantidades</h5>
                            <ul>
                                {mostrarIngredientes(informacion)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Receta;