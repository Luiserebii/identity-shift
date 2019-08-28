# git-identity
![git-identity-logo](https://serebii.io/projects/img/git-identity-padded-rounded.png)

[![npm version](https://badge.fury.io/js/%40luiserebii%2Fgit-identity.svg)](https://badge.fury.io/js/%40luiserebii%2Fgit-identity)
![GitHub](https://img.shields.io/github/license/Luiserebii/git-identity?color=g)
[![Build Status](https://travis-ci.org/Luiserebii/git-identity.svg?branch=master)](https://travis-ci.org/Luiserebii/git-identity)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Luiserebii/git-identity.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Luiserebii/git-identity/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/Luiserebii/git-identity.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Luiserebii/git-identity/alerts/)

A command line tool allowing for easy shifting between git identities (username, email, and GPG).

<b>Version:</b> 0.5.0-alpha<br/>
<b>Author:</b> Luiserebii

## Usage
```
Usage: git-identity [options]

Options:
  -v, --version          output the version number
  -a, --about            about this tool
  -l, --list             list all registered identities
  -n, --new <name> *     add new identity
  -u, --update <name> *  update registered identity
  -d, --delete <name>    delete registered identity
  -s, --shift <name>     shift git identity to registered identity (global by default)
  -c, --current          current global git identity
  --global               global (option for -s and -c)
  --local                local (option for -s and -c)
  --user <username>      specify username
  --email <email>        specify email
  --gpg-key <gpg-key>    specify GPG key (key-id format: LONG)
  -h, --help             output usage information

* uses additional flags below: 
--user, --email, --gpg-key
```

## Installation
### Linux
To install, simply extract the tool into a preferred directory, compile, and create a soft link. For example, if you are looking to place the tool in your home directory:
```
unzip git-identity-0.5.0-alpha.zip -d ~/
cd ~/git-identity-0.5.0-alpha
npm install
npm run build
sudo chmod u+x ~/git-identity-0.5.0-alpha/git-identity
sudo ln -s ~/git-identity-0.5.0-alpha/git-identity /usr/local/bin/git-identity
```

Doing this should make it globally accessible via `git-identity`. 

## Mirror
A mirror of this repository is available at: <https://serebii.io:2501/Luiserebii/git-identity>

## Contact
Questions? Comments? Suggestions? <br/>
Open an issue, make a pull request!
<br/><br/>
Or, you can email me at: luis@serebii.io
