import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Surah from './components/Surah/Surah';

export default function App() {
	return (
		<React.StrictMode>
			<div className="App">
				<div className='container'>
					<BrowserRouter>
						<Routes>
							<Route index path='/' element={<Home />} />
							<Route path='/:number' element={<Surah />} />
						</Routes>
					</BrowserRouter>
				</div>
			</div >
		</React.StrictMode>
	);
}


