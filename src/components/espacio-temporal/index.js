import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import deLocale from "date-fns/locale/es";
import { Box,Container,Grid,MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { NavBtn, Button} from './botones';
import PropTypes from 'prop-types';
import { Typography,FormControl } from '@material-ui/core';
import Axios from 'axios';
import {Mapa, Tiempo} from './graficos';
import Cargando from './cargando';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bold: {
    fontWeight: 600,
  },
  paper1: {
    backgroundColor: '#ffffff',
    padding: '10px',
    borderRadius: '5px',
    margin: '10px',
  },
  paper2: {
    backgroundColor: '#ffffff',
    padding: '10px',
    borderRadius: '5px',
    margin: '10px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    textAlign: 'center'
  },  
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  root2: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#00000',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#003E97',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    }
  },
}));

const EspacioTiempo = (props) => {

    const options = [
      {"id_algoritmo": 1, "nombre": "K-means"},
      {"id_algoritmo": 2, "nombre": "Jerárquico"},
      {"id_algoritmo": 3, "nombre": "DBSCAN"}
    ];
    const departamentos =['Todos','Amazonas','Áncash','Apurímac','Arequipa','Ayacucho','Cajamarca','Callao','Cusco',
    'Huancavelica','Huánuco','Ica','Junín','La Libertad','Lambayeque','Lima','Loreto','Madre de Dios',
    'Moquegua','Pasco','Piura','Puno','San Martín','Tacna','Tumbes','Ucayali']

    const [inicioDate, setInicioDate] = React.useState('Wed Mar 05 2020 20:51:01 GMT-0500');
    const [finDate, setFinDate] = React.useState('Wed Jul 27 2021 20:00:01 GMT-0500');
    const [algoritmo, setAlgoritmo] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [nombreDepartamentos,setNombreDepartamentos] = React.useState(departamentos);

    const [state,setState] = React.useState({
      fechaIni: inicioDate,
      fechaFin: finDate,
      algoritmo: algoritmo,
      departamentos: nombreDepartamentos
    })

    const {pasarDatos} = props;
    const [isDisabled,setisDisabled]=React.useState(true);

    function handleChangeDepartamentos(name) {
      const find=nombreDepartamentos.indexOf(name);
      if(name==='Todos' && nombreDepartamentos.includes(name)){
        nombreDepartamentos.splice(find,1);
        setisDisabled(false);
        return
      }
      if(find > -1){
        nombreDepartamentos.splice(find,1);
      }else{
        if (name ==='Todos'){
          setisDisabled(true);
          setNombreDepartamentos(departamentos);
          return
        }
        nombreDepartamentos.push(name);
      }
    };

    const handleInicioDateChange = (date) => {
      setInicioDate(date);
      setState({fechaIni: date,fechaFin: state.fechaFin, algoritmo: state.algoritmo,departamentos: state.departamentos});
    };
    const handleFinDateChange = (date) => {
      setFinDate(date);
      setState({fechaIni: state.fechaIni,fechaFin: date, algoritmo: state.algoritmo,departamentos: state.departamentos});
    };

    const handleChange = (event) => {
      setAlgoritmo(event.target.value);
      setState({fechaIni: state.fechaIni,fechaFin: state.fechaFin,algoritmo: event.target.value,departamentos: state.departamentos});
    };  
    const handleClose = () => {
      setOpen(false);
    };  
    const handleOpen = () => {
      setOpen(true);
    };

    function convert(str) {
      var date= new Date(str);
      var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    const fechaIni=convert(state.fechaIni)
    const fechaFin=convert(state.fechaFin)
    const params=`fechaIni=${fechaIni}&fechaFin=${fechaFin}`

    const classes = useStyles();
    const [cargandoMapa, setCargandoMapa] = React.useState(true);
    const [cargandoLineal, setCargandoLineal] = React.useState(true);
    const [cargandoCircular, setCargandoCircular] = React.useState(true);
    
    React.useEffect(() => {
      Axios.post(`http://54.91.170.71/graficolineal/?${params}`,nombreDepartamentos).then((response) => {
        const val1 = response.data
        const item1= JSON.parse(val1)
        window.Bokeh.embed.embed_item(item1, 'graficolineal')
        setCargandoLineal(false);
      }).catch((err) => console.log(err));
      // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
      Axios.post(`http://54.91.170.71/mapa/?${params}`,nombreDepartamentos).then((response) => {
        const val = response.data
        const item= JSON.parse(val)
        window.Bokeh.embed.embed_item(item, 'mapa')
        setCargandoMapa(false);
      }).catch((err) => console.log(err));
      // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
      Axios.post(`http://54.91.170.71/graficocircular/?${params}`,nombreDepartamentos).then((response) => {
        const val1 = response.data
        const item1= JSON.parse(val1)
        window.Bokeh.embed.embed_item(item1, 'graficocircular')
        setCargandoCircular(false);
      }).catch((err) => console.log(err));
      // eslint-disable-next-line
    }, []);

    function click() {
      pasarDatos(state);
      const fechaIni=convert(state.fechaIni);
      const fechaFin=convert(state.fechaFin);
      const params=`fechaIni=${fechaIni}&fechaFin=${fechaFin}`
      //54.91.170.71
      console.log(nombreDepartamentos);
      setCargandoLineal(true);
      Axios.post(`http://54.91.170.71/graficolineal/?${params}`,nombreDepartamentos).then((response) => {
        const val1 = response.data
        const item1= JSON.parse(val1)
        window.Bokeh.embed.embed_item(item1, 'graficolineal')
        setCargandoLineal(false);
      }).catch((err) => console.log(err));

      setCargandoMapa(true);
      Axios.post(`http://54.91.170.71/mapa/?${params}`,nombreDepartamentos).then((response) => {
        const val = response.data
        const item= JSON.parse(val)
        window.Bokeh.embed.embed_item(item, 'mapa')
        setCargandoMapa(false);
      }).catch((err) => console.log(err));

      setCargandoCircular(true);
      Axios.post(`http://54.91.170.71/graficocircular/?${params}`,nombreDepartamentos).then((response) => {
        const val1 = response.data
        const item1= JSON.parse(val1)
        window.Bokeh.embed.embed_item(item1, 'graficocircular')
        setCargandoCircular(false);
      }).catch((err) => console.log(err));
    }
  
    return (
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Box className={classes.paper2} boxShadow={0}>
            <Container maxWidth={false}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
                <Grid container justifyContent="space-around" alignItems="stretch">
                  <FormControl className={classes.formControl}>
                    <Typography variant="subtitle2"  htmlFor="name" align="left">
                      Fecha Inicio
                    </Typography>
                    <KeyboardDatePicker
                      disableToolbar
                      minDate={'2020-03-06'}
                      maxDate={'2021-07-28'}
                      style={{ margin: "0%" }}
                      inputProps={{min: 0, style: { textAlign: 'center' }}}
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="fecha-inicio"
                      width= "100%"
                      value={inicioDate}
                      onChange={handleInicioDateChange}
                      KeyboardButtonProps={{'roboto-label': 'change date',}}/>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Typography variant="subtitle2"  htmlFor="name" align="left">
                      Fecha Fin
                      </Typography>
                    <KeyboardDatePicker
                      disableToolbar
                      minDate={'2020-03-05'}
                      maxDate={'2021-07-28'}
                      style={{ margin: "0%" }}
                      variant="inline"
                      format="dd/MM/yyyy"
                      inputProps={{min: 0, style: { textAlign: 'center' }}}
                      margin="normal"
                      id="fecha-fin"
                      value={finDate}
                      onChange={handleFinDateChange}
                      KeyboardButtonProps={{'roboto-label': 'change date',}}/>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Typography variant="subtitle2" htmlFor="name">
                    Algoritmo de agrupamiento
                    </Typography>
                    <Select
                      id="algoritmo-select"
                      name="name"
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={algoritmo}
                      onChange={handleChange}>
                        {options.map((item, i)=>(<MenuItem key={"algoritmo"+i} value={i}>{item.nombre}</MenuItem >))}
                    </Select>
                  </FormControl>
                  <NavBtn>
                      <Button onClick={click}>Generar</Button>
                  </NavBtn>
                </Grid>        
              </MuiPickersUtilsProvider>
              <Typography variant="subtitle2" gutterBottom>
                Departamentos:
              </Typography>
              <Grid container justifyContent="space-around" alignItems="center">
                <Grid item xs={12}>
                {departamentos.map((name) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={name}
                        className={classes.root2}
                        disableRipple
                        defaultChecked={true}
                        disabled={name === 'Todos' ? false : isDisabled}
                        onChange={ () => handleChangeDepartamentos(name) }
                        selected={nombreDepartamentos.includes(name)}
                        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                        icon={<span className={classes.icon} />}
                        inputProps={{ 'aria-label': 'decorative checkbox' }}
                      />
                    }
                    label={name}
                  />
                  ))}
                  </Grid>
              </Grid>
            </Container>
          </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className={classes.paper1}  boxShadow={0} height={650}>
              <Typography 
                variant= "h6"
                align= "center"
                className={classes.bold}>
                Variantes identificadas en el espacio
              </Typography>
              {cargandoMapa && (
                <Cargando />
              )}
              {!cargandoMapa && (
                <Mapa id='mapa' className="bk-root" ></Mapa>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className={classes.paper1} boxShadow={0} height={650}>
              <Typography 
                variant= "h6"
                align= "center"
                className={classes.bold}>
                Porcentaje de variantes identificadas en el tiempo
              </Typography>
              {cargandoCircular && (
                <Cargando />
              )}
              {!cargandoCircular && (
                <Tiempo id='graficocircular' className="bk-root"></Tiempo>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box className={classes.paper1} boxShadow={0} height={550}>
              <Typography 
                variant= "h6"
                align= "center"
                className={classes.bold}>
                Variantes identificadas en el tiempo
              </Typography>
              {cargandoLineal && (
                <Cargando />
              )}
              {!cargandoLineal && (
                <Tiempo id='graficolineal' className="bk-root"></Tiempo>
              )}
            </Box>
          </Grid>
        </Grid>
    );
};

EspacioTiempo.propTypes = {
  pasarDatos: PropTypes.func.isRequired
}

export default EspacioTiempo;