import React from 'react'

import { Card } from 'react-rainbow-components'
import { Input } from 'react-rainbow-components'
import { Button } from 'react-rainbow-components'

const MacroBox = ({ displayMacroBox, fetchMeals }) => {

    const [protein, setProtein] = React.useState(30)
    const [carbs, setCarbs] = React.useState(30)
    const [fat, setFat] = React.useState(12)

    const handleProteinInputChange = (value) => {
        setProtein(parseInt(value))
    }
    const handleCarbsInputChange = (value) => {
        setCarbs(parseInt(value))
    }
    const handleFatInputChange = (value) => {
        setFat(parseInt(value))
    }

    return displayMacroBox ? (
        <div className="macro-box">
            <Card
                className="macro-box-card"
                title={
                    <span className="macro-box-title">
                        Input the macro nutrients for your meal
                    </span>
                }
            >
                <Input
                    className="macro-input"
                    label="Protein (g)"
                    placeholder="30"
                    type="number"
                    onChange={evt => handleProteinInputChange(evt.target.value)}
                />
                <Input
                    className="macro-input"
                    label="Carbohydrates (g)"
                    placeholder="30"
                    type="number"
                    onChange={evt => handleCarbsInputChange(evt.target.value)}
                />
                <Input
                    className="macro-input"
                    label="Fat (g)"
                    placeholder="12"
                    type="number"
                    onChange={evt => handleFatInputChange(evt.target.value)}
                />
                <Button
                    className="get-meal-btn"
                    label="Get Meal"
                    onClick={() => fetchMeals(protein, carbs, fat)}
                    variant="brand"
                />
            </Card>
        </div>
    ) : null
}

export default MacroBox