import React, {useState} from "react";
import AvailableMeals from "./AvailableMeals";
import classes from "./MealHeadings.module.css";
import Card from "../UI/Card";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const mealHeadings = [
  {
    id: 1,
    name: "Burgers",
  },
  {
    id: 2,
    name: "Sides",
  },
  {
    id: 3,
    name: "Drinks",
  },
];



function MealHeadings() {

  const [selectedTab, setSelectedTab] = useState("Burgers");
  const [selectedTabId, setSelectedTabId] = useState(1);

  const mealsList = mealHeadings.map((meal) => <Tab value={meal.id} key={meal.id} label={meal.name} />);

  function tabChangeHandler(event, newValue) {
    setSelectedTab(event.currentTarget.textContent);
    setSelectedTabId(newValue);
  }

  return (
    <section className={classes.mealHeadings}>
      <Card>
        <Tabs
          value={selectedTabId}
          onChange={tabChangeHandler}
          aria-label="basic tabs example"
        >
          {mealsList}
        </Tabs>
        <AvailableMeals selectedTab={selectedTab} />
      </Card>
    </section>

    // <section className={classes.meals}>
    //   <Card>
    //     <ul>{mealsList}</ul>
    //   </Card>
    // </section>
  );
}

export default MealHeadings;
