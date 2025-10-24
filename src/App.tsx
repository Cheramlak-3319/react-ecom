import {BrowserRouter,Routes,Route} from 'react-router-dom';
import SIdeBar from './componente/SIdeBar'
import { FilterProvider } from './componente/FilterContext';
import MainContent from './componente/MainContent';

const App = () => {
  return (
    <BrowserRouter>
      <FilterProvider>
        <div className='flex h-screen'>
          <SIdeBar/>
        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path='/' element={<MainContent/>}/>
          </Routes>
        </div>
        </div>
      </FilterProvider>
    </BrowserRouter>
  )
}

export default App
