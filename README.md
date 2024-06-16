# QuestFightGold

An API for managing a player character's Hit Points (HP) within our game. The API will enable clients to perform various operations related to HP, including dealing damage of different types, considering character resistances and immunities, healing, and adding temporary Hit Points.

## Description

#### API Operations
1. **Deal Damage**
    - Implement the ability for clients to deal damage of different types (e.g., bludgeoning, fire) to a player character.
    - Ensure that the API calculates damage while considering character resistances and immunities.

    > Suppose a player character is hit by an attack that deals Piercing damage, and the attacker rolls a 14 on the damage's Hit Die (with a Piercing damage type). `[Character Hit Points - damage: 25 - 14 = 11]`


2. **Heal**
    - Enable clients to heal a player character, increasing their HP.


3. **Add Temporary Hit Points**
    - Implement the functionality to add temporary Hit Points to a player character.
    - Ensure that temporary Hit Points follow the rules: they are not additive, always taking the higher value, and cannot be healed.

    > Imagine a player character named "Eldric" currently has 11 Hit Points (HP) and no temporary Hit Points. He finds a magical item that grants him an additional 10 HP during the next fight. When the attacker rolls a 19, Eldric will lose all 10 temporary Hit Points and 9 from his player HP.

## Getting Started

### Dependencies

* NodeJS
* Express
* SwaggerUI
* Mongoose
* Dotenv
* CORS

### Installing

#### Set Up Application
* Download repo and open the project 
* Navigate to root directory and install the dependencies:
    ```
    npm install
    ```
#### Configure Database
* Create a new [MongoDB Cluster](https://cloud.mongodb.com)
* Create a .env file to store the cluster username and password
    ```
    MONGODB_USERNAME=<username>
    MONGODB_PASSWORD=<password>
    ```
* Install MongoDB on Your Machine
    - Follow the installation guide for your operating system from the [MongoDB documentation](https://www.mongodb.com/docs/manual/installation/)

### Executing program

* Start application
```
npm start
```
* Navigate to http://localhost:3000 in a web browser
* Swagger docs are available at http://localhost:3000/api-docs
* Routes:
```
        /api/damage
        /api/heal
        /api/temp-hp
```

#### Sample /damage POST Request Body
```
      {
        "characterId": "briv",
        "damageType": "slashing",
        "damageAmount": 10
      }
```

#### Sample /heal POST Request Body
```
      {
        "characterId": "briv",
        "healAmount": 5
      }
```

#### Sample /temp-hp POST Request Body
```
    {
        "characterId": "briv",
        "tempHPAmount": 15
    }
```

## Help

Advise for common problems or issues.
```
npm run help
```

## Authors

Tyler Pritchard  


## Version History

* 0.1
    * Initial Release


## Acknowledgments

* [Trello board](https://trello.com/invite/b/QW1cz0oh/ATTI161b7305bb6178bc21e1b163ea1d3c26703A921B/questfightgold)



##### Questions for D&D:

* How should the resistance amount be determined in the damage function?  How should Possible Damage Types be incorporated as a data structure?