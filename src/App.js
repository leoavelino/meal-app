import React, {useState} from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Meals from './pages/Meals.jsx'
import TopBar from './components/TopBar'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppContext from './context/AppContext'

import './App.scss'


function App() {
	
	const [authContext, setAuthContext] = useState({isLoggedIn: false})
	const [searchParams, setSearchParams] = useState({})

	const context = {
		authContext,
		setAuthContext,
		searchParams,
		setSearchParams
	}

	return (
		<AppContext.Provider value={context}>
		<div className="App">
			<Router>
				<TopBar />
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/signup" component={Signup}></Route>
					<Route path="/meals" component={Meals}></Route>
				</Switch>
			</Router>
		</div>
		</AppContext.Provider>
	)
}

export default App
