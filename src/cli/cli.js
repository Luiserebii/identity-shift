#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');

const meta = require('../../meta');
const IdentityShift = require('../git-identity/git-identity');
const identityShift = new IdentityShift();
const Identity = require('../git-identity/identity')

class GitIdentityCLI {

  run() {

    this.setupCLI();
    this.main();

  }

  setupCLI() {

    program.version(meta.version, '-v, --version');
    if(meta.description) program.description(meta.description);

    program
      .option('-a, --about', 'about this tool')
      .option('-l, --list', 'list all registered identities')
      .option('-n, --new <name> *', 'add new identity')
      .option('-u, --update <name> *', 'update registered identity')
      .option('-d, --delete <name>', 'delete registered identity')
      .option('-s, --shift <name>', 'shift git identity to registered identity (global by default)')
      .option('-c, --current', 'current global git identity')
      .option('--global', 'global (option for -s and -c)')
      .option('--local', 'local (option for -s and -c)')

      .option('--user <username>', 'specify username')
      .option('--email <email>', 'specify email')
      .option('--gpg-key <gpg-key>', 'specify GPG key (key-id format: LONG)')
 
      .on('--help', () => {
        console.log('');
        console.log('* uses additional flags below: ');
        console.log('--user, --email, --gpg-key');
      })
  }

  main() {

    program.parse(process.argv);
    if(this.argNum() === 0) {
      this.aboutCLI();
      program.help();
    }

    //If the about flag has been passed, and only that flag, show the about
    if(program.about && this.argNum() === 1) { 

      this.aboutCLI();

    } else if(program.list && this.argNum() === 1) {

      let ids = identityShift.listIdentities(); 
      ids ? console.log("All registered identities: \n\n" + identityShift.listIdentities()) : console.log("No identities found!");

    } else if(program.new && this.argNum() >= 6) {
      identityShift.newIdentity(new Identity(program.new, program.user, program.email, program.gpgKey));

    } else if(program.update && this.argNum() >= 6) {
      identityShift.updateIdentity(new Identity(program.update, program.user, program.email, program.gpgKey));

    } else if(program.delete && this.argNum() === 2) {
      identityShift.deleteIdentity(program.delete);

    } else if(program.shift && (this.argNum() === 2 || this.argNum() === 3)) {

      let name = program.shift;
      if(!program.local) {
        let success = identityShift.shiftIdentity(name);
        if(success) console.log("Shifted global git identity to: " + name);
      } else {
        let success = identityShift.shiftIdentityLocal(name);
        if(success) console.log("Shifted local git identity to: " + name);
      }

    } else if(program.current && (this.argNum() === 1 || this.argNum() === 2)) {

      if(!program.local) {
        let identity = identityShift.getIdentityGlobal();
        console.log("Current global git identity:\n");
        console.log(identity.toString());
      } else {
        let identity = identityShift.getIdentityLocal();
        console.log("Current local Git identity:\n");
        console.log(identity.toString());

      }

    } else {
      console.log("Invalid combination of flags and/or arguments");
    }
  

  }

  aboutCLI() {

    //Title of tool
    console.log(chalk.green(figlet.textSync('Git Identity Shift', { font: 'Ghost' })))
    console.log("Version: " + meta.version);
    console.log("Author: Luiserebii");
    console.log("Check me out on GitHub at: https://github.com/Luiserebii!")

  }

  argNum() {
    return process.argv.slice(2).length;
  }

}

module.exports = GitIdentityCLI;
