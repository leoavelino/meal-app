import React from 'react'
import MacroBox from '../components/MacroBox'
import AppContext from '../context/AppContext'
import _ from 'lodash'

const Home = () => {
	const {setSearchParams} = React.useContext(AppContext)
    return <MacroBox setSearchParams={setSearchParams}/>

}

export default Home