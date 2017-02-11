
#!/bin/bash
set -x # Show the output of the following commands (useful for debugging)

echo "Setting up ssh!"


# Import the SSH deployment key


openssl aes-256-cbc -K $encrypted_5c93ddfc62aa_key -iv $encrypted_5c93ddfc62aa_iv -in .travis/travis_deploy.enc -out travis_deploy -d
rm travis_deploy.enc # Don't need it anymore
chmod 600 travis_deploy
mv travis_deploy ~/.ssh/id_rsa

