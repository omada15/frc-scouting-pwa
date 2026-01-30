import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MatchForm from "./pages/MatchForm";
import Footer from "./components/Footer";
import LocalStorageView from "./pages/LocalStored";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import PitScoutingForm from "./pages/pitScoutingForm";

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
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/pitScouting" element={<PitScoutingForm />} />
                    </Routes>
                </div>
                {/* Footer always at bottom */}
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
