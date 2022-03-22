

import React from "react";
import Prism from "prismjs";
import AceEditor from "react-ace";
import "brace/theme/monokai"; 
// import "brace/mode/"; 
import "ace-builds/src-noconflict/mode-aql";


import { useSelector } from "react-redux";
import selectFontSize from "../selectors/select-font-size";

const CustomEditor = ({ valueEditor, onValueEditorChange, disabled }) => {
  const reduxFontsize = useSelector(selectFontSize);

  React.useEffect(() => {
   
      Prism.highlightAll();
    
  }, [valueEditor, onValueEditorChange]);
  return (
    <>
     <AceEditor
    mode="aql"
    width="100%"
    height="100vh"
    fontSize={reduxFontsize}
    theme="monokai"
    value={valueEditor}
    readOnly={disabled ? disabled : false}
    onChange={onValueEditorChange}
    name="464322619241985234342"
    editorProps={{ $blockScrolling: true }}
    
  />
    </>
  );
};

export default CustomEditor;
