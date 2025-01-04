'use client';

import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { DirectionsCar, People, Assignment } from '@mui/icons-material';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <DirectionsCar sx={{ fontSize: 40 }} />,
      title: 'Cars',
      description: 'Manage your car fleet, add new cars, and track their availability.',
      link: '/cars',
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: 'Customers',
      description: 'Handle customer information, registrations, and rental history.',
      link: '/customers',
    },
    {
      icon: <Assignment sx={{ fontSize: 40 }} />,
      title: 'Rentals',
      description: 'Process car rentals, manage bookings, and track returns.',
      link: '/rentals',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Car Rental System
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Manage your car rental business efficiently with our comprehensive system.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Paper
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
              <Typography variant="h5" component="h2" gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {feature.description}
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Link href={feature.link} style={{ textDecoration: 'none' }}>
                  <Button variant="contained">Manage {feature.title}</Button>
                </Link>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
