# angular

#to run:
ng serve

#to generate a component:
ng g c server-element

#install npm cli:
npm install -g @angular/cli

#configure nvm:
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

#setup one npm version:
nvm use v10.13.0

#show installed versions:
nvm ls

#install one npm version:
nvm install v10.13
