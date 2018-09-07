executable-harness
--------------------------------------------------------------------------------
[![Travis CI Build Status](https://travis-ci.org/ddmitov/executable-harness.svg?branch=master)](https://travis-ci.org/ddmitov/executable-harness)
[![Build status](https://ci.appveyor.com/api/projects/status/2g0mp1ubldehaab3?svg=true)](https://ci.appveyor.com/project/ddmitov/executable-harness)
[![Inline docs](http://inch-ci.org/github/ddmitov/executable-harness.svg?branch=master)](http://inch-ci.org/github/ddmitov/executable-harness)  
[![Coverity Scan Build Status](https://scan.coverity.com/projects/16693/badge.svg)](https://scan.coverity.com/projects/ddmitov-executable-harness)
[![Known Vulnerabilities](https://snyk.io/test/github/ddmitov/executable-harness/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ddmitov/executable-harness?targetFile=package.json)  
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2a42ef32427f4d18837d6a3251d9d14e)](https://www.codacy.com/app/ddmitov/executable-harness?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ddmitov/executable-harness&amp;utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/8022196887baf15d2ef9/maintainability)](https://codeclimate.com/github/ddmitov/executable-harness/maintainability)  

[Node.js](http://nodejs.org/) - [Electron](http://electron.atom.io/) - [NW.js](http://nwjs.io/) asynchronous controller for binary executables or scripts  

executable-harness is a successor of the [camel-harness](https://www.npmjs.com/package/camel-harness) NPM package by the same author.

## Quick Start
``npm install executable-harness``  

```javascript
const executableHarness = require("executable-harness");

let test = {};
test.executable = "/test/executable";

test.stdoutFunction = function (stdout) {
  console.log(stdout);
};

executableHarness.startExecutable(test);
```

## Single Dependency
``child_process``

## API
All settings of an executable or script executed by executable-harness are stored in a JavaScript object with an arbitrary name and the following object properties:  

* **executable**  
  ``String`` for the filename of a binary executable or script:
  either filename on PATH or full pathname  
  *This object property is mandatory.*  

  ```javascript
  test.executable = "/full/path/to/executable";
  ```

  or

  ```javascript
  test.executable = "executable-on-path";
  ```

  There are two possible configurations when a script has to be started:  

  1. The ``executable`` object property points to the appropriate script interpreter and the ``executableArguments`` object property holds the script full pathname. In this case, the script is executed by the selected script interpreter regardless of the operating system.  

  2. The ``executable`` object property holds the script full pathname and the script is executed by the default interpreter of the operating system, if any.

* **stdoutFunction**  
  will be executed every time data is available on STDOUT  
  The only parameter passed to the ``stdoutFunction`` is the STDOUT ``String``.  

  ```javascript
  test.stdoutFunction = function (stdout) {
    document.getElementById("DOM-element-id").textContent = stdout;
  };
  ```

* **stderrFunction**  
  will be executed every time data is available on STDERR  
  The only parameter passed to the ``stderrFunction`` is the STDERR ``String``.  

  ```javascript
  test.stderrFunction = function (stderr) {
    console.log("STDERR:\n");
    console.log(stderr);
  };
  ```

* **errorFunction**  
  will be executed on executable error  
  The only parameter passed to the ``errorFunction`` is the error ``Object``.  

  The ``errorFunction`` can generate a message when executable is not found:  

  ```javascript
  test.errorFunction = function (error) {
    if (error.code === "ENOENT") {
      console.log("Executable was not found.");
    }
  };
  ```

* **exitFunction**  
  will be executed when executable has ended  
  The only parameter passed to the ``exitFunction`` is the exit code ``String``.  

  The ``exitFunction`` can generate a message when executable is not found:  

  ```javascript
  test.exitFunction = function (exitCode) {
    if (exitCode === 2) {
      console.log("Executable was not found.");
    }
  };
  ```

* **executableArguments**  
  ``Array`` for command-line arguments  

  ```javascript
  test.executableArguments = [];
  test.executableArguments.push("argument-one");
  test.executableArguments.push("argument-two");
  ```

* **options**  
  ``Object`` for executable options passed to the ``child_process`` core module.  
  Click [here](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) for a full list of all available ``child_process`` options.

* **options.cwd**  
  ``String`` for a new current working directory of the selected executable  

  ```javascript
  test.options = {};
  test.options.cwd = "/full/path/to/current-working-directory";;
  ```

* **options.env**  
  ``Object`` for a new environment of the selected executable  

  Executable environment with an inherited PATH and a new variable:  

  ```javascript
  test.options = {};
  test.options.env = {};
  test.options.env.PATH = process.env.PATH;
  test.options.env.TEST = "test";
  ```

* **options.detached**  
  ``Boolean`` option for starting detached processes like servers  

  ``options.detached`` must be set to ``true`` and  
  ``options.stdio`` must be set to ``"ignore"`` to  
  start a detached process without receiving anything from it.  
  A process detached with the above options can run even after its parent has ended.  

  Example settings for a server application:  

  ```javascript
  let server = {};
  server.executable = "/path/to/server-application";

  server.options = {};
  server.options.detached = true;
  server.options.stdio = "ignore";

  const executableHarness = require("executable-harness");
  executableHarness.startExecutable(server);

  server.executableHandler.unref();
  ```

* **inputData**  
  ``String`` or ``Function`` supplying user data as its return value.  
  ``inputData`` is written on executable STDIN.  

  ``inputData`` function with no dependencies:  

  ```javascript
  test.inputData = function () {
    let data = document.getElementById("data-input").value;
    return data;
  }
  ```

## Interactive Executables or Scripts
executable-harness can also start and communicate with interactive executables or scripts having their own event loops and capable of repeatedly receiving STDIN input. Use the following code to send data to an interactive executable or script waiting for input on STDIN:

```javascript
let data = document.getElementById("data-input").value;
test.executableHandler.stdin.write(data);
```

## [Credits](./CREDITS.md)

## [License](./LICENSE.md)
MIT 2018  
Dimitar D. Mitov  
