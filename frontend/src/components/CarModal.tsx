import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Car, CarFormData } from '@/types';
import { carApi } from '@/services/api';

interface CarModalProps {
  open: boolean;
  onClose: () => void;
  car: Car | null;
  onSave: () => void;
}

const validationSchema = yup.object({
  brand: yup.string().required('Brand is required'),
  model: yup.string().required('Model is required'),
  year: yup
    .number()
    .required('Year is required')
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
  licensePlate: yup.string().required('License plate is required'),
  dailyRate: yup
    .number()
    .required('Daily rate is required')
    .min(0, 'Daily rate must be positive'),
  description: yup.string(),
  isAvailable: yup.boolean(),
});

export default function CarModal({ open, onClose, car, onSave }: CarModalProps) {
  const formik = useFormik<CarFormData>({
    initialValues: {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      licensePlate: '',
      dailyRate: 0,
      description: '',
      isAvailable: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = {
          ...values,
          year: Number(values.year),
          dailyRate: Number(values.dailyRate),
          description: values.description || '',
          rentals: []
        };

        console.log('Sending data:', formData);

        if (car) {
          await carApi.update(car.id, formData);
        } else {
          await carApi.create(formData);
        }
        alert('Car saved successfully!');
        formik.resetForm();
        onSave();
        onClose();
      } catch (error: unknown) {
        console.error('Error saving car:', error);
        const axiosError = error as { response?: { data: unknown } };
        if (axiosError.response?.data) {
          console.log('Backend error:', axiosError.response.data);
          alert(`Error: ${JSON.stringify(axiosError.response.data, null, 2)}`);
        } else {
          alert('Error saving car. Please check the form values.');
        }
      }
    },
  });

  useEffect(() => {
    if (car) {
      formik.setValues({
        brand: car.brand,
        model: car.model,
        year: car.year,
        licensePlate: car.licensePlate,
        dailyRate: car.dailyRate,
        description: car.description,
        isAvailable: car.isAvailable,
      });
    } else {
      formik.resetForm({
        values: {
          brand: '',
          model: '',
          year: new Date().getFullYear(),
          licensePlate: '',
          dailyRate: 0,
          description: '',
          isAvailable: true,
        }
      });
    }
  }, [car]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        className: "animate-slide-up rounded-lg shadow-custom"
      }}
    >
      <form onSubmit={formik.handleSubmit} className="animate-fade-in">
        <DialogTitle className="bg-gradient-to-r from-primary to-secondary text-white py-4">
          {car ? 'Edit Car' : 'Add New Car'}
        </DialogTitle>
        <DialogContent className="p-6">
          <Box className="flex flex-col gap-4 pt-2">
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
              helperText={formik.touched.brand && formik.errors.brand}
              className="animate-scale"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#ffa343',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#dd3333',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              id="model"
              name="model"
              label="Model"
              value={formik.values.model}
              onChange={formik.handleChange}
              error={formik.touched.model && Boolean(formik.errors.model)}
              helperText={formik.touched.model && formik.errors.model}
              className="animate-scale"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#ffa343',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#dd3333',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              id="year"
              name="year"
              label="Year"
              type="number"
              value={formik.values.year}
              onChange={formik.handleChange}
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
              className="animate-scale"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#ffa343',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#dd3333',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              id="licensePlate"
              name="licensePlate"
              label="License Plate"
              value={formik.values.licensePlate}
              onChange={formik.handleChange}
              error={formik.touched.licensePlate && Boolean(formik.errors.licensePlate)}
              helperText={formik.touched.licensePlate && formik.errors.licensePlate}
              className="animate-scale"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#ffa343',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#dd3333',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              id="dailyRate"
              name="dailyRate"
              label="Daily Rate"
              type="number"
              value={formik.values.dailyRate}
              onChange={formik.handleChange}
              error={formik.touched.dailyRate && Boolean(formik.errors.dailyRate)}
              helperText={formik.touched.dailyRate && formik.errors.dailyRate}
              className="animate-scale"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#ffa343',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#dd3333',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              className="animate-scale"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#ffa343',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#dd3333',
                  },
                },
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isAvailable}
                  onChange={formik.handleChange}
                  name="isAvailable"
                />
              }
              label="Available"
            />
          </Box>
        </DialogContent>
        <DialogActions className="p-4 bg-gray-50">
          <Button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light text-white transition-all duration-300 transform hover:scale-105"
          >
            {car ? 'Save Changes' : 'Add Car'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 