import { HedyResponse } from "../types";

export const fetchHedy = async (code: string, level: string): Promise<HedyResponse> => {
  const url = "http://localhost:4444/parse";
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      code,
      level,
    }),
  });

  return await response.json();
};
