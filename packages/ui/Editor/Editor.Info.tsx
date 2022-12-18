import { useContext } from "react";
import EditorContext from "./Editor.Context";
import Text from "../Text";

interface InfoPanelType {}

const EditorInfo: React.FC<InfoPanelType> = (props) => {
  const { level } = useContext(EditorContext)!;
  if (level === null) return <div />;

  return (
    <div className="w-full h-full p-6 pt-2 pr-12">
      <div className="flex gap-5 flex-col">
        {level?.story_text && <ContentBlock story={level.story_text} code={level?.example_code} showBorder={false} />}

        {level?.story_text_2 && <ContentBlock showBorder={true} story={level.story_text_2} code={level?.example_code_2} />}

        {level?.story_text_3 && <ContentBlock showBorder={true} story={level.story_text_3} code={level?.example_code_3} />}

        {level?.story_text_4 && <ContentBlock showBorder={true} story={level.story_text_4} code={level?.example_code_4} />}

        {level?.story_text_5 && <ContentBlock showBorder={true} story={level.story_text_5} code={level?.example_code_5} />}

        {level?.story_text_6 && <ContentBlock showBorder={true} story={level.story_text_6} code={level?.example_code_6} />}

        <div className="h-12" />
      </div>
    </div>
  );
};

const ContentBlock: React.FC<{
  story?: string;
  code?: string;
  showBorder: boolean;
}> = (props) => {
  return (
    <div className={`flex py-2 flex-col gap-5`}>
      {props.story && <Text content={props.story} />}
      {props.code && <Text content={props.code} />}
    </div>
  );
};

export default EditorInfo;
