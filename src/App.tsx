import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CallbackHandler } from "./components/CallbackHandler";
import { Profile } from "./components/Profile";
import { Home } from "./Home";
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-spotify-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<CallbackHandler />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
