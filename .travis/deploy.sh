#!/bin/bash

# print outputs and exit on first failure/show output of commands
set -xe
echo $TRAVIS_BRANCH
if [ $TRAVIS_BRANCH == "master" ] ; then
    echo "*******pushing build to production website!********"
    # setup ssh agent, git config and remote
    eval `ssh-agent -s` #start shh agent
    ssh-add ~/.ssh/id_rsa
    cd build
    # Initialize a new git repo in _site, and push it to our server.
    git init
    git remote add deploy "deploy@datasfexplorer.tk:/var/www/open-data-explorer/"
    git config user.name "Travis CI"
    git config user.email "travis@datasfexplorer.tk"

 # commit compressed files and push it to remote
    git add .
    git commit -m "Deploy compressed files"
    git push --force deploy master
    echo "****SUCCESS: Production build was deployed ********"

elif [ $TRAVIS_BRANCH == "develop" ] ; then
    echo "******pushing build to staging website!*******"
    # setup ssh agent, git config and remote
    eval `ssh-agent -s` #start shh agent
    ssh-add ~/.ssh/id_rsa
    # Initialize a new git repo in _site, angd push it to our server.
    cd build
    git init
    git remote add deploy "deploy@datasfexplorer.tk:/var/www/staging-open-data-explorer/"
    git config user.name "Travis CI"
    git config user.email "travis@datasfexplorer.tk"
 # commit compressed files and push it to remote
    git add .
    git commit -m "Deploy compressed files"
    git branch
    git push --force deploy master
    echo "****SUCCESS: Staging build was deployed ********"
else
    echo "No deploy script for branch '$TRAVIS_BRANCH'"

fi
