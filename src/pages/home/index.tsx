import { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { adventures, level } = useLoaderData() as {
    adventures: AdventureCollectionType;
    level: string;
  };

  const [currentLevel, setCurrentLevel] = useState(level);

  const levels = useMemo(() => {
    const set = new Set<string>();

    Object.values(adventures["en"].adventures).forEach((p) => {
      Object.keys(p.levels).forEach((l) => {
        set.add(l);
      });
      return Object.keys(p.levels);
    });
    return Array.from(set);
  }, [adventures]);

  const getAdventures = (level: string) => {
    const x: { id: string; adventure: AdventureType }[] = [];
    Object.entries(adventures["en"].adventures).forEach(([key, value]) => {
      if (Object.keys(value.levels).includes(level)) {
        x.push({
          id: key,
          adventure: value,
        });
      }
    });
    return x;
  };

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center gap-5">
        <img className="w-[150px]" src="public/images/logo.png" />
        <h1 className="w-full text-center font-bold text-4xl">Hedy Offline</h1>
        <p className="text-center max-w-3xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
          specimen book.
        </p>
      </div>

      <div className="w-full  border-t py-6 mt-5">
        <p className="max-w-xl text-2xl font-bold mb-2">Adventure Picker</p>
        <p className="max-w-lg mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>

        <div className="flex w-full gap-2 justify-between">
          {levels.map((l) => {
            const isSelected = l === currentLevel;
            return (
              <button onClick={() => setCurrentLevel(l)} className={`border rounded-full transition-colors grid place-items-center aspect-square flex-1 ${isSelected ? "bg-blue-200" : ""}`}>
                {l}
              </button>
            );
          })}
        </div>
        <div className="min-h-[300px] mt-8">
          <div className="grid grid-cols-2  gap-5">
            {getAdventures(currentLevel).map((a) => {
              return (
                <Link to={`/editor/en/${a.id}/${currentLevel}`}>
                  <div className="bg-gray-100 h-full p-4 rounded-xl">
                    <p className="font-bold">{a.adventure.name}</p>
                    <p>{a.adventure.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
