// const { exec } = require('child_process');
// const path = require('path');

// // Function to execute shell commands
// function executeCommand(command, callback) {
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.error(`Stderr: ${stderr}`);
//       return;
//     }
//     console.log(`Stdout: ${stdout}`);
//     if (callback) callback();
//   });
// }

// // Function to install Java
// function installJava(callback) {
//   console.log('Updating package list...');
//   const updateCommand = 'sudo apt update';

//   executeCommand(updateCommand, () => {
//     console.log('Installing Java...');
//     const javaInstallCommand = 'sudo apt install -y openjdk-11-jdk';

//     executeCommand(javaInstallCommand, () => {
//       console.log('Java installed successfully.');
//       callback();
//     });
//   });
// }

// // Function to run the server command
// function runServer() {
//   const serverCommand = 'java -Xmx1G -Xms1G -jar server.jar nogui';
//   console.log(`Running server command: ${serverCommand}`);

//   executeCommand(serverCommand, () => {
//     console.log('Server command executed successfully.');
//   });
// }

// // Main function to orchestrate the steps
// function main() {
//   installJava(runServer);
// }

// // Start the process
// main();


const { exec } = require('child_process');
const path = require('path');

// Function to execute shell commands
function executeCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
    if (callback) callback();
  });
}

// Function to install the latest Java
function installJava(callback) {
  console.log('Updating package list...');
  const updateCommand = 'sudo apt update';

  executeCommand(updateCommand, () => {
    console.log('Adding Java PPA...');
    const addPPACommand = 'sudo add-apt-repository -y ppa:linuxuprising/java';

    executeCommand(addPPACommand, () => {
      console.log('Updating package list again...');
      executeCommand(updateCommand, () => {
        console.log('Accepting Oracle license...');
        const acceptLicenseCommand = 'echo oracle-java18-installer shared/accepted-oracle-license-v1-2 select true | sudo /usr/bin/debconf-set-selections';

        executeCommand(acceptLicenseCommand, () => {
          console.log('Installing the latest Java...');
          const javaInstallCommand = 'sudo apt install -y oracle-java18-installer';

          executeCommand(javaInstallCommand, () => {
            console.log('Java installed successfully.');
            callback();
          });
        });
      });
    });
  });
}

// Function to run the server command
function runServer() {
  const serverCommand = 'java -Xmx1G -Xms1G -jar server.jar nogui';
  console.log(`Running server command: ${serverCommand}`);

  executeCommand(serverCommand, () => {
    console.log('Server command executed successfully.');
  });
}

// Main function to orchestrate the steps
function main() {
  installJava(runServer);
}

// Start the process
main();
