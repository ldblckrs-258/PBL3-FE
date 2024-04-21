import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import DestinationPage from './pages/destination/DestinationPage'
import Blog from './pages/blog/BlogPage'
function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/destination" element={<DestinationPage />}></Route>
					<Route path="/blog" element={<Blog />}></Route>

					<Route path="*" element={<PageNotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
