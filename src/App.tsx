import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/home'
import History from './pages/history'
import PageNotFound from './components/PageNotFound'

function App() {

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
