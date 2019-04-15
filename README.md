[![Build Status](https://travis-ci.org/crafter999/chromium-installer.svg?branch=master)](https://travis-ci.org/crafter999/chromium-installer)
![node](https://img.shields.io/node/v/chromium-installer.svg) ![Maintenance](https://img.shields.io/maintenance/yes/2019.svg) ![NPM](https://img.shields.io/npm/l/chromium-installer.svg)

# About

I created this simple tool to secure install/update from **Google** servers the latest
Chromium snapshot version and it works fine both on Linux and Windows with only 2 
dependencies (7 including children). It start downloading the latest snapshot file 
from https://www.googleapis.com/ then will unzip the files inside `/opt/chromium/` (Linux) or 
`C:\Program Files\Chromium` (Windows) using a module called `yauzl`.
I'm open sourcing it after I have used it for around 2 years now without any problems. 
The code is extremely easy to read btw.

# How to use

1. Install from NPM globally using: `npm install -g chromium-installer`
1. Set keys **once** either for Linux (**nonroot**) `./scripts/set-API-keys-Linux.sh` or Windows
`.\scripts\set-API-Keys-Windows.bat`
1. Download & install as **admin/root** using the following command `chromium-installer-updater`
### Linux (sandbox crash)
There is a bug where sandboxing may not work and make Chromium crash. 
Some linux distributions does not support unprivileged user namespaces and may need the following kernel tweak.
```
sysctl -w kernel.unprivileged_userns_clone=1
```

# Todo

+ OSX Support
+ Make it default browser using a script
+ Better terminal UI
+ API version
+ Create desktop shortcuts
+ Reach 100% Code Coverage


# Tested
Linux Debian Stretch 9 (Gnome Shell 3.22.3)

Windows 10 (1709)

Nodejs 11.9.0
