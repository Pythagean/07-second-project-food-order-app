import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import axios from "axios";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Cheeky Chicken",
//     groupName: "Burgers",
//     description:
//       "24hr Marinated Fried Chicken, American Cheddar, Home-Made Chipotle Honey BBQ Sauce, Japanese Mayo & Lettuce Served on Our Famous Home-Made Bun.",
//     price: 16.9,
//   },
//   {
//     id: "m2",
//     name: "Basic Junior (Kids Burger)",
//     groupName: "Burgers",
//     description:
//       "120g Dry Aged Angus Beef, American Cheddar, Ketchup, Mustard, White Onions & Pickles Served on Our Famous Home-Made Bun.",
//     price: 14.9,
//   },
//   {
//     id: "m3",
//     name: "La Resistance",
//     groupName: "Burgers",
//     description:
//       "150g Dry Aged Angus Beef, American Cheddar, Lettuce, Spanish Onion, NY Pickles, Resistance Secret Spread, Tomato Relish Served on Our Famous Home-Made Bun.",
//     price: 18.9,
//   },
//   {
//     id: "m4",
//     name: "Chilli Cheese Burger",
//     groupName: "Burgers",
//     description:
//       "150g Dry Aged Angus Beef, Double American Cheddar, Fried Onion, Diced White Onion, Jalapeños, Chipotle Aioli, Resistance Chilli Sauce Served on Our Famous Home-Made Bun.",
//     price: 18.0,
//   },
//   {
//     id: "m5",
//     name: "Pollo Escobar",
//     groupName: "Burgers",
//     description:
//       "24hr Marinated Chicken, American Cheddar, Bacon, Resistance Sauce, New York Pickles & Lettuce served on our Famous Home-Made Bun.",
//     price: 18.9,
//   },
//   {
//     id: "m6",
//     name: "Supremo De Resistance",
//     groupName: "Burgers",
//     description:
//       "150g Dry Aged Angus Beef, American Cheddar, Bacon, House Caramelised Onion, Pineapple, Lettuce, Tomato, Spanish Onion, Resistance Dark Sauce and Kewpie served on our Famous Home-Made Bun.",
//     price: 23.0,
//   },
//   {
//     id: "m7",
//     name: "Satoshi Nagamoto",
//     groupName: "Burgers",
//     description:
//       "12hr Marinated Katsu Fried Chicken, Teriyaki Glaze, Pickled Red Cabbage, Spring Onion, Yuzu Mayo served on a Home-Made Bun.",
//     price: 19.0,
//   },
//   {
//     id: "m8",
//     name: "Bacon Cheesy Fries",
//     groupName: "Sides",
//     description:
//       "Seasoned Beer Battered Fries, Crispy Bacon Bits topped with Cheese Sauce, Tangy Golf Sauce, Spicy Sriracha Sauce & Sweet Chilli Sauce.",
//     price: 10.5,
//   },
//   {
//     id: "m9",
//     name: "Pulled Pork Fries",
//     groupName: "Sides",
//     description:
//       "Seasoned Beer Battered Fries topped with Jalapenos & 12hr Slow-Cooked Sweet Sticky Smokey Pulled Pork covered with Cheese Sauce.",
//     price: 14.5,
//   },
//   {
//     id: "m10",
//     name: "Loaded Chicken Bites",
//     groupName: "Sides",
//     description:
//       "Crispy Buttermilk Fried Chicken Pieces Loaded with Cheese Sauce & Tangy Golf Sauce.",
//     price: 14.5,
//   },
//   {
//     id: "m11",
//     name: "Coke",
//     groupName: "Drinks",
//     description: "Can of Coke",
//     price: 3.0,
//   },
//   {
//     id: "m12",
//     name: "Pepsi Ma",
//     groupName: "Drinks",
//     description: "Can of Pepsi Max",
//     price: 3.0,
//   },
//   {
//     id: "m13",
//     name: "Oreo Thickshake",
//     groupName: "Drinks",
//     description: "Choclate, Oreo & Cream",
//     price: 9.5,
//   },
//   {
//     id: "m14",
//     name: "Chocolate Peanut Butter Thickshake",
//     groupName: "Drinks",
//     description: "Chocolate, Peanut Butter,Cream & Crushed Reese’s",
//     price: 9.5,
//   },
//   {
//     id: "m15",
//     name: "Blueberry Cheesecake",
//     groupName: "Drinks",
//     description: "Homemade Blueberry Syrup, Cream Cheese, Biscuit Crumbs",
//     price: 9.5,
//   },
// ];

function AvailableMeals(props) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  function fetchAvailableMealsHandler() {
    setIsLoading(true);

    axios
      .get(
        "https://food-order-app-c4b5f-default-rtdb.firebaseio.com//meals.json"
      )
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error("Something went wrong!");
        }

        const responseData = response.data;
        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            groupName: responseData[key].groupName,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }

        setAvailableMeals(loadedMeals);
      })
      .catch(function (error) {
        setIsLoading(false);
        setHttpError(error.message);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    try {
      fetchAvailableMealsHandler();
    } catch (e) {
      setIsLoading(false);
      setHttpError(e.message);
    }
  }, []);

  if (isLoading) {
    return <section className={classes.MealsLoading}>Loading...</section>;
  }

  if (httpError) {
    return <section className={classes.MealsError}>{httpError}</section>
  }

  const mealsList = availableMeals
    .filter((x) => x.groupName === props.selectedTab)
    .map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        groupName={meal.groupName}
      />
    ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
