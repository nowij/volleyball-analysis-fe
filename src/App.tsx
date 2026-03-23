import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MatchListPage from './pages/MatchListPage'
import VideoUploadPage from './pages/VideoUploadPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/matches" element={<MatchListPage />} />
                <Route path="/matches/:id/upload" element={<VideoUploadPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App