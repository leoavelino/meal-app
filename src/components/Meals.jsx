import React from 'react'
import recipesInfo from '../mocks/recipesInfo.json'
import { Card } from 'react-rainbow-components'
import { Button } from 'react-rainbow-components';
import _ from 'lodash'

const Meals = ({ displayMeals, mealsData, fetchMealInfo }) => {

    console.log({mealsData})
    return displayMeals ? (
        <div className="meals-container">
            <div className="recipes-main">
                {!_.isEmpty(mealsData) && _.map(mealsData, recipe => (
                    <div key={recipe.id} className="recipe-card">
                        <Card
                            title={<span style={{fontSize: '20px', fontWeight: '500', height: '2.5em'}}>{_.startCase(recipe.title)}</span>}
                            footer={<div className="rainbow-m-horizontal_medium">
                                        <Button 
                                            variant="base" 
                                            label="View details" 
                                            onClick={() => fetchMealInfo(recipe.id)}
                                        />
                                    </div>
                            }
                        >
                            <img
                                src={recipe.image}
                                height={231}
                                width={312}
                                className="rainbow-p-vertical_x-large rainbow-m_auto rainbow-align-content_center"
                                alt="" />
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    ) : null
}

export default Meals