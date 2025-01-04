import axios from 'axios';
import { Car, Customer, Rental } from '../types';

const API_URL = 'http://localhost:5164/api';

const api = axios.create({
  baseURL: API_URL,
});

// Car API
export const carApi = {
  getAll: () => api.get<Car[]>('/car').then(res => res.data),
  getById: (id: number) => api.get<Car>(`/car/${id}`).then(res => res.data),
  getAvailable: () => api.get<Car[]>('/car/available').then(res => res.data),
  getByBrand: (brand: string) => api.get<Car[]>(`/car/brand/${brand}`).then(res => res.data),
  create: (car: Omit<Car, 'id'>) => api.post<Car>('/car', car).then(res => res.data),
  update: (id: number, car: Omit<Car, 'id'>) => api.put<Car>(`/car/${id}`, car).then(res => res.data),
  delete: (id: number) => api.delete(`/car/${id}`),
  checkAvailability: (id: number) => api.get<boolean>(`/car/${id}/available`).then(res => res.data),
  getDailyRate: (id: number) => api.get<number>(`/car/${id}/daily-rate`).then(res => res.data),
};

// Customer API
export const customerApi = {
  getAll: () => api.get<Customer[]>('/customer').then(res => res.data),
  getById: (id: number) => api.get<Customer>(`/customer/${id}`).then(res => res.data),
  getByEmail: (email: string) => api.get<Customer>(`/customer/email/${email}`).then(res => res.data),
  search: (term: string) => api.get<Customer[]>(`/customer/search/${term}`).then(res => res.data),
  create: (customer: Omit<Customer, 'id'>) => api.post<Customer>('/customer', customer).then(res => res.data),
  update: (id: number, customer: Omit<Customer, 'id'>) => api.put<Customer>(`/customer/${id}`, customer).then(res => res.data),
  delete: (id: number) => api.delete(`/customer/${id}`),
  getRentals: (id: number) => api.get<Rental[]>(`/customer/${id}/rentals`).then(res => res.data),
};

// Rental API
export const rentalApi = {
  getAll: () => api.get<Rental[]>('/rental').then(res => res.data),
  getById: (id: number) => api.get<Rental>(`/rental/${id}`).then(res => res.data),
  getActive: () => api.get<Rental[]>('/rental/active').then(res => res.data),
  getOverdue: () => api.get<Rental[]>('/rental/overdue').then(res => res.data),
  getByDateRange: (startDate: Date, endDate: Date) =>
    api.get<Rental[]>('/rental/date-range', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    }).then(res => res.data),
  create: (rental: Omit<Rental, 'id'>) => api.post<Rental>('/rental', rental).then(res => res.data),
  update: (id: number, rental: Omit<Rental, 'id'>) => api.put<Rental>(`/rental/${id}`, rental).then(res => res.data),
  delete: (id: number) => api.delete(`/rental/${id}`),
  complete: (id: number, actualReturnDate: Date) =>
    api.post<Rental>(`/rental/${id}/complete`, actualReturnDate).then(res => res.data),
  checkAvailability: (carId: number, startDate: Date, endDate: Date) =>
    api.get<boolean>(`/rental/car/${carId}/availability`, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    }).then(res => res.data),
  calculateCost: (carId: number, startDate: Date, endDate: Date) =>
    api.get<number>('/rental/calculate-cost', {
      params: {
        carId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    }).then(res => res.data),
}; 