#!/bin/bash
#tests and builds project

function error_exit
{
  echo "$1" 1>&2
  exit 1
}


set -x
if [ $TRAVIS_BRANCH == "master" ] || [ $TRAVIS_BRANCH == "develop" ]; then
  if npm test; then
    if npm run build; then
      echo "******TESTS PASSED******"
      exit 0
    else
      error_exit "******BUILD FAILED! Aborting.*********"
    fi
  else
    error_exit "******TESTS FAILED! Aborting build.*********"
  fi
else
  if npm run test; then
    echo "*****TESTS PASSED****"
  else
    error_exit "******TESTS FAILED! Aborting build.*********"
  fi
fi
