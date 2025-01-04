'use client';

import { useEffect, useState } from 'react';
import { carApi } from '../../services/api';
import { Car } from '../../types';
import { Box, Typography, CircularProgress, Grid, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import CarModal from '../../components/CarModal';
import { DirectionsCar, AttachMoney, Event } from '@mui/icons-material';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await carApi.getAll();
      setCars(data);
    } catch {
      setError('Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCar = () => {
    setSelectedCar(null);
    setIsModalOpen(true);
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  if (loading) return (
    <Box className="flex justify-center items-center min-h-[50vh]">
      <CircularProgress className="text-primary" />
    </Box>
  );

  if (error) return (
    <Box className="text-center p-8">
      <Typography color="error" className="text-lg">
        {error}
      </Typography>
      <Button 
        onClick={fetchCars}
        className="mt-4 bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-light hover:to-secondary-light"
      >
        Retry
      </Button>
    </Box>
  );

  return (
    <Box className="animate-fade-in">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Available Cars
        </Typography>
        <Button
          variant="contained"
          onClick={handleAddCar}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light text-white transition-all duration-300 transform hover:scale-105"
        >
          Add New Car
        </Button>
      </Box>

      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id} className="animate-slide-up">
            <Card className="h-full flex flex-col hover:shadow-hover transition-shadow duration-300">
              <CardContent className="flex-grow">
                <Typography variant="h6" className="font-bold mb-2">
                  {car.brand} {car.model}
                </Typography>
                <Box className="space-y-2">
                  <Box className="flex items-center gap-2">
                    <Event className="text-primary" />
                    <Typography>{car.year}</Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    <DirectionsCar className="text-primary" />
                    <Typography>{car.licensePlate}</Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    <AttachMoney className="text-primary" />
                    <Typography>${car.dailyRate}/day</Typography>
                  </Box>
                  <Chip 
                    label={car.isAvailable ? 'Available' : 'Not Available'}
                    className={`mt-2 ${car.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions className="bg-gray-50">
                <Button
                  fullWidth
                  onClick={() => handleEditCar(car)}
                  className="text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <CarModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        car={selectedCar}
        onSave={fetchCars}
      />
    </Box>
  );
} 