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

// Determine the operating system and initialize a suitable "path" object:
let os = require("os");
let platform = os.platform();

let path;
if (platform !== "win32") {
  path = require("path").posix;
} else {
  path = require("path").win32;
}

// Settings objects:
let basicTest = {};
let environmentTest = {};

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

  executableHarness.startExecutable(environmentTest);
};

executableHarness.startExecutable(basicTest);

// Environment test:
environmentTest.executable = "node";

environmentTest.executableArguments = [];
environmentTest.executableArguments.push(
  path.join(__dirname, "environment-test.js"));

environmentTest.options = {};
environmentTest.options.env = {};
environmentTest.options.env.TEST = "test";

environmentTest.stdoutFunction = function (stdout) {
  if (stdout === "test\n") {
    console.log("executable-harness environment test is OK");
    console.log(" ");
  }
};

environmentTest.exitFunction = function (exitCode) {
  console.log(`executable-harness environment test exit code is ${exitCode}`);
  console.log(" ");
};
