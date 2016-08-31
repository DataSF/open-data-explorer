#!/bin/bash

set -x

if [ $TRAVIS_BRANCH == "master" ] ; then
  npm run build
else
  echo "not on master branch"
fi
