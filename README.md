# NVM Gui

This is a NVM for Windows GUI application built with Electron and Angular. It is a simple application that allows you to manage your Node.js versions on Windows using the NVM for Windows tool.

![NVM Gui](https://raw.githubusercontent.com/threydor/staticassets/main/images/nvm-gui-0-0-1.png)

# Usage
## Installing
First, you need to install NVM for Windows. You can find the installation instructions [here](https://github.com/coreybutler/nvm-windows).
You can download the latest release of the NVM Gui from the [releases page](https://github.com/threydor/nvm-gui/releases).

## Running
To run the application, simply run the `nvm-gui Setup.exe` file. The application will start, and you will be able to manage your Node.js versions straight away :).



# Development
## Prerequisites

- NVM for Windows [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
- Node.js [https://nodejs.org/](https://nodejs.org/)
- npm [https://www.npmjs.com/](https://www.npmjs.com/)

## Getting Started

1. Clone the repository: `git clone https://github.com/yourusername/nvm-gui.git`
2. Navigate to the project directory: `cd nvm-gui`
3. Install dependencies: `npm install`
4. Start the application in development mode: `npm watch:dev`
5. Start the application using the Electron app: `npm run electron`
   * this requires running the command as an administrator on Windows

## Building the Application

To build a local package run `npm run pack`. The built files will be located in the `dist` directory.
To build the application for distribution, run `npm run dist`. The built files will be located in the `dist` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NVM for Windows [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
- Electron [https://www.electronjs.org/](https://www.electronjs.org/)
- Angular [https://angular.io/](https://angular.io/)
- And all other libraries and tools used in this project.
