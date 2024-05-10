import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import PageNotFound from './pages/PageNotFound'
import Home from './pages/home/Home'
import DestinationPage from './pages/destination/DestinationPage'
import BlogPage from './pages/blog/BlogPage'
import Blog from './pages/blog/Blog'
import Destination from './pages/destination/Destination'
import ScrollToTop from './utils/ScrollToTop'
import SchedulePage from './pages/schedule/SchedulePage'
import Schedule from './pages/schedule/Schedule'
function App() {
	return (
		<>
			<BrowserRouter>
				<ScrollToTop />
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/destination" element={<DestinationPage />}></Route>
					<Route path="/destination/:id" element={<Destination />}></Route>
					<Route path="/blog" element={<BlogPage />}></Route>
					<Route path="/blog/:id" element={<Blog />}></Route>
					<Route path="/schedule" element={<SchedulePage />}></Route>
					<Route path="/schedule/:id" element={<Schedule />}></Route>

					<Route path="*" element={<PageNotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
