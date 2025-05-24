let pyodideReady = false;

async function loadPyodideAndRun() {
  window.pyodide = await loadPyodide();
  pyodideReady = true;
}

loadPyodideAndRun();

async function runPython() {
  if (!pyodideReady) {
    document.getElementById("output").innerText = "Loading Pyodide...";
    return;
  }

  const code = document.getElementById("code").value;

  try {
    // Redirect output using Python itself
    await pyodide.runPythonAsync(`
import sys
from io import StringIO

output = StringIO()
sys.stdout = output
sys.stderr = output
`);

    await pyodide.runPythonAsync(code);

    const result = await pyodide.runPythonAsync("output.getvalue()");
    document.getElementById("output").innerText = result;

  } catch (err) {
    document.getElementById("output").innerText = "Error:\n" + err;
  }
}
