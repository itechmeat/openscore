# OpenScore

#### Scoreboard for swimming competitions
v0.1.1

### Technical stack
- Front-end: **Vue.js**
- Back-end: **Firebase**

### Demo of scoreboard and control panel on mobile device
![OpenBoard screencast](http://files.techmeat.net/match.gif)

[Live demo of control panel](https://openscore.app/swimming/control) (for mobile devices)

[Live demo of scoreboard](https://openscore.app/swimming/board) (for wide screen)

### Project setup
`npm install`

`npm install -g firebase-tools`


### Compiles and hot-reloads for development
`npm run serve`

### Compiles and minifies for production
`npm run build`

### Deploy to Firebase
`firebase deploy` or `npm run deploy` - deploy all project

`firebase deploy --only functions` or `npm run deploy-f` - deploy only functions

### Font for digits
[7segment](http://torinak.com/7segment)


### URLs (* - in plan)
| URL | Page |
|-----|------|
|`root`|Home Page|
|`root/{sport}`|Main page of sport with description and popular tournaments|
|`root/{sport}/create`|Create new tournament|
|`root/{sport}/tournaments`|List of sport's tournaments|
|`root/{sport}/tournaments/{id}`|Page of tournament|
|`root/{sport}/tournaments/{id}/edit`|Edit tournament|
|`root/{sport}/tournaments/{id}/create`|* Create new match|
|`root/{sport}/tournaments/{id}/matches`|* List of matches|
|`root/{sport}/tournaments/{id}/matches/{id}`|* Page of match|
|`root/{sport}/tournaments/{id}/matches/{id}/edit`|* Edit match|
|`root/{sport}/tournaments/{id}/matches/{id}/board`|* Live scoreboard of the match|
|`root/{sport}/tournaments/{id}/matches/{id}/console`|* Live console of the match|
|`root/{sport}/tournaments/{id}/matches/{id}/admin`|* Admin panel of the match|
|`root/teams`|* List of teams|
|`root/teams/create`|* Create new team|
|`root/teams/{id}`|* Page of team|
|`root/teams/{id}/edit`|* Edit team|
|`root/players`|* List of players|
|`root/players/create`|* Create new player|
|`root/players/{id}`|* Page of player|
|`root/players/{id}/edit`|* Edit player|
|`root/profile`|* User's profile|
|`root/profile/edit`|* Edit user's profile|
