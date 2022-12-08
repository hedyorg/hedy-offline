import { useContext } from "react";
import Banner from "../banner";
import Console from "./console";
import ResultsContext from "./context";

const Output: React.FC = () => {
  const props = useContext(ResultsContext);

  return (
    <div className="py-2 flex flex-col relative h-full gap-4">
      <Banner status={props.status} errorContent="There was an error running your code" successContent="Your code ran successfully!" pendingContent="Your code is running..." />

      <Console />

      <div className="h-12" />
    </div>
  );
};

export default Output;
