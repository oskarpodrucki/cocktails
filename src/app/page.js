'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function Home() {
  const [alcohols, setAlcohols] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getAlcohols = async () => {
        let fetchedAlcohols = [];
        for (let i = 0; i < 50; i++) {
          try {
            const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
            const dataJson = await res.json();
            fetchedAlcohols.push(dataJson.drinks[0]);
          } catch (error) {
            console.log(error);
          }
        }
        setAlcohols(fetchedAlcohols);
        setIsLoading(false);
      };
      getAlcohols();
    }
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-row flex-wrap justify-center items-center h-screen p-4 bg-gradient-to-b from-gray-100 to-white">
      {alcohols.map((alcohol, index) => (
        <Card key={index} className="w-[300px] h-[700px] m-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gray-200 rounded-t-lg p-4">
            <CardTitle className="text-lg font-bold">{alcohol.strDrink}</CardTitle>
            <CardDescription className="text-sm">{alcohol.strCategory} - {alcohol.strAlcoholic}</CardDescription>
          </CardHeader>
          <ScrollArea className="h-[600px]">
            <CardContent className="p-4 overflow-y-auto h-full">
              <p className="mb-2 font-semibold">Instructions:</p>
              <p>{alcohol.strInstructions}</p>
              <Image 
                src={alcohol.strDrinkThumb} 
                alt={alcohol.strDrink} 
                width={300}
                height={300}
                className="w-full h-auto mt-2 rounded-md"
              />
              <p className="mt-4 font-semibold">Ingredients:</p>
              <ul className="list-disc list-inside">
                {Object.keys(alcohol).filter(key => key.startsWith('strIngredient') && alcohol[key]).map((ingredient, idx) => (
                  <li key={idx}>
                    {alcohol[ingredient]} - {alcohol[`strMeasure${idx + 1}`]}
                  </li>
                ))}
              </ul>
            </CardContent>
            <ScrollBar />
          </ScrollArea>
        </Card>
      ))}
    </div>
  );
}
