import MealItems from "./MealItems";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import {useState,useEffect} from "react";

const AvailableMeals = props =>{

        
      const [DUMMY_MEALS,setDummyMeals] =useState([])
      const [isLoading,setIsLoading] = useState(true);
      useEffect(()=>{
        const fetchMeals=async () => {
          const response = await fetch("http://ec2-34-220-134-123.us-west-2.compute.amazonaws.com:8100/meals/all");
          const ressponseData = await response.json();
          console.log(ressponseData);
          setDummyMeals(ressponseData);
          setIsLoading(false);
        };
        fetchMeals();
      },[])
      if(isLoading){
        return<h3 className={classes.mealsLoading}>Loading....</h3>
      }

      const MealsItem = DUMMY_MEALS.map((meal)=><MealItems key={meal.id} price={meal.price}
                                        description={meal.description} id={meal.id} name={meal.name}/>);

      return <section className={classes.meals}>
        <Card>
        <ul>
        {MealsItem}
        </ul>
        </Card>
      </section>

}
export default AvailableMeals;