# FRC Scouting App for Team 3464 "Sim-City"
## _Mass data collection_

[![N|Solid](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpCOfbpv0-ShoWwaPwG9dHOmSqrFWk7k0Gew&s)](https://firebase.google.com)

[![N|Solid](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh8JZks1aFfBKkmV13P9BvqCtC-DhY1u5_Nw&s)](https://react.dev)

[![Deploy to Vercel](https://binbashbanana.github.io/deploy-buttons/buttons/remade/vercel.svg)](https://vercel.com)

Built for the First Robotics Competition REBUILT 2026

> [!CAUTION]
>You must create your own firebase database if you are not part of Sim-City

## Features

- Questionnaire detailing all the data about another team
- Offline storage, for the terrible connection found at competitions
- Linked to usernames (less false data)
- Google Auth for creating users

## Installation
 Clone the repository and install dependencies. Node must be first installed

```
git clone https://github.com/FRC-Team-3464/sim-scouting
cd sim-scouting
npm install
```

To build app:
```
npm build
```


## Components

>AutoResizeTextArea
- label: String that appears above the text area, labeling it.
- value: Value that the input is changing.
- onChange: Function that runs when the value is changed.
- placeholder: String that is shown when it is blank.


>BinaryChoice
- label: String that appears above the text area, labeling it.
- options: An array of strings that function as toggleable buttons.
- value: Value that the buttons are changing, the first button is selected if the value is __*true*__, and the second button is selected if it is __*false*__.
- onChange: Function that runs when the value is changed.


>CheckboxDropdown
- label: String that appears above the text area, labeling it.
- optionList: Array that contains all of the options as strings.
- optionCheck: __*Record<string, boolean>*__ that has the same key names as optionList, but also has boolean values attached to the keys.
- onChange: Function that runs when the value is changed.

>CounterInput
- value: Value that the input is changing.
- onChange: Function that runs when the value is changed.
- min: Minimum integer that the value can be.
- max: Maximum integer that the value can be.
- label: String that appears above the text area, labeling it.

>Dropdown
- value: Value that the input is changing.
- options: An array of strings that function as options inside of the dropdown.
- label: String that appears above the text area, labeling it.
- onChange: Function that runs when the value is changed.
- placeholder: String that is shown when it is blank.

>IntegerInput
- value: Value that the input is changing.
- onChange: Function that runs when the value is changed.
- placeholder: String that is shown when it is blank.
- min: Minimum integer that the value can be.
- max: Maximum integer that the value can be.
- label: String that appears above the text area, labeling it.

>MultiCounterInput
- value: Value that the input is changing.
- onChange: Function that runs when the value is changed.
- min: Minimum integer that the value can be.
- max: Maximum integer that the value can be.
- label: String that appears above the text area, labeling it.

## Scripts

>seed.tsx
- Function that returns fake match data as a __*JSON*__.

>user.tsx
- Has functions that relate to reading and generating the users cookie.

>debug.tsx
- Has a function that can detect if the username of the user is on __*VITE_DEBUG*__ in the .env file.

## Other

>.env
- File that has values that are kept hidden from the public.
- Used to hold api keys and secret values.
- Each variable name must be capitalized, underscores instead of spaces, and start with __VITE___

>.gitignore
- Makes git ignore files, and not show them on the repository.
- Can contain specific paths, file names, or directory names.
- Can also have comments using "#", and negation using "!"