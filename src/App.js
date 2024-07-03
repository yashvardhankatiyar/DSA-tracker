import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Home from './Pages/Home';
import Questions from './components/Questions'


function App() {

  return (
    
    <div className="App">
      
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/question/:id' element={<QuestionWrapper />} />
        </Routes>
    </div>
  );
}

// Define a wrapper component to pass params to Questions component
const QuestionWrapper = () => {
  let { id } = useParams(); // useParams hook to get id from URL
  return <Questions topic={id} />;
};

export default App;
