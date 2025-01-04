import { Inter } from "next/font/google";
import "./globals.css";
import { AppBar, Toolbar, Container, Box, Typography } from "@mui/material";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
          <AppBar position="sticky" className="bg-white shadow-custom">
            <Toolbar className="justify-between">
              <Typography 
                variant="h6" 
                component={Link} 
                href="/"
                className="text-primary font-bold text-2xl no-underline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform"
              >
                Car Rental
              </Typography>
              <Box className="flex gap-6">
                <Link 
                  href="/cars" 
                  className="text-gray-700 hover:text-primary transition-colors font-medium no-underline"
                >
                  Cars
                </Link>
                <Link 
                  href="/customers" 
                  className="text-gray-700 hover:text-primary transition-colors font-medium no-underline"
                >
                  Customers
                </Link>
                <Link 
                  href="/rentals" 
                  className="text-gray-700 hover:text-primary transition-colors font-medium no-underline"
                >
                  Rentals
                </Link>
              </Box>
            </Toolbar>
          </AppBar>
          
          <Container className="py-8 animate-fade-in">
            {children}
          </Container>

          <footer className="bg-white shadow-custom mt-auto py-6">
            <Container>
              <Typography 
                className="text-center text-gray-600"
              >
                © 2024 Car Rental System. All rights reserved.
              </Typography>
            </Container>
          </footer>
        </Box>
      </body>
    </html>
  );
}
