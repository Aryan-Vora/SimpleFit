import { assertEquals } from '@std/assert';
import type { FoodDetailsResponse } from './types.ts';

//test with the query "apple"
Deno.test('test nutrition', async () => {
  const response = await fetch('http://localhost:8000/nutrition?query=apple', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: 'apple' }),
  });
  const data = (await response.json()) as FoodDetailsResponse;
  // Check if the response has the correct structure
  assertEquals(Array.isArray(data.foods), true);

  // If there are foods, verify the structure of the first item
  if (data.foods.length > 0) {
    const food = data.foods[0];
    assertEquals(typeof food.food_name, 'string');
    assertEquals(typeof food.serving_qty, 'number');
    assertEquals(typeof food.serving_unit, 'string');
    assertEquals(typeof food.nf_calories, 'number');
    assertEquals(typeof food.nf_total_fat, 'number');
    assertEquals(typeof food.nf_total_carbohydrate, 'number');
    assertEquals(typeof food.nf_protein, 'number');
    assertEquals(typeof food.serving_weight_grams, 'number');
  }
});
