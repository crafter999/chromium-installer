[![Build Status](https://travis-ci.org/crafter999/chromium-installer.svg?branch=master)](https://travis-ci.org/crafter999/chromium-installer)
![node](https://img.shields.io/node/v/chromium-installer.svg) ![Maintenance](https://img.shields.io/maintenance/yes/2024.svg) ![NPM](https://img.shields.io/npm/l/chromium-installer.svg)

# About

I developed this  tool to securely install or update the latest Chromium snapshot version directly from Google servers. This tool is compatible with Linux, macOS (Apple Silicon), Windows, and rooted Android devices, requiring only two main dependencies (seven, including sub-dependencies). Its primary function is to download the latest snapshot file from https://www.googleapis.com/ and then unzip the files into `/opt/chromium/` for Linux or `C:\Program Files\Chromium` for Windows using a module named `yauzl`. On macOS due to OS restrictions this tool only downloads .zip file to `~/Downloads` and the user have to manually install it.

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

![](https://user-images.githubusercontent.com/27963519/79260134-7452d080-7e96-11ea-967c-2b1cba19c182.gif)


**WARNING! The following guide was tested on Android 9.**

# Todo

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

macOS 14
