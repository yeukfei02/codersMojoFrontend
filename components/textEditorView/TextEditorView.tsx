import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import CustomTextEditor from '../customTextEditor/CustomTextEditor';

import NextHead from '../nextHead/NextHead';

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999',
  }),
};

function TextEditorView(): JSX.Element {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [selectedModeList, setSelectedModeList] = useState<any[]>([]);
  const [selectedMode, setSelectedMode] = useState<any>({ label: 'python', value: 'python' });

  const [selectedFontSizeList, setSelectedFontSizeList] = useState<any[]>([]);
  const [selectedFontSize, setSelectedFontSize] = useState<any>({ label: 20, value: 20 });

  const [mode, setMode] = useState('python');
  const [fontSize, setFontSize] = useState(20);
  const [value, setValue] = useState(`def my_function():
  print("Hello from a function")`);

  useEffect(() => {
    getQuestionTitleAndQuestionDescription();
    getSelectedModeList();
    getSelectedFontSizeList();
  }, []);

  const getQuestionTitleAndQuestionDescription = async () => {
    const mockInterviewQuestionId = localStorage.getItem('mockInterviewQuestionId');
    const token = localStorage.getItem('token');
    if (mockInterviewQuestionId && token) {
      const queryString = new URLSearchParams({
        mockInterviewQuestionId: mockInterviewQuestionId,
        token: token,
      });
      const response = await fetch(`/api/mock-interview-question?${queryString}`);
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          setQuestionTitle(responseData.result.result.question_title);
          setQuestionDescription(responseData.result.result.question_description);
        }
      }
    }
  };

  const getSelectedModeList = () => {
    const selectedModeList = [
      {
        label: 'javascript',
        value: 'javascript',
      },
      {
        label: 'java',
        value: 'java',
      },
      {
        label: 'python',
        value: 'python',
      },
      // {
      //   label: 'xml',
      //   value: 'xml',
      // },
      {
        label: 'ruby',
        value: 'ruby',
      },
      // {
      //   label: 'sass',
      //   value: 'sass',
      // },
      // {
      //   label: 'markdown',
      //   value: 'markdown',
      // },
      // {
      //   label: 'mysql',
      //   value: 'mysql',
      // },
      // {
      //   label: 'json',
      //   value: 'json',
      // },
      // {
      //   label: 'html',
      //   value: 'html',
      // },
      // {
      //   label: 'handlebars',
      //   value: 'handlebars',
      // },
      {
        label: 'golang',
        value: 'golang',
      },
      {
        label: 'csharp',
        value: 'csharp',
      },
      {
        label: 'elixir',
        value: 'elixir',
      },
      {
        label: 'typescript',
        value: 'typescript',
      },
      // {
      //   label: 'css',
      //   value: 'css',
      // },
    ];
    setSelectedModeList(selectedModeList);
  };

  const getSelectedFontSizeList = () => {
    const selectedFontSizeList = [
      {
        label: 14,
        value: 14,
      },
      {
        label: 16,
        value: 16,
      },
      {
        label: 18,
        value: 18,
      },
      {
        label: 20,
        value: 20,
      },
      {
        label: 24,
        value: 24,
      },
      {
        label: 28,
        value: 28,
      },
      {
        label: 32,
        value: 32,
      },
      {
        label: 40,
        value: 40,
      },
    ];
    setSelectedFontSizeList(selectedFontSizeList);
  };

  const handleModeDropdownChange = (selectedMode: any) => {
    if (selectedMode) {
      setSelectedMode(selectedMode);
      setMode(selectedMode.value);
      setTextEditorDefaultValue(selectedMode.value);
    } else {
      setSelectedMode({ label: 'python', value: 'python' });
      setMode('python');
      setValue(`def my_function():
  print("Hello from a function")`);
    }
  };

  const handleFontSizeDropdownChange = (selectedFontSize: any) => {
    if (selectedFontSize) {
      setSelectedFontSize(selectedFontSize);
      setFontSize(selectedFontSize.value);
    } else {
      setSelectedFontSize({ label: 20, value: 20 });
      setFontSize(20);
    }
  };

  const setTextEditorDefaultValue = (mode: string) => {
    switch (mode) {
      case 'javascript':
        setValue(`function test() {
  console.log(123);
}

test();`);
        break;
      case 'java':
        setValue(`class Simple {  
  public static void main(String args[]){  
    System.out.println("Hello Java");  
  }
}`);
        break;
      case 'python':
        setValue(`def my_function():
  print("Hello from a function")`);
        break;
      case 'xml':
        setValue(`<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`);
        break;
      case 'ruby':
        setValue(`def test()
  puts "Hello from test"
end

test`);
        break;
      case 'sass':
        setValue(`$font-stack: Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
`);
        break;
      case 'markdown':
        setValue(`# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.`);
        break;
      case 'mysql':
        setValue(`select * from users;`);
        break;
      case 'json':
        setValue(`{
  "menu": {
    "id": "file",
    "value": "File",
    "popup": {
      "menuitem": [
        {"value": "New", "onclick": "CreateNewDoc()"},
        {"value": "Open", "onclick": "OpenDoc()"},
        {"value": "Close", "onclick": "CloseDoc()"}
      ]
    }
  }
}`);
        break;
      case 'html':
        setValue(`<h1>test</h1>`);
        break;
      case 'handlebars':
        setValue(`<p>{{firstname}} {{lastname}}</p>`);
        break;
      case 'golang':
        setValue(`package main

import "fmt"

func main() {
  fmt.Println("hello world")
}`);
        break;
      case 'csharp':
        setValue(`class Hello {         
  static void Main(string[] args) {
    System.Console.WriteLine("Hello World!");
  }
}`);
        break;
      case 'elixir':
        setValue(`IO.puts("Hello, World!")`);
        break;
      case 'typescript':
        setValue(`interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0,
};
`);
        break;
      case 'css':
        setValue(`body {
  background-color: lightblue;
}`);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <NextHead />

      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h4 className="my-2">
                <b>{questionTitle}</b>
              </h4>
              <div className="my-4" style={{ fontSize: 16, whiteSpace: 'pre-line' }}>
                {questionDescription}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="row mb-3">
            <div className="col-sm d-flex justify-content-center">
              <Select
                className="w-100"
                styles={selectStyles}
                placeholder={'Select mode'}
                value={selectedMode}
                onChange={handleModeDropdownChange}
                options={selectedModeList}
                isClearable={true}
              />
            </div>
            <div className="col-sm d-flex justify-content-center">
              <Select
                className="w-100"
                styles={selectStyles}
                placeholder={'Select font size'}
                value={selectedFontSize}
                onChange={handleFontSizeDropdownChange}
                options={selectedFontSizeList}
                isClearable={true}
              />
            </div>
          </div>
          <CustomTextEditor mode={mode} fontSize={fontSize} value={value} />
        </div>
      </div>
    </div>
  );
}

export default TextEditorView;
