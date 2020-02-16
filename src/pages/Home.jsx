import React from 'react'
import axios from 'axios'
import MacroBox from '../components/MacroBox'
import { Spinner } from 'react-rainbow-components'
import {useLocation} from 'react-router-dom'
import AppContext from '../context/AppContext'
import _ from 'lodash'

const Home = () => {
	const {searchParams, setSearchParams} = React.useContext(AppContext)
	console.log(_.isEmpty(searchParams))
    return <MacroBox setSearchParams={setSearchParams}/>

}

export default Home