import { Routes, Route } from 'react-router';
import {Home} from './pages/Home/Home';

function App() {

  return (
    <Routes>
      <Route index element={<h1>Home Page </h1>} />
    </Routes>
  )
}

export default App
