import { createTheme } from '@mui/material/styles';

const theme = createTheme({
palette: {
primary: {
main: '#8D6E63', // لون ترابي بني
},
secondary: {
main: '#F5F5DC', // بيج
},
background: {
default: '#FDF6EC', // لون خلفية عام ترابي ناعم
},
text: {
primary: '#4E342E',
secondary: '#6D4C41',
},
},
typography: {
fontFamily: "'Montserrat', sans-serif",
h1: {
fontWeight: 700,
},
h2: {
fontWeight: 600,
},
h3: {
fontWeight: 600,
},
h4: {
fontWeight: 500,
},
button: {
textTransform: 'none',
},
},
components: {
MuiButton: {
styleOverrides: {
root: {
borderRadius: '10px',
},
},
},
MuiCard: {
styleOverrides: {
root: {
borderRadius: '16px',
boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
},
},
},
},
});

export default theme;