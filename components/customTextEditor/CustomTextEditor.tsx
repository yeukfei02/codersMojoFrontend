import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-csharp';

import 'ace-builds/src-noconflict/theme-monokai';

import 'ace-builds/src-min-noconflict/snippets/javascript';
import 'ace-builds/src-min-noconflict/snippets/java';
import 'ace-builds/src-min-noconflict/snippets/python';
import 'ace-builds/src-min-noconflict/snippets/ruby';
import 'ace-builds/src-min-noconflict/snippets/golang';
import 'ace-builds/src-min-noconflict/snippets/csharp';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/ext-spellcheck';
import 'ace-builds/src-min-noconflict/ext-searchbox';

import ace from 'ace-builds/src-noconflict/ace';
ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/');
ace.config.setModuleUrl(
  'ace/mode/javascript_worker',
  'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-javascript.js',
);

function CustomTextEditor(props: any): JSX.Element {
  const handleOnLoad = () => {
    setAceConfigUrl(props.mode);
  };

  const handleOnChange = (newValue: string) => {
    console.log('newValue = ', newValue);
    localStorage.setItem('source', newValue);
  };

  const setAceConfigUrl = (mode: string) => {
    switch (mode) {
      case 'javascript':
        ace.config.setModuleUrl(
          'ace/mode/javascript_worker',
          'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-javascript.js',
        );
        break;
      case 'java':
        ace.config.setModuleUrl(
          'ace/mode/java_worker',
          'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-java.js',
        );
        break;
      case 'python':
        ace.config.setModuleUrl(
          'ace/mode/python_worker',
          'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-python.js',
        );
        break;
      case 'ruby':
        ace.config.setModuleUrl(
          'ace/mode/ruby_worker',
          'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-ruby.js',
        );
        break;
      case 'golang':
        ace.config.setModuleUrl(
          'ace/mode/golang_worker',
          'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-golang.js',
        );
        break;
      case 'csharp':
        ace.config.setModuleUrl(
          'ace/mode/csharp_worker',
          'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-csharp.js',
        );
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <AceEditor
        width="100%"
        height="100vh"
        placeholder="// your code here"
        mode={props.mode}
        theme="monokai"
        name="customTextEditor"
        onLoad={handleOnLoad}
        onChange={handleOnChange}
        fontSize={props.fontSize}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={localStorage.getItem('source') || props.value}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}

export default CustomTextEditor;
