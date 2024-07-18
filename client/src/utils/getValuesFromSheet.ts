import { getValuesFromString } from "./getValuesFromString";

export const getValuesFromSheet = async (id: string) => {
  const URL = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
  let csv;
  try {
    const response = await fetch(URL);
    csv = await response.text();
  } catch (error) {
    throw Error("Error fetching CSV");
  }
  return getValuesFromString(csv, ",");
};
