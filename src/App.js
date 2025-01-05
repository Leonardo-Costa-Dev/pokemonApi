import './App.css';
import Home from './pages/home';
import { ThemeProvider } from './contexts/theme.contexts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Card from './pages/card';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:name' element={<Card />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
