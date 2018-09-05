"use strict";

// executable-harness
// Node.js - Electron - NW.js
// asynchronous controller for binary executables or scripts
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

const executableProcess = require("child_process").spawn;

// Check the only mandatory executable setting - 'executable':
function checkSettings (settings) {
  if (!settings.executable) {
    throw Error("executable-harness: No 'executable' is defined!");
  }
}

// Set executable options, including environment:
function setOptions (settings) {
  // Set default options if 'options' are empty:
  if (typeof settings.options !== "object") {
    settings.options = {
      cwd: null,
      env: process.env
    };
  }

  if (typeof settings.options.env !== "object") {
    settings.options.env = process.env;
  }

  return settings.options;
}

// Write data on STDIN, if any:
function stdinWrite (settings) {
  if (settings.inputData) {
    settings.executableHandler.stdin.write(`${settings.inputData}\n`);
  }
}

// Handle executable STDOUT and STDERR:
// If 'options.stdio = "ignore"' is set,
// there are no executable STDOUT or STDERR.
function handleStdoutStderr(settings) {
  if (settings.options.stdio !== "ignore") {
    settings.executableHandler.stdout.on("data", function (stdout) {
      if (typeof settings.stdoutFunction === "function") {
        settings.stdoutFunction(stdout.toString("utf8"));
      }
    });

    if (typeof settings.stderrFunction === "function") {
      settings.executableHandler.stderr.on("data", function (stderr) {
        settings.stderrFunction(stderr.toString("utf8"));
      });
    }
  }
}

// Start executable - the main function of 'executable-harness':
// All executables are executed asynchronously.
module.exports.startExecutable = function (settings) {
  // Check mandatory settings:
  checkSettings(settings);

  // Run executable:
  settings.executableHandler =
    executableProcess((settings.executable),
                      settings.executableArguments,
                      setOptions(settings));

  // Write data on executable STDIN, if any:
  stdinWrite(settings);

  // Handle executable STDOUT and STDERR:
  handleStdoutStderr(settings);

  // Handle executable errors:
  if (typeof settings.errorFunction === "function") {
    settings.executableHandler.on("error", function (error) {
      settings.errorFunction(error);
    });
  }

  // Handle executable exit:
  settings.executableHandler.on("exit", function (exitCode) {
    if (typeof settings.exitFunction === "function") {
      settings.exitFunction(exitCode);
    }
  });
};
