import { useContext } from "react";
import { RecipeListContext } from "../context/RecipeListContext";

function useRecipeList() {
  const context = useContext(RecipeListContext)

  if (context === undefined)
    return new Error("useRecipeList() must be used inside a ThemeProvider");

  return context;
}

export { useRecipeList };
