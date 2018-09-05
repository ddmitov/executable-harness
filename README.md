executable-harness
--------------------------------------------------------------------------------
<!-- [![Travis CI Build Status](https://travis-ci.org/ddmitov/executable-harness.svg?branch=master)](https://travis-ci.org/ddmitov/executable-harness)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/ddmitov/executable-harness?branch=master&svg=true)](https://ci.appveyor.com/project/ddmitov/executable-harness)
[![Inline docs](http://inch-ci.org/github/ddmitov/executable-harness.svg?branch=master)](http://inch-ci.org/github/ddmitov/executable-harness)  
[![Coverity Scan Build Status](https://scan.coverity.com/projects//badge.svg)](https://scan.coverity.com/projects/ddmitov-executable-harness)
[![Snyk Status](https://snyk.io/test/github/ddmitov/executable-harness/badge.svg)](https://snyk.io/test/github/ddmitov/executable-harness)  

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/)](https://www.codacy.com/app/ddmitov/executable-harness?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ddmitov/executable-harness&amp;utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges//maintainability)](https://codeclimate.com/github/ddmitov/executable-harness/maintainability) -->

[Node.js](http://nodejs.org/) - [Electron](http://electron.atom.io/) - [NW.js](http://nwjs.io/) asynchronous controller for binary executables or scripts

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

## Core Dependency
``child_process``

## API
All settings of an executable executed by executable-harness are stored in a JavaScript object with an arbitrary name and the following object properties:  

* **executable**  
  ``String`` for a filename of a binary executable or script:
  either filename on PATH or full pathname
  *This object property is mandatory.*  

  ```javascript
  test.executable = "/full/path/to/executable";
  ```

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
  ``Array`` for executable arguments  

  ```javascript
  test.executableArguments = [];
  test.executableArguments.push("argument-one");
  test.executableArguments.push("argument-two");
  ```

* **options**  
  ``Object`` for executable options passed to the ``child_process`` core module.  
  Click [here](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) for a full list of all available ``child_process`` options.

* **options.cwd**  
  ``String`` for a new executable current working directory  

  ```javascript
  test.options = {};
  test.options.cwd = "/full/path/to/current-working-directory";;
  ```

* **options.env**  
  ``Object`` for a new executable environment  

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

  ``inputData`` function example with no dependencies:  

  ```javascript
  test.inputData = function () {
    let data = document.getElementById("data-input").value;
    return data;
  }
  ```

## Interactive Executables or Scripts
executable-harness can also start and communicate with interactive executables or scripts having their own event loops and capable of repeatedly receiving STDIN input. Use the following code to send data to an interactive executable waiting for input on STDIN:

```javascript
let data = document.getElementById("data-input").value;
test.executableHandler.stdin.write(data);
```

## [Credits](./CREDITS.md)

## [License](./LICENSE.md)
MIT 2018  
Dimitar D. Mitov  
