const executableHarness = require("executable-harness");

let test = {};
test.executable = "node";

test.executableArguments = [];
test.executableArguments.push("-v");

test.stdoutFunction = function (stdout) {
  console.log(`Using Node ${stdout}`);
};

executableHarness.startExecutable(test);
