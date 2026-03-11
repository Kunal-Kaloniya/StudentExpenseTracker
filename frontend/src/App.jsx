import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ExpensePage from "./pages/ExpensePage.jsx";
import Layout from './components/Layout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<ExpensePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;