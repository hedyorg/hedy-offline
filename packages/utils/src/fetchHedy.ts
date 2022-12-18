const fetchHedy = async (code: string, level: string, port: string, isOnline: boolean): Promise<HedyResponse> => {
  const url = isOnline ? "https://www.hedycode.com/parse" : `http://localhost:${port}/parse`;
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

export default fetchHedy;
