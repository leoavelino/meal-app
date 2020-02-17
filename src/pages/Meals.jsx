import React from 'react';
import { Card } from 'react-rainbow-components';
import { Button } from 'react-rainbow-components';
import _ from 'lodash';
import axios from 'axios';
import { Spinner } from 'react-rainbow-components';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';

const Meals = () => {
    const [fetchingMeals, setFetchingMeals] = React.useState(false);
    const [mealsData, setMealsData] = React.useState();
    const { searchParams } = React.useContext(AppContext);

    const fetchMeals = ({ protein, carbs, fat }) => {
        setFetchingMeals(true);
        const url = 'https://api.meetplan.ml/api/v1/meals';
        // const url = 'http://localhost:3001/api/v1/meals'
        axios
            .post(url, {
                carbs,
                fat,
                protein
            })
            .then(response => {
                setFetchingMeals(false);
                setMealsData(response.data);
            })
            .catch(err => console.error(err));
    };

    const fetchMealInfo = mealId => {
        setFetchingMeals(true);
        const url = `https://api.meetplan.ml/api/v1/meals/${mealId}`;
        // const url = `http://localhost:3001/api/v1/meals/${mealId}`
        axios
            .get(url)
            .then(response => {
                const sourceUrl = response.data.sourceUrl;
                console.log(sourceUrl);
                window.location.href = sourceUrl;
            })
            .catch(err => console.error(err));
    };

    const formatTitle = (title) => {
        const formattedTitle = _.startCase(title.toLowerCase());
        if (title.length > 46) {
            return formattedTitle.slice(0, 45) + '...';
        }
        return formattedTitle;
    };
    React.useEffect(() => {
        if (!_.isEmpty(searchParams)) {
            fetchMeals(searchParams);
        }
    }, []);
    console.log({ searchParams, mealsData });

    return fetchingMeals ? (
        <div className="rainbow-align-content_center rainbow-position_relative margin-20">
            <Spinner variant="brand" size="medium" />
            <h1 className="rainbow-color_brand rainbow-font-size-text_medium rainbow-p-top_xx-large rainbow-m-top_xx-large rainbow-m-bottom_large">
                Loading...
                </h1>
        </div>
    ) : _.isEmpty(mealsData) ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
                We could not find recipes for the specified macronutrients. <Link style={{paddingLeft: '5px'}}to="/">Go back</Link>
        </div>
            : (<div className="meals-container">
                <div className="recipes-main">
                    {!_.isEmpty(mealsData) && _.map(mealsData, recipe => (
                        <div key={recipe.id} className="recipe-card">
                            <Card
                                title={
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ fontSize: '20px', fontWeight: '500', height: '2.5em' }}>
                                            {formatTitle(recipe.title)}
                                        </div>
                                        <div style={{ paddingTop: '15px', fontWeight: 300 }}>
                                            <div>Calories: {recipe.calories}</div>
                                            <div>Protein: {recipe.protein}</div>
                                            <div>Carbohydrates: {recipe.carbs}</div>
                                            <div>Fat: {recipe.fat}</div>
                                        </div>
                                    </div>
                                }
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
            </div>);

};

export default Meals;