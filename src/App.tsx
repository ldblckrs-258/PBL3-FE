import './styles/App.css'
import 'react-quill/dist/quill.snow.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
	Navbar,
	PageNotFound,
	Home,
	DestinationPage,
	BlogPage,
	Blog,
	Destination,
	SchedulePage,
	Schedule,
	BlogEditor,
	DestinationEditor,
	LoginForm,
	RegisterForm,
	AccountPage,
} from './pages'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from './context/UserContext'
import ScrollToTop from './utils/ScrollToTop'
import { AnimatePresence } from 'framer-motion'
import axios from 'axios'

function App() {
	const [accountModal, setAccountModal] = useState(0)
	const { setUser } = useContext(UserContext)

	const auth = async (id: number) => {
		try {
			const response = await axios.get(`/api/user/${id}.json`)
			setUser(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		const userId = sessionStorage.getItem('userId')
		if (userId) {
			const id = JSON.parse(userId)
			auth(id)
		}
	}, [])

	return (
		<>
			<BrowserRouter>
				<ScrollToTop />
				<Navbar
					onLogin={() => setAccountModal(1)}
					onSignUp={() => setAccountModal(2)}
				/>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/destination" element={<DestinationPage />}></Route>
					<Route
						path="/destination/new"
						element={<DestinationEditor />}
					></Route>
					<Route path="/destination/:id" element={<Destination />}></Route>
					<Route path="/blog" element={<BlogPage />}></Route>
					<Route path="/blog/new" element={<BlogEditor />}></Route>
					<Route path="/blog/:id" element={<Blog />}></Route>
					<Route path="/schedule" element={<SchedulePage />}></Route>
					<Route path="/schedule/:id" element={<Schedule />}></Route>
					<Route path="/account" element={<AccountPage />}></Route>
					<Route path="*" element={<PageNotFound />}></Route>
				</Routes>
			</BrowserRouter>
			<AnimatePresence>
				{accountModal === 1 && (
					<LoginForm
						onClose={() => setAccountModal(0)}
						onSwitch={() => setAccountModal(2)}
					/>
				)}
				{accountModal === 2 && (
					<RegisterForm
						onClose={() => setAccountModal(0)}
						onSwitch={() => setAccountModal(1)}
					/>
				)}
			</AnimatePresence>
		</>
	)
}

export default App
