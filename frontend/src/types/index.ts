export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  dailyRate: number;
  isAvailable: boolean;
  description: string;
  rentals?: Rental[];
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  driverLicense: string;
  registrationDate: string;
  rentals?: Rental[];
}

export interface Rental {
  id: number;
  carId: number;
  car?: Car;
  customerId: number;
  customer?: Customer;
  rentalDate: string;
  returnDate: string;
  actualReturnDate?: string;
  totalCost: number;
  status: RentalStatus;
  notes?: string;
}

export enum RentalStatus {
  Active = 0,
  Completed = 1,
  Cancelled = 2,
  Overdue = 3
}

export type CarFormData = Omit<Car, 'id' | 'rentals'>;
export type CustomerFormData = Omit<Customer, 'id' | 'rentals' | 'registrationDate'>;
export type RentalFormData = Omit<Rental, 'id' | 'car' | 'customer' | 'status' | 'actualReturnDate'>; 