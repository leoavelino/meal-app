import React from 'react'
import MacroBox from '../components/MacroBox'
import AppContext from '../context/AppContext'
import _ from 'lodash'

const Home = () => {
	const {searchParams, setSearchParams} = React.useContext(AppContext)
	console.log(_.isEmpty(searchParams))
    return <MacroBox setSearchParams={setSearchParams}/>

}

export default Home