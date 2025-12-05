import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MatchForm from "./pages/MatchForm";
import Footer from "./components/Footer";
import LocalStorageView from "./pages/LocalStored";

function App() {
  return (
    <BrowserRouter>
      {/* Make flex column for sticky footer */}
      <div className="flex min-h-screen flex-col w-full">
        {/* Main content grows to fill screen */}
        <div className="flex grow justify-center mb-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/match" element={<MatchForm />} />
            <Route path="/stored" element={<LocalStorageView />} />
          </Routes>
        </div>
        {/* Footer always at bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
