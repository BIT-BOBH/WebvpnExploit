import childProcess from 'child_process';
import fs from 'fs';

const SourceDir = "./src/wasm/";

// if you have multiple source files, add them to here
const SourceFiles = [
  "example.cpp",
  "another.cpp"
];

const Compiler = "em++";

const CompileSettings = [
  "-Os", // zip the output js file
  "-sDISABLE_EXCEPTION_CATCHING=0", // allow exceptions to be caught
  "-sALLOW_MEMORY_GROWTH=1", // allow memory growth
  "-lembind", // link the embind library
];

let finalArgs = [];

if(!fs.existsSync("WasmTemp")){
  fs.mkdirSync("WasmTemp");
}

finalArgs = finalArgs.concat(CompileSettings);
finalArgs.push('-o', './WasmTemp/webassembly.js');
SourceFiles.forEach(srcFile=>{
  finalArgs.push(SourceDir + srcFile);
});

console.log(finalArgs);

let ret = childProcess.spawnSync(Compiler, finalArgs,{
  stdio: 'inherit'
});
if(ret.status == 0){
  console.log("Compile wasm files successfully!");
  // copy the wasm file
  fs.copyFileSync("./WasmTemp/webassembly.wasm", "./src/assets/webassembly.wasm");
  // modify the wasm js file
  let originJs = fs.readFileSync("./WasmTemp/webassembly.js");
  let extraCode = `
  import wasmURL from './assets/webassembly.wasm?url';
  wasmBinaryFile = wasmURL;
  export default Module;
  `;
  fs.writeFileSync("./src/webassembly.js", originJs + extraCode);
}else{
  console.log("Compile wasm files failed!");
  console.log(ret);
  throw new Error("Compile wasm files failed!");
}