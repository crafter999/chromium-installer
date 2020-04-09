[![Build Status](https://travis-ci.org/crafter999/chromium-installer.svg?branch=master)](https://travis-ci.org/crafter999/chromium-installer)
![node](https://img.shields.io/node/v/chromium-installer.svg) ![Maintenance](https://img.shields.io/maintenance/yes/2020.svg) ![NPM](https://img.shields.io/npm/l/chromium-installer.svg)

# About

I created this simple tool to secure install/update from **Google** servers the latest
Chromium snapshot version and it works fine both on Linux, Windows and Android (root) with only 2 
dependencies (7 including children). It start downloading the latest snapshot file 
from https://www.googleapis.com/ then will unzip the files inside `/opt/chromium/` (Linux) or 
`C:\Program Files\Chromium` (Windows) using a module called `yauzl`.
I'm open sourcing it after I have used it for around 2 years now without any problems. 
The code is extremely easy to read btw.

# How to use on PC

1. Install from NPM globally using: `npm install -g chromium-installer`
1. Set keys **once** either for Linux (**nonroot**) `./scripts/set-API-keys-Linux.sh` or Windows
`.\scripts\set-API-Keys-Windows.bat`
1. Download & install as **admin/root** using the following command `chromium-installer-updater`
1. Don't forget to make chrome executable on Linux.
### Linux (sandbox crash)
There is a bug where sandboxing may not work and make Chromium crash. 
Some linux distributions does not support unprivileged user namespaces and may need the following kernel tweak.  

```
sysctl -w kernel.unprivileged_userns_clone=1
```
***May Compromise System Security**

# How to use on Android (**root**) 
1. Download and install Termux.
1. Make sure you have installed the root and nodej.js packages, if not run
   (non root) `pkg install tsu && pkg install nodejs`
1. Install the package using `npm install -g chromium-installer` (non root) 
1. Now switch to root using `tsu` and run `chromium-installer-updater`
1. Install the apks using the following command:
    ```
    pm install -r /data/local/tmp/chromium-installer/chrome-android/apks/ContentShell.apk
    ```
TIP: Alternatively skip the steps 4 & 5 and run the script 
located at ./scripts/android.sh using the following command as root: 
```/data/data/com.termux/files/usr/lib/node_modules/chromium-installer/scripts/android.sh```

**WARNING! The following guide was tested on Android 9.**

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

Nodejs 11.9.0/12.15/0

Android 9

