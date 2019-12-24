import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TopBar from './components/TopBar'

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import './App.scss'


function App() {
	

	return (
		<div className="App">
			<Router>
				<TopBar />
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/signup" component={Signup}></Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
