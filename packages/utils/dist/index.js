"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  fetchHedy: () => fetchHedy_default,
  runPython: () => runPython_default
});
module.exports = __toCommonJS(src_exports);

// src/fetchHedy.ts
var fetchHedy = async (code, level, port, isOnline) => {
  const url = isOnline ? "https://www.hedycode.com/parse" : `http://localhost:${port}/parse`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      code,
      level
    })
  });
  return await response.json();
};
var fetchHedy_default = fetchHedy;

// src/runPython.ts
var runPython = async (props) => {
  const { sk, code, level, port, setOutput, setInput, setHasTurtle, onError, onComplete } = props;
  const hedyResponse = await fetchHedy_default(code, level, port, props.isOnline);
  if (hedyResponse.Error) {
    onError(hedyResponse.Error, hedyResponse.Location);
    return;
  }
  function builtinRead(x) {
    if (sk.builtinFiles === void 0 || sk.builtinFiles["files"][x] === void 0)
      throw "File not found: '" + x + "'";
    return sk.builtinFiles["files"][x];
  }
  sk.configure({
    output: (text) => setOutput(text),
    inputfun: setInput,
    read: builtinRead,
    setTimeout: (func, delay) => {
      props.onSleep(delay);
      return setTimeout(func, delay);
    },
    inputfunTakesPrompt: true,
    __future__: sk.python3
  });
  let pythonCode = normal_prefix + hedyResponse.Code;
  if (hedyResponse.has_turtle) {
    pythonCode = turtle_prefix + pythonCode;
    setHasTurtle(true);
  }
  try {
    await sk.misceval.asyncToPromise(
      () => sk.importMainWithBody("<stdin>", false, pythonCode, true, {
        "*": () => {
        }
      })
    );
    onComplete();
  } catch (error) {
    onError("Error", []);
  }
};
var runPython_default = runPython;
var normal_prefix = `# coding=utf8
import random, time
global int_saver
global convert_numerals # needed for recursion to work
int_saver = int
def int(s):
  if isinstance(s, str):
    numerals_dict = {'0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '\u{11066}': '0', '\u{11067}': '1', '\u{11068}': '2', '\u{11069}': '3', '\u{1106A}': '4', '\u{1106B}': '5', '\u{1106C}': '6', '\u{1106D}': '7', '\u{1106E}': '8', '\u{1106F}': '9', '\u0966': '0', '\u0967': '1', '\u0968': '2', '\u0969': '3', '\u096A': '4', '\u096B': '5', '\u096C': '6', '\u096D': '7', '\u096E': '8', '\u096F': '9', '\u0AE6': '0', '\u0AE7': '1', '\u0AE8': '2', '\u0AE9': '3', '\u0AEA': '4', '\u0AEB': '5', '\u0AEC': '6', '\u0AED': '7', '\u0AEE': '8', '\u0AEF': '9', '\u0A66': '0', '\u0A67': '1', '\u0A68': '2', '\u0A69': '3', '\u0A6A': '4', '\u0A6B': '5', '\u0A6C': '6', '\u0A6D': '7', '\u0A6E': '8', '\u0A6F': '9', '\u09E6': '0', '\u09E7': '1', '\u09E8': '2', '\u09E9': '3', '\u09EA': '4', '\u09EB': '5', '\u09EC': '6', '\u09ED': '7', '\u09EE': '8', '\u09EF': '9', '\u0CE6': '0', '\u0CE7': '1', '\u0CE8': '2', '\u0CE9': '3', '\u0CEA': '4', '\u0CEB': '5', '\u0CEC': '6', '\u0CED': '7', '\u0CEE': '8', '\u0CEF': '9', '\u0B66': '0', '\u0B67': '1', '\u0B68': '2', '\u0B69': '3', '\u0B6A': '4', '\u0B6B': '5', '\u0B6C': '6', '\u0B6D': '7', '\u0B6E': '8', '\u0B6F': '9', '\u0D66': '0', '\u0D67': '1', '\u0D68': '2', '\u0D69': '3', '\u0D6A': '4', '\u0D6B': '5', '\u0D6C': '6', '\u0D6D': '7', '\u0D6E': '8', '\u0D6F': '9', '\u0BE6': '0', '\u0BE7': '1', '\u0BE8': '2', '\u0BE9': '3', '\u0BEA': '4', '\u0BEB': '5', '\u0BEC': '6', '\u0BED': '7', '\u0BEE': '8', '\u0BEF': '9', '\u0C66': '0', '\u0C67': '1', '\u0C68': '2', '\u0C69': '3', '\u0C6A': '4', '\u0C6B': '5', '\u0C6C': '6', '\u0C6D': '7', '\u0C6E': '8', '\u0C6F': '9', '\u1040': '0', '\u1041': '1', '\u1042': '2', '\u1043': '3', '\u1044': '4', '\u1045': '5', '\u1046': '6', '\u1047': '7', '\u1048': '8', '\u1049': '9', '\u0F20': '0', '\u0F21': '1', '\u0F22': '2', '\u0F23': '3', '\u0F24': '4', '\u0F25': '5', '\u0F26': '6', '\u0F27': '7', '\u0F28': '8', '\u0F29': '9', '\u1810': '0', '\u1811': '1', '\u1812': '2', '\u1813': '3', '\u1814': '4', '\u1815': '5', '\u1816': '6', '\u1817': '7', '\u1818': '8', '\u1819': '9', '\u17E0': '0', '\u17E1': '1', '\u17E2': '2', '\u17E3': '3', '\u17E4': '4', '\u17E5': '5', '\u17E6': '6', '\u17E7': '7', '\u17E8': '8', '\u17E9': '9', '\u0E50': '0', '\u0E51': '1', '\u0E52': '2', '\u0E53': '3', '\u0E54': '4', '\u0E55': '5', '\u0E56': '6', '\u0E57': '7', '\u0E58': '8', '\u0E59': '9', '\u0ED0': '0', '\u0ED1': '1', '\u0ED2': '2', '\u0ED3': '3', '\u0ED4': '4', '\u0ED5': '5', '\u0ED6': '6', '\u0ED7': '7', '\u0ED8': '8', '\u0ED9': '9', '\uA9D0': '0', '\uA9D1': '1', '\uA9D2': '2', '\uA9D3': '3', '\uA9D4': '4', '\uA9D5': '5', '\uA9D6': '6', '\uA9D7': '7', '\uA9D8': '8', '\uA9D9': '9', '\u0660': '0', '\u0661': '1', '\u0662': '2', '\u0663': '3', '\u0664': '4', '\u0665': '5', '\u0666': '6', '\u0667': '7', '\u0668': '8', '\u0669': '9', '\u06F0': '0', '\u06F1': '1', '\u06F2': '2', '\u06F3': '3', '\u06F4': '4', '\u06F5': '5', '\u06F6': '6', '\u06F7': '7', '\u06F8': '8', '\u06F9': '9', '\u3007': '0', '\u4E00': '1', '\u4E8C': '2', '\u4E09': '3', '\u56DB': '4', '\u4E94': '5', '\u516D': '6', '\u4E03': '7', '\u516B': '8', '\u4E5D': '9', '\u96F6': '0'}
    latin_numerals = ''.join([numerals_dict.get(letter, letter) for letter in s])
    return int_saver(latin_numerals)
  return(int_saver(s))
def convert_numerals(alphabet, number):
  numerals_dict_return = {
    'Latin': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'Brahmi': ['\u{11066}', '\u{11067}', '\u{11068}', '\u{11069}', '\u{1106A}', '\u{1106B}', '\u{1106C}', '\u{1106D}', '\u{1106E}', '\u{1106F}'],
    'Devanagari': ['\u0966', '\u0967', '\u0968', '\u0969', '\u096A', '\u096B', '\u096C', '\u096D', '\u096E', '\u096F'],
    'Gujarati': ['\u0AE6', '\u0AE7', '\u0AE8', '\u0AE9', '\u0AEA', '\u0AEB', '\u0AEC', '\u0AED', '\u0AEE', '\u0AEF'],
    'Gurmukhi': ['\u0A66', '\u0A67', '\u0A68', '\u0A69', '\u0A6A', '\u0A6B', '\u0A6C', '\u0A6D', '\u0A6E', '\u0A6F'],
    'Bengali': ['\u09E6', '\u09E7', '\u09E8', '\u09E9', '\u09EA', '\u09EB', '\u09EC', '\u09ED', '\u09EE', '\u09EF'],
    'Kannada': ['\u0CE6', '\u0CE7', '\u0CE8', '\u0CE9', '\u0CEA', '\u0CEB', '\u0CEC', '\u0CED', '\u0CEE', '\u0CEF'],
    'Odia': ['\u0B66', '\u0B67', '\u0B68', '\u0B69', '\u0B6A', '\u0B6B', '\u0B6C', '\u0B6D', '\u0B6E', '\u0B6F'],
    'Malayalam': ['\u0D66', '\u0D67', '\u0D68', '\u0D69', '\u0D6A', '\u0D6B', '\u0D6C', '\u0D6D', '\u0D6E', '\u0D6F'],
    'Tamil': ['\u0BE6', '\u0BE7', '\u0BE8', '\u0BE9', '\u0BEA', '\u0BEB', '\u0BEC', '\u0BED', '\u0BEE', '\u0BEF'],
    'Telugu':['\u0C66', '\u0C67', '\u0C68', '\u0C69', '\u0C6A', '\u0C6B', '\u0C6C', '\u0C6D', '\u0C6E', '\u0C6F'],
    'Burmese':['\u1040', '\u1041', '\u1042', '\u1043', '\u1044', '\u1045', '\u1046', '\u1047', '\u1048', '\u1049'],
    'Tibetan':['\u0F20', '\u0F21', '\u0F22', '\u0F23', '\u0F24', '\u0F25', '\u0F26', '\u0F27', '\u0F28', '\u0F29'],
    'Mongolian':['\u1810', '\u1811', '\u1812', '\u1813', '\u1814', '\u1815', '\u1816', '\u1817', '\u1818', '\u1819'],
    'Khmer':['\u17E0', '\u17E1', '\u17E2', '\u17E3', '\u17E4', '\u17E5', '\u17E6', '\u17E7', '\u17E8', '\u17E9'],
    'Thai':['\u0E50', '\u0E51', '\u0E52', '\u0E53', '\u0E54', '\u0E55', '\u0E56', '\u0E57', '\u0E58', '\u0E59'],
    'Lao':['\u0ED0', '\u0ED1', '\u0ED2', '\u0ED3', '\u0ED4', '\u0ED5', '\u0ED6', '\u0ED7', '\u0ED8', '\u0ED9'],
    'Javanese':['\uA9D0', '\uA9D1', '\uA9D2', '\uA9D3', '\uA9D4', '\uA9D5', '\uA9D6', '\uA9D7', '\uA9D8', '\uA9D9'],
    'Arabic':['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'],
    'Persian':['\u06F0', '\u06F1', '\u06F2', '\u06F3', '\u06F4', '\u06F5', '\u06F6', '\u06F7', '\u06F8', '\u06F9'],
    'Urdu': ['\u06F0', '\u06F1', '\u06F2', '\u06F3', '\u06F4', '\u06F5', '\u06F6', '\u06F7', '\u06F8', '\u06F9']}
  numerals_list = numerals_dict_return[alphabet]
  number=str(number)
  number = str(number)
  if number.isnumeric():
    numerals_list = numerals_dict_return[alphabet]
    all_numerals_converted = [numerals_list[int(digit)] for digit in number]
    return ''.join(all_numerals_converted)
  else:
    return number
`;
var turtle_prefix = `# coding=utf8
import random, time, turtle
t = turtle.Turtle()
t.shape("turtle")
t.hideturtle()
t.penup()
t.left(90)
t.pendown()
t.speed(3)
t.showturtle()
`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetchHedy,
  runPython
});
