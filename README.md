# angular

#configure nvm:
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

#setup one npm version:
nvm use v10.13.0

#show installed versions:
nvm ls

#install one npm version:
nvm install v10.13

#create a new angular project:
ng new cmp-databinding-assignment

#install a component with npm cli:
npm install -g @angular/cli

#to generate a component:
ng g c server-element

#to install bootstrap localy on the project:
npm install --save bootstrap@3

#activate bootstrap on project
#add the following to "styles" on angular.json file
node_modules/bootstrap/dist/css/bootstrap.min.css

#to run:
ng serve
