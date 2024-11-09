import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Delete, Add as AddIcon } from '@mui/icons-material';

const Hoteles = ({ userType }) => {
  const { register, handleSubmit, reset,setValue  } = useForm();
  const [hoteles, setHoteles] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);
  const [municipios, setMunicipios] = useState([]);
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario

  const token = localStorage.getItem('token');
  const config= {
    headers: {
        'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
    }};

  useEffect(() => {
    fetchHoteles();
    fetchMunicipios();

}, []);

  const fetchHoteles = async () => {
    try {

      const response = await axios.get('http://localhost:3000/api/hoteles',config);
      setHoteles(response.data);
    } catch (error) {
      console.error("Error al obtener hoteles", error);
    }
  };

  const fetchMunicipios = async () => {
    try {
        axios.get('http://localhost:3000/api/municipios')
        .then(response => {setMunicipios(response.data);
          setValue("municipio_id", '01'); 

        }
      )
        .catch(error => console.log('Error al cargar municipios', error));
        } catch (error) {
      console.error("Error al obtener hoteles", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingHotel) {
        const rpta= await axios.put(`http://localhost:3000/api/hoteles/${editingHotel.id}`, data,config);
        toast.success( 'Hotel actualizado con éxito');

      } else {
        await axios.post('http://localhost:3000/api/hoteles', data,config);
        toast.success(  'Hotel creado con éxito');

      }
      handleCancel();
      setEditingHotel(null);
      reset()
      fetchHoteles();
    } catch (error) {
      console.error("Error al guardar hotel", error);
      toast.error('Hubo un error al procesar la solicitud');

    }
  };
  const handleCancel = () => {
    reset(); // Limpiar el formulario
    setShowForm(false); // Ocultar el formulario
    setEditingHotel(null);
  };
  const handleEdit = (hotel) => {
    setShowForm(true)
    setEditingHotel(hotel);
    setValue("municipio_id", hotel.municipio_id || '01'); // Establece el municipio correcto

    reset(hotel); // cargar los datos del hotel en el formulario
    console.log(hotel);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/hoteles/${id}`,config);
      toast.success(  'Hotel Elminado');

      fetchHoteles();
    } catch (error) {
      console.error("Error al eliminar hotel", error);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
    <IconButton onClick={() =>{ setShowForm(true);reset()}} color="primary">
      <AddIcon /> 
    </IconButton>
    <Box
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh" 
    bgcolor="#f5f5f5" 
    padding={3}
  >
         <Paper elevation={3} sx={{ width: '80%', padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Gestión de Hoteles
        </Typography>
        {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nombre del Hotel"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('nombre', { required: 'Este campo es obligatorio' })}
        />
        <TextField
          label="Dirección"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('direccion', { required: 'Este campo es obligatorio' })}
        />
        <TextField
          label="Clasificación"
          step="0.1"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('clasificacion')}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Municipio</InputLabel>
          <Select
          label="Municipio"
          {...register("municipio_id", { required: true })}
          defaultValue={editingHotel ? editingHotel.municipio_id : '01'} // Establece el valor por defecto

        >
          {municipios.map(municipio => (
            <MenuItem key={municipio.id} value={municipio.id}>
              {municipio.nombre}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      
        <Box sx={{ display: 'flex',  justifyContent:"space-between" , alignItems:"center" , 
          marginTop: 2 }}>
              <Button
                variant="contained"
                color="warning"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>{ reset()}} >
                Limpiar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                {editingHotel ? 'Actualizar Hotel' : 'Agregar Hotel'}
              </Button>
            </Box>
      </form>
      )}
      <ToastContainer />


      <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Clasificación</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hoteles.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell>{hotel.id}</TableCell>
                  <TableCell>{hotel.nombre}</TableCell>
                  <TableCell>{hotel.direccion}</TableCell>
                  <TableCell>{hotel.clasificacion}</TableCell>
                  <TableCell>{hotel.estado === 'A' ? 'Activo' : 'Inactivo'}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleEdit(hotel)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(hotel.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

       
      </Paper>
      </Box>
      </Box>
  );
};

export default Hoteles;
