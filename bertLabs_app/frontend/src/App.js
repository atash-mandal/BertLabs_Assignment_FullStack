import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Charts from './pages/charts';
import { useEffect, useState } from 'react';


function generateRandomColors() {
  const n = 100;
  const colors = [];
  for (let i = 0; i < n; i++) {
    // Generate random RGBA values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // Push RGBA string to colors array
    colors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
  }
  return colors;
}


function App() {
  const [data, setData] = useState(null);
  const [searchedData, setSearchedData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const colors = generateRandomColors();

  useEffect(() => {
      console.log("useEffect")

      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:5000/charts'); // Replace URL with your endpoint
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const jsonData = await response.json();
              setChartData(jsonData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  },[]);

  useEffect(() => {
        console.log("useEffect")

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
                setSearchedData(jsonData);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[]);

  return (
    <div className="App">
      <BrowserRouter>
      
        <Header/>
        
          <Routes>
            <Route index element={<Home data={data} searchedData={searchedData} setSearchedData={setChartData}/>}/>
            <Route exact path='/charts' element={<Charts chartData = {chartData} colors = {colors}/>} />
            <Route exact path='*' element={<Home/>} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
