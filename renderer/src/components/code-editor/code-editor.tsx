import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/theme-chrome";

interface CodeEditorType {
  code: string;
  setCode: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorType> = (props) => {
  return (
    <div className="w-full h-full">
      <AceEditor
        value={props.code}
        onChange={(code) => {
          props.setCode(code);
        }}
        className="font-mono h-full"
        width="100%"
        height="100%"
        fontSize="20px"
        theme="chrome"
        wrapEnabled={true}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
      ,
    </div>
  );
};

export default CodeEditor;
