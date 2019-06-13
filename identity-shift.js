/**
 *
 * IdentityShift class
 *
 */

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

class IdentityShift {

  constructor(file = path.resolve(__dirname, 'data', 'identities')){
    this.file = file;
  }


  getIdentities(file = this.file) {
    let identityStore = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {};
    return identityStore;
  }

  createIdentity(name, username, email, gpgKey = null) {
    let identityStore = { [name]: {'username': username, 'email': email} };
    if(gpgKey) identityStore[name].gpgKey = gpgKey;
    return identityStore;

  }

  listIdentities() {
    let identityStore = this.getIdentities();
    return identityStore && !this.objectIsEmpty(identityStore) ? this.identitiesToString(this.getIdentities()) : null;
  }

  newIdentity(name, username, email, gpgKey = null, file = this.file) {
    let identityStore;

    //If file exists, let's load it in before writing
    identityStore = this.getIdentities();
    //Add identity to store
    if(!identityStore[name]){

      identityStore = Object.assign(identityStore, this.createIdentity(name, username, email, gpgKey));
      //If we're using our default folder path, and the folder doesn't exist, make it!
      if(file === this.file && !fs.existsSync(path.resolve(file, '../'))) fs.mkdirSync(path.resolve(file, '../'));

      //Finally, write identityStore to file
      fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8')
    } else {
      console.log("Identity already exists!")
    }

  }

  updateIdentity(name, username, email, gpgKey = null, file = this.file) {
    let identityStore; 

    //If file exists, let's load it in before writing
    identityStore = this.getIdentities();

    //Update identity
    identityStore = Object.assign(identityStore, this.createIdentity(name, username, email, gpgKey));

    //Finally, write identityStore to file
    fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8')
  }

  deleteIdentity(name, file = this.file) {
    let identityStore = this.getIdentities();
    if(identityStore[name]) {
      delete identityStore[name]
      fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8')
      console.log("Deleted identity \"" + name + "\"")
    } else { 
      console.log("Identity not found!");
    }
  }

  //shift identity function implementation for application flag
  shiftIdentity(name, file = this.file) {
    let identityStore = this.getIdentities();
    //let identity = !this.objectIsEmpty(identities) ? identities.name : null;
    let identity = identityStore[name];
    if(identity) {
      this.setIdentityGlobal(identity.username, identity.email, identity.gpgKey); 
      return true;
    } else {
      console.log("Identity not found!");
      return false; 
    }
  }

  shiftIdentityLocal(name, file = this.file) {
    let identityStore = this.getIdentities();
    //let identity = !this.objectIsEmpty(identities) ? identities.name : null;
    let identity = identityStore[name];
    if(identity) {
      this.setIdentityLocal(identity.username, identity.email, identity.gpgKey);
      return true;
    } else {
      console.log("Identity not found!");
      return false;
    }
  }


  getIdentityGlobal() {
    let username = child_process.execSync('git config --global user.name', { encoding: 'utf8' }).trim();
    let email = child_process.execSync('git config --global user.email', { encoding: 'utf8' }).trim();
    let gpgKey = child_process.execSync('git config --global user.signingkey', { encoding: 'utf8' }).trim();
    return [username, email, gpgKey];
  }

  //Set identity globally, run git commands to do so
  setIdentityGlobal(username, email, gpgKey = null) {
    let cmd = `git config --global user.name ${username} && ` +
                `git config --global user.email ${email}`;
    if(gpgKey) cmd += ` && git config --global user.signingkey ${gpgKey}`;
    child_process.execSync(cmd);
  }

  //Set identity locally
  setIdentityLocal(username, email, gpgKey = null) {
    let cmd = `git config --local user.name ${username} && ` +
                `git config --local user.email ${email}`;
    if(gpgKey) cmd += ` && git config --local user.signingkey ${gpgKey}`;
    child_process.execSync(cmd);
  }

  objectIsEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  identitiesToString(identities) {
    let str;
    for(var i in identities){
      console.log(identities[i])
      str += this.identityToString(identities[i]) + "\n";
    }
    return str;
  }

  identityToString(identity){
    let str = identity.username + " | " + identity.email;
    if(identity.gpgKey) str += " | " + identity.gpgKey; 

    return str;
  }
  

}

module.exports = IdentityShift;
