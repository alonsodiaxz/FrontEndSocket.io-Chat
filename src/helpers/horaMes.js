import moment from 'moment';

export const horaMes = (fecha) => {

    const hoyMes = moment(fecha).format('LLL'); //Formato de la fecha 

    return hoyMes;
   
}
