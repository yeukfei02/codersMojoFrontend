import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-ruby';
// import 'ace-builds/src-noconflict/mode-sass';
// import 'ace-builds/src-noconflict/mode-markdown';
// import 'ace-builds/src-noconflict/mode-mysql';
// import 'ace-builds/src-noconflict/mode-json';
// import 'ace-builds/src-noconflict/mode-html';
// import 'ace-builds/src-noconflict/mode-handlebars';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-csharp';
// import 'ace-builds/src-noconflict/mode-elixir';
// import 'ace-builds/src-noconflict/mode-typescript';
// import 'ace-builds/src-noconflict/mode-css';

import 'ace-builds/src-noconflict/theme-monokai';
// import 'ace-builds/src-noconflict/theme-github';
// import 'ace-builds/src-noconflict/theme-tomorrow';
// import 'ace-builds/src-noconflict/theme-kuroir';
// import 'ace-builds/src-noconflict/theme-twilight';
// import 'ace-builds/src-noconflict/theme-xcode';
// import 'ace-builds/src-noconflict/theme-textmate';
// import 'ace-builds/src-noconflict/theme-solarized_dark';
// import 'ace-builds/src-noconflict/theme-solarized_light';
// import 'ace-builds/src-noconflict/theme-terminal';

import 'ace-builds/src-min-noconflict/snippets/javascript';
import 'ace-builds/src-min-noconflict/snippets/java';
import 'ace-builds/src-min-noconflict/snippets/python';
// import 'ace-builds/src-min-noconflict/snippets/xml';
import 'ace-builds/src-min-noconflict/snippets/ruby';
// import 'ace-builds/src-min-noconflict/snippets/sass';
// import 'ace-builds/src-min-noconflict/snippets/markdown';
// import 'ace-builds/src-min-noconflict/snippets/mysql';
// import 'ace-builds/src-min-noconflict/snippets/json';
// import 'ace-builds/src-min-noconflict/snippets/html';
// import 'ace-builds/src-min-noconflict/snippets/handlebars';
import 'ace-builds/src-min-noconflict/snippets/golang';
import 'ace-builds/src-min-noconflict/snippets/csharp';
// import 'ace-builds/src-min-noconflict/snippets/elixir';
// import 'ace-builds/src-min-noconflict/snippets/typescript';
// import 'ace-builds/src-min-noconflict/snippets/css';

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
      // case 'xml':
      //   ace.config.setModuleUrl(
      //     'ace/mode/xml_worker',
      //     'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-xml.js',
      //   );
      //   break;
      case 'ruby':
        ace.config.setModuleUrl(
          'ace/mode/ruby_worker',
          'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-ruby.js',
        );
        break;
      // case 'sass':
      //   ace.config.setModuleUrl(
      //     'ace/mode/sass_worker',
      //     'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-sass.js',
      //   );
      //   break;
      // case 'markdown':
      //   ace.config.setModuleUrl(
      //     'ace/mode/markdown_worker',
      //     'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-markdown.js',
      //   );
      //   break;
      // case 'mysql':
      //   ace.config.setModuleUrl(
      //     'ace/mode/mysql_worker',
      //     'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-mysql.js',
      //   );
      //   break;
      // case 'json':
      //   ace.config.setModuleUrl(
      //     'ace/mode/json_worker',
      //     'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-json.js',
      //   );
      //   break;
      // case 'html':
      //   ace.config.setModuleUrl(
      //     'ace/mode/html_worker',
      //     'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-html.js',
      //   );
      //   break;
      // case 'handlebars':
      //   ace.config.setModuleUrl(
      //     'ace/mode/handlebars_worker',
      //     'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-handlebars.js',
      //   );
      //   break;
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
      // case 'elixir':
      //   ace.config.setModuleUrl(
      //     'ace/mode/elixir_worker',
      //     'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-elixir.js',
      //   );
      //   break;
      // case 'typescript':
      //   ace.config.setModuleUrl(
      //     'ace/mode/typescript_worker',
      //     'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-typescript.js',
      //   );
      //   break;
      // case 'css':
      //   ace.config.setModuleUrl(
      //     'ace/mode/css_worker',
      //     'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-css.js',
      //   );
      //   break;
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
        value={props.value}
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
