import { GetStaticProps } from "next";

type Props = {
  greeting: string;
};

const App: React.FC<Props> = (props) => {
  return (
    <div>
      <h1 className="text-3xl">{props.greeting}</h1>
    </div>
  );
};

export default App;

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      greeting: "Hello World!",
    },
  };
};
