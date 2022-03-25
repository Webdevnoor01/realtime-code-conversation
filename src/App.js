// External imports
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
// Internal imports
import './App.css';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';

function App() {
  return (

    <>
    <div>
    <Toaster 
    position='top-right'
    toastOptions={{
      success:{
        theme:{
          primary: "#4aea88"
        }
      }
    }}
    >

    </Toaster>
    </div>
    <BrowserRouter>
      <div >
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/editor/:roomId' element={<EditorPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
    </>

  );
}

export default App;
