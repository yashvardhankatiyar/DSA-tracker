import './App.css';
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Questions from './components/Questions';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Entry from './Pages/Entry.js';
import DashBoard from './Pages/DashBoard.js';


function App() {
  return (
    <div className="App">
     
        <Routes>
          <Route exact path="/" element={<Navigate to="/entry/signup" />} />
          <Route exact path="/entry" element={<Entry />} />
          <Route exact path="/entry/login" element={<Login />} />
          <Route exact path="/entry/signup" element={<SignUp />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/dashboard" element={<DashBoard />} />
          <Route exact path="/question/:id" element={<QuestionWrapper />} />
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
