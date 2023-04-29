import { useEffect, useState } from 'react';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [Data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://foodorder-749de-default-rtdb.firebaseio.com/Categories.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      
      const loadeddata = [];

      for (const data in responseData) {
        loadeddata.push(responseData[data]);
      }
      
      const loadedcategories = [];

      const loadedSubcategories = [];

      const loadedMeals = [];

      for (const data in loadeddata) {
        const d = loadeddata[data]
        for (const data in d) {
          const d1 = d[data]
          for (const data in d1) {
            loadedMeals.push({
              id: d1[data].name,
              img: d1[data].img,
              name: d1[data].name,
              description: d1[data].description,
              price: Number(d1[data].price),
            })
          }
          loadedSubcategories.push(d1)
        }
        loadedcategories.push(d)
      }
      setMeals(loadedMeals); 
      setSubcategories(loadedSubcategories)
      setCategories(loadedcategories)
      setData(loadeddata)
      setIsLoading(false);
    };
   
    
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    
    <MealItem
      key={meal.id}
      id={meal.id}
      img={meal.img}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));


  console.log(Data, categories, subcategories);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-6'>{mealsList}</div>
  );
};

export default AvailableMeals;
