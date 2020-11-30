import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import CustomTextEditor from '../customTextEditor/CustomTextEditor';
import axios from 'axios';

import NextHead from '../nextHead/NextHead';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999',
  }),
};

function TextEditorView(props: any): JSX.Element {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [selectedModeList, setSelectedModeList] = useState<any[]>([]);
  const [selectedMode, setSelectedMode] = useState<any>({ label: 'python', value: 'python' });

  const [selectedFontSizeList, setSelectedFontSizeList] = useState<any[]>([]);
  const [selectedFontSize, setSelectedFontSize] = useState<any>({ label: 20, value: 20 });

  const [mode, setMode] = useState('python');
  const [fontSize, setFontSize] = useState(20);
  const [value, setValue] = useState(`def my_function():
  print("Hello from a function")

my_function()`);

  const [runButtonLoading, setRunButtonLoading] = useState(false);
  const [runCodeOutput, setRunCodeOutput] = useState('');
  const [runCodeError, setRunCodeError] = useState('');

  useEffect(() => {
    getQuestionTitleAndQuestionDescription();
    getSelectedModeList();
    getSelectedFontSizeList();
    localStorage.setItem('source', value);
  }, []);

  const getQuestionTitleAndQuestionDescription = async () => {
    const mockInterviewQuestionId = localStorage.getItem('mockInterviewQuestionId');
    const token = localStorage.getItem('token');
    if (mockInterviewQuestionId && token) {
      const response = await axios.get(`${ROOT_URL}/mock-interview-question/${mockInterviewQuestionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        const responseData = response.data;
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          setQuestionTitle(responseData.result.question_title);
          setQuestionDescription(responseData.result.question_description);
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
      {
        label: 'ruby',
        value: 'ruby',
      },
      {
        label: 'golang',
        value: 'golang',
      },
      {
        label: 'csharp',
        value: 'csharp',
      },
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
  print("Hello from a function")
          
my_function()`);
      localStorage.setItem(
        'source',
        `def my_function():
  print("Hello from a function")
          
my_function()`,
      );
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
        localStorage.setItem(
          'source',
          `function test() {
  console.log(123);
}

test();`,
        );
        break;
      case 'java':
        setValue(`class Simple {
  public static void main(String args[]) {
    System.out.println("Hello Java");
  }
}`);
        localStorage.setItem(
          'source',
          `class Simple {
  public static void main(String args[]) {
    System.out.println("Hello Java");
  }
}`,
        );
        break;
      case 'python':
        setValue(`def my_function():
  print("Hello from a function")
      
my_function()`);
        localStorage.setItem(
          'source',
          `def my_function():
  print("Hello from a function")
      
my_function()`,
        );
        break;
      case 'ruby':
        setValue(`def test()
  puts "Hello from test"
end

test`);
        localStorage.setItem(
          'source',
          `def test()
  puts "Hello from test"
end

test`,
        );
        break;
      case 'golang':
        setValue(`package main

import "fmt"

func main() {
  fmt.Println("hello world")
}`);
        localStorage.setItem(
          'source',
          `package main

import "fmt"

func main() {
  fmt.Println("hello world")
}`,
        );
        break;
      case 'csharp':
        setValue(`class Hello {         
  static void Main(string[] args) {
    System.Console.WriteLine("Hello World!");
  }
}`);
        localStorage.setItem(
          'source',
          `class Hello {         
    static void Main(string[] args) {
      System.Console.WriteLine("Hello World!");
    }
  }`,
        );
        break;
      default:
        break;
    }
  };

  const handleBackToDashBoardButtonClick = () => {
    props.backToDashBoardClick();
  };

  const handleRunButtonClick = () => {
    runCode();
  };

  const runCode = async () => {
    setRunButtonLoading(true);
    setRunCodeOutput('');
    setRunCodeError('');

    const source = localStorage.getItem('source');
    const lang = getLang(mode);
    const token = localStorage.getItem('token');

    if (source && lang && token) {
      const response = await axios.post(
        `${ROOT_URL}/code/run`,
        {
          source: source,
          lang: lang,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response) {
        const responseData = response.data;
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 201) {
          const runCodeOutput = responseData.result.stdout;
          const runCodeError = responseData.result.stderr || responseData.result.compile_output;
          setRunButtonLoading(false);
          setRunCodeOutput(runCodeOutput);
          setRunCodeError(runCodeError);
        } else {
          setRunButtonLoading(false);
          setRunCodeOutput('');
          setRunCodeError(responseData.result.stderr || responseData.result.compile_output);
        }
      }
    }
  };

  const getLang = (mode: string) => {
    let lang = '';

    switch (mode) {
      case 'javascript':
        lang = 'JAVASCRIPT';
        break;
      case 'java':
        lang = 'JAVA';
        break;
      case 'python':
        lang = 'PYTHON';
        break;
      case 'ruby':
        lang = 'RUBY';
        break;
      case 'golang':
        lang = 'GO';
        break;
      case 'csharp':
        lang = 'C#';
        break;
      default:
        break;
    }

    return lang;
  };

  const renderRunButton = (runButtonLoading: boolean) => {
    let runButton = (
      <Button variant="contained" color="secondary" onClick={() => handleRunButtonClick()}>
        Run
      </Button>
    );

    if (runButtonLoading) {
      runButton = (
        <Button variant="contained" color="secondary" disabled={true} onClick={() => handleRunButtonClick()}>
          Loading...
        </Button>
      );
    }

    return runButton;
  };

  const renderRunCodeResult = (runCodeOutput: string, runCodeError: string) => {
    let runCodeResultDiv = null;

    if (runCodeOutput) {
      runCodeResultDiv = (
        <div className="card text-white bg-dark">
          <div className="card-header">RESULT</div>
          <div className="card-body">
            <div className="card-title">
              <div>OUTPUT:</div>
              <div className="my-3" style={{ whiteSpace: 'pre-line' }}>
                {runCodeOutput}
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (runCodeError) {
      runCodeResultDiv = (
        <div className="card text-white bg-dark">
          <div className="card-header">RESULT</div>
          <div className="card-body">
            <div className="card-title">
              <div style={{ color: 'red' }}>ERROR:</div>
              <div className="my-3" style={{ color: 'red', whiteSpace: 'pre-line' }}>
                {runCodeError}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return runCodeResultDiv;
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

          <div className="my-3 d-flex justify-content-end">
            <Button
              className="mr-3"
              variant="contained"
              color="primary"
              onClick={() => handleBackToDashBoardButtonClick()}
            >
              Back to dashboard
            </Button>
            {renderRunButton(runButtonLoading)}
          </div>

          {renderRunCodeResult(runCodeOutput, runCodeError)}
        </div>
      </div>
    </div>
  );
}

export default TextEditorView;
