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

    const removeRepeatedMeals = (data) => _.uniqWith(data, (a, b) =>
        a.title === b.title && a.fat === b.fat && a.protein === b.protein && a.carbs === b.carbs && a.calories === b.calories);

    const fetchMeals = ({ protein, carbs, fat }) => {
        setFetchingMeals(true);
        axios
            .post(`${process.env.REACT_APP_MEET_PLAN_API}/meals`, {
                carbs,
                fat,
                protein
            })
            .then(response => {
                setFetchingMeals(false);
                setMealsData(removeRepeatedMeals(response.data));
            })
            .catch(err => console.error(err));
    };

    const fetchMealInfo = mealId => {
        setFetchingMeals(true);
        const url = `${process.env.REACT_APP_MEET_PLAN_API}/meals/${mealId}`;
        axios
            .get(url)
            .then(response => {
                const sourceUrl = response.data.sourceUrl;
                console.log(sourceUrl);
                window.location.href = sourceUrl;
            })
            .catch(err => console.error(err));
    };

    React.useEffect(() => {
        if (!_.isEmpty(searchParams)) {
            fetchMeals(searchParams);
        }
    }, []);

    return fetchingMeals ? (
        <div className="rainbow-align-content_center rainbow-position_relative margin-20">
            <Spinner variant="brand" size="medium" />
            <h1 className="rainbow-color_brand rainbow-font-size-text_medium rainbow-p-top_xx-large rainbow-m-top_xx-large rainbow-m-bottom_large">
                Loading...
                </h1>
        </div>
    ) : _.isEmpty(mealsData) ?
            <div className="recipe-not-found">
                We could not find recipes for the specified macronutrients. <Link style={{ paddingLeft: '5px' }} to="/">Go back</Link>
            </div>
            : (<div className="meals-container">
                <div className="recipes-main">
                    {!_.isEmpty(mealsData) && _.map(mealsData, recipe => (
                        <div key={recipe.id}>
                            <Card
                                title={<MealTitle recipe={recipe} />}
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
                                    alt=""
                                />
                            </Card>
                        </div>
                    ))}
                </div>
            </div>);

};

const MealTitle = ({ recipe }) => {
    const formatTitle = (title) => {
        const formattedTitle = _.startCase(title.toLowerCase());
        if (title.length > 46) {
            return formattedTitle.slice(0, 45) + '...';
        }
        return formattedTitle;
    };

    return (
        <div className="recipe-title-container">
            <div className="recipe-title-text">
                {formatTitle(recipe.title)}
            </div>
            <div className="recipe-title-macros">
                <div>Calories: {recipe.calories}</div>
                <div>Protein: {recipe.protein}</div>
                <div>Carbohydrates: {recipe.carbs}</div>
                <div>Fat: {recipe.fat}</div>
            </div>
        </div>
    );
};

export default Meals;