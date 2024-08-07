import { Children } from "react";
import { FontProvider } from "./Font";

export function AppProvider({}){
    return <FontProvider>{Children}</FontProvider>;
}