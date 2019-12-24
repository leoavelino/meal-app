import React from 'react'
import logo from './logo.svg'
import MacroBox from './components/MacroBox'
import Meals from './components/Meals'


import './App.scss'
import { Spinner } from 'react-rainbow-components'
import axios from 'axios'

function App() {

	const [fetchingMeals, setFetchingMeals] = React.useState(false)

	const [mealsData, setMealsData] = React.useState()

	const [displayMeals, setDisplayMeals] = React.useState(false)

	const fetchMeals = (protein, carbs, fat) => {
		setFetchingMeals(true)
		const url = 'https://api.meetplan.ml/api/v1/meals'
		// const url = 'http://localhost:3001/api/v1/meals'
		axios.post(url, {
			carbs, fat, protein
		}).then((response) => {
			setFetchingMeals(false)
			setDisplayMeals(true)
			setMealsData(response.data)
		}).catch(err => console.error(err))
		// setTimeout(() => {
		// 	setDisplayMeals(true)
		// 	setFetchingMeals(false)
		// 	setMealsData('sth')
		// }, 1000)
	}

	const fetchMealInfo = (mealId) => {
		setFetchingMeals(true)
		const url = `https://api.meetplan.ml/api/v1/meals/${mealId}`
		// const url = `http://localhost:3001/api/v1/meals/${mealId}`
		axios.get(url).then((response) => {
			const sourceUrl = response.data.sourceUrl
			console.log(sourceUrl)
			window.location.href = sourceUrl
		}).catch(err => console.error(err))
	}

	return (
		<div className="App">
			{fetchingMeals ? 
				<div className="rainbow-align-content_center rainbow-position_relative margin-20">
					<Spinner variant="brand" size="medium" /> 
					<h1 className="rainbow-color_brand rainbow-font-size-text_medium rainbow-p-top_xx-large rainbow-m-top_xx-large rainbow-m-bottom_large">Loading...</h1>
				</div>
				:
				<>
					<MacroBox
						displayMacroBox={!displayMeals}
						fetchMeals={fetchMeals}
					/>
					<Meals
						displayMeals={displayMeals}
						mealsData={mealsData}
						fetchMealInfo={fetchMealInfo}
					/>
				</>
			}
			
		</div>
	)
}

export default App
