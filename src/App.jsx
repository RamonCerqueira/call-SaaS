import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Documentation from './pages/Documentation';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Calls from './pages/Calls';
import Settings from './pages/Settings';
import Pathways from './pages/Pathways';
import KnowledgeBase from './pages/KnowledgeBase';
import { BlandApiProvider } from './contexts/BlandApiContext';
import './App.css';

function App() {
  return (
    <BlandApiProvider>
      <Router>
      <Routes>
        {/* Public Routes with Header/Footer */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Home />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/pricing" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Pricing />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/documentation" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Documentation />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/about" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <About />
            </main>
            <Footer />
          </div>
        } />

        {/* Auth Routes (No Header/Footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="calls" element={<Calls />} />
          <Route path="pathways" element={<Pathways />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
          <Route path="settings" element={<Settings />} />
          <Route path="billing" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Faturamento - Em desenvolvimento</h2></div>} />
        </Route>

        {/* Contact Page */}
        <Route path="/contact" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center">
              <h1 className="text-2xl">Contato - Em desenvolvimento</h1>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
    </BlandApiProvider>
  );
}

export default App;
