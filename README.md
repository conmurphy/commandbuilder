# Extensible Spark Bot - Command Builder

Allows you to quickly and easily build, modify, and export a command tree that can be used with the Extensible Spark Bot

![alt tag](https://github.com/conmurphy/commandbuilder/blob/master/images/gui.png?raw=true)

Table of Contents
=================

   * [Extensible Spark Bot - Command Builder](#extensible-spark-bot---command-builder)
      * [Installation](#installation)
         * [Deployment Options](#deployment-options)
         * [Standard](#standard)
         * [Vagrant - VirtualBox](#vagrant---virtualbox)
         * [Vagrant - AWS](#vagrant---aws)
      * [Files](#files)

Created by [gh-md-toc](https://github.com/ekalinin/github-markdown-toc)

## Installation

### Deployment Options

* **Standard** - installing and running in a preconfigured environment
* **Vagrant VirtualBox** -  build a new guest environment within VirtualBox
* **Vagrant AWS** - build a new guest environment within AWS

### Standard

Use these commands if you already have an environment set up and just wish to install and run the Command Builder. For example you have a CentOS/Ubuntu VM or bare metal server.

#### Prerequisites
* Node
* NPM


1. Clone git repository
   
   `git clone git@github.com:conmurphy/commandbuilder.git`

2. Run commandbuilder.js

   `node commandbuilder.js`
3. Open browser and navigate to address. e.g. http://localhost:3000

**NOTE**: The server listens on port 3000 by default

### Vagrant - VirtualBox

You can use Vagrant to build your environment for you. Two files have been included, one for a local Virtualbox install and the second for an AWS install. 

#### Prerequisites
* Vagrant
* VirtualBox


1. Clone git repository
   
    `git clone git@github.com:conmurphy/commandbuilder.git`

2. Rename the VagrantFile_VB to Vagrantfile or make a copy named Vagrantfile
3. Bring up the environment
    
    `vagrant up`

4. Log into the host

    `vagrant ssh`

5. Change directory to `/opt/commandbuilder/commandbuilder`

    `cd /opt/commandbuilder/commandbuilder`

6. Run the Command Builder

    `node commandbuilder.js`
7. Open browser and navigate to VM address. e.g. http://localhost:3000

**NOTE**: NPM may not install the packages correctly. If the worker fails on first try, change directory to `/opt/commandbuilder/commandbuilder` and run `npm install`

**NOTE**: The server listens on port 3000 by default

### Vagrant - AWS

You can use Vagrant to build your environment for you. Two files have been included, one for a local Virtualbox install and the second for an AWS install.

#### Prerequisites
* Vagrant
* AWS account
* AWS access keys
* AWS Subnet ID
* AWS Security Group ID
* AWS Keypair - PEM file


1. Clone git repository
   
    `git clone git@github.com:conmurphy/commandbuilder.git`

2. Rename the VagrantFile_AWS to Vagrantfile or make a copy named Vagrantfile
3. If you haven't already, create a new AWS Key Pair and download the file (.pem) to the current working directory
4. Create a new VPC and subnet as well as a security group if you haven't already. The security group should have port 22 SSH enabled inbound (Vagrant) as well as port 3000 inbound (Command Builder)
5. Fill in the Vagrantfile with your credentials, keypair name and the name of the `.pem` keypair file that you just downloaded
6. Add the AWS subnet ID and AWS security group ID to the Vagrantfile.
7. Bring up the environment
    
    `vagrant up`

8. Log into the host

    `vagrant ssh`

9. Change directory to `/opt/commandbuilder/commandbuilder`

    `cd /opt/commandbuilder/commandbuilder`

10. Run the Command Builder

    `node commandbuilder.js`

11. Open browser and navigate to VM address. e.g. http://aws-vm-address.us-west-2.compute.amazonaws.com:3000

**NOTE**: NPM may not install the packages correctly. If the worker fails on first try, change directory to `/opt/commandbuilder/commandbuilder` and run `npm install`

**NOTE**: The server listens on port 3000 by default

## Files

| File | Description |
|----------|----------------|
| index.html | Main file containing HTML and Javascript functionality for Command Builder interface |
| commandbuilder.js | NodeJS Express server used to serve files |
| traverse.js | Functions used to validate and build tree on import |

