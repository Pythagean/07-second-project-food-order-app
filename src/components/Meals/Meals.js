import React from "react";
import MealsSummary from "./MealsSummary";
// import AvailableMeals from "./AvailableMeals";
import Mealheadings from "./MealHeadings";


function Meals() {
  return (
    <React.Fragment>
      <MealsSummary />
     
      <Mealheadings />
      {/* <AvailableMeals /> */}
    </React.Fragment>
  );
}

export default Meals;
