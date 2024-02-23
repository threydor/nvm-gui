export interface IElectronAPI extends DOMWindow {
  execNvmCmd: (
    cmd: string,
    onResult: (result: string, code: number) => unknown,
    onStdOutput?: (output: string) => unknown,
  ) => void;
  openExternalUrl: (url: string) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
