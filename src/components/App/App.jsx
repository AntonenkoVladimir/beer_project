import {Routes, Route, Navigate} from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import './App.scss';

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path='/main/:page/:sortBy' element={<MainPage/>}/>
        <Route path='/' element={<Navigate to='/main/1/Without sort'/>}/>
      </Routes>
    </div>
  );
}

export default App;
