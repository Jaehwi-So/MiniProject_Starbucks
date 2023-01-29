import { Starbucks } from "../models/starbucks.model.js";

export const getStarbucksMenuList = async () => {
    const list = await Starbucks.find();
    return list;
}