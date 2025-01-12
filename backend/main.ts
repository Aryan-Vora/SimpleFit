import "jsr:@std/dotenv/load";
import { Application, Router } from "jsr:@oak/oak";

const appId = Deno.env.get("NUTRITIONX_APP_ID");
const apiKey = Deno.env.get("NUTRITIONX_API_KEY");

export async function searchFood(query: string) {
  if (!appId || !apiKey) {
    throw new Error("Missing Nutritionix API credentials");
  }

  try {
    const response = await fetch(
      `https://trackapi.nutritionix.com/v2/search/instant/?query=${encodeURIComponent(
        query
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": appId,
          "x-app-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    //return only first 5 results from common and first 5 from branded
    data.common = data.common.slice(0, 5);
    data.branded = data.branded.slice(0, 5);
    return data;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
}

export async function getNutrition(query: string) {
  if (!appId || !apiKey) {
    throw new Error("Missing Nutritionix API credentials");
  }

  try {
    const response = await fetch(
      `https://trackapi.nutritionix.com/v2/natural/nutrients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": appId,
          "x-app-key": apiKey,
        },
        body: JSON.stringify({
          query,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
}

const app = new Application();
const router = new Router();

router.get("/search", async (ctx: any) => {
  const query = ctx.request.url.searchParams.get("q");
  if (!query) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing query parameter 'q'" };
    return;
  }

  try {
    const results = await searchFood(query);
    ctx.response.body = results;
  } catch (error) {
    ctx.response.status = 500;
    if (error instanceof Error) {
      ctx.response.body = { error: error.message };
    } else {
      ctx.response.body = { error: "An unknown error occurred" };
    }
  }
});

router.post("/nutrition", async (ctx: any) => {
  try {
    const body = ctx.request.body;
    const result = await body.json();
    if (!result.query) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing query in request body" };
      return;
    }
    const results = await getNutrition(result.query);
    ctx.response.body = results;
  } catch (error) {
    ctx.response.status = 500;
    if (error instanceof Error) {
      ctx.response.body = { error: error.message };
    } else {
      ctx.response.body = { error: "An unknown error occurred" };
    }
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

if (import.meta.main) {
  console.log("Server running on http://localhost:8000");
  await app.listen({ port: 8000 });
}
