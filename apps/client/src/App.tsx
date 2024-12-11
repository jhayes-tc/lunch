import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Navbar from "./modules/shell/navbar";
import ModalRenderer from "./components/modals/core/modalRenderer";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <div className="max-h-screen overflow-y-auto">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ModalRenderer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
