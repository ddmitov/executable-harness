"use strict";

// executable-harness npm test

// executable-harness is licensed under the terms of the MIT license.
// Copyright (c) 2018 Dimitar D. Mitov

// THE SOFTWARE IS PROVIDED "AS IS",
// WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
// THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Load the executable-harness package:
const executableHarness = require("../src/executable-harness.js");

// Settings object:
let basicTest = {};

// Basic test:
basicTest.executable = "node";

basicTest.executableArguments = [];
basicTest.executableArguments.push("-v");

basicTest.stdoutFunction = function (stdout) {
  console.log(`Using Node ${stdout}`);
};

basicTest.stderrFunction = function (stderr) {
  console.log(`executable-harness basic test STDERR: ${stderr}`);
};

basicTest.exitFunction = function (exitCode) {
  console.log(`executable-harness basic test exit code is ${exitCode}`);
  console.log(" ");
};

executableHarness.startExecutable(basicTest);
