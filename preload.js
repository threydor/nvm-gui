const { contextBridge, shell } = require("electron");
const { spawn } = require("child_process");

function openExternalUrl(url) {
  shell.openExternal(url);
}

function execNvmCmd(cmd, onResult, onStdOutput) {
  const child = spawn(`nvm ${cmd}`, { shell: true });
  let result = "";
  if (onStdOutput) {
    onStdOutput("\n======= Executing command: " + cmd + "\n");
  }
  const pushStdOutput = (data) => {
    result += data;
    if (onStdOutput) {
      onStdOutput(data?.toString() || "");
    }
  };
  child.stdout.on("data", pushStdOutput);
  child.stderr.on("data", pushStdOutput);
  child.on("close", (code) => onResult(result, code));
}

contextBridge.exposeInMainWorld("electronAPI", {
  execNvmCmd: (cmd, onResult, onStdOutput) =>
    execNvmCmd(cmd, onResult, onStdOutput),
  openExternalUrl: (url) => openExternalUrl(url),
});
