import { createClient } from "@/lib/supabase/server";
import {
  getAllFavorites,
  addFavorite,
} from "@/lib/services/favoriteService";

export async function GET() {
  try {
    const data = await getAllFavorites();
    return Response.json(data);
  } catch (error) {
    console.error("ERROR GET FAVORITES:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const supabase = await createClient();
const {
  data: { user },
} = await supabase.auth.getUser();

console.log("AUTH USER DI FAVORITES:", user);
    const body = await request.json();

    console.log("FAVORITE BODY:", body);

    const result = await addFavorite(body);

    console.log("FAVORITE RESULT:", result);

    if (!result.success) {
      return Response.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return Response.json(result.data, {
      status: result.status,
    });
  } catch (error) {
    console.error("ERROR ADD FAVORITE:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}