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


## Components and scripts

>AutoResizeTextArea
- label: string that appears above the text area.
- value: Value that the input is changing.
- onChange: Method that changes the value.
- placeholder: Placeholder value that shows when text area is left blank.


>BinaryChoice
- label: string that appears above the text area.
- options: Array of strings that shows up as toggleable buttons.
- button1Selected: Boolean, that is the value from a hook call that changes, if true, the first option is highlighted.
- onChange: Method that changes the value.


>CheckboxDropdown
- label: The placeholder text that shows on the collapsed dropdown.
- optionList: An array that has every robot error.
- optionCheck: Record<string, boolean> dictionary, that has the same keys as optionList, but has booleans as values.
- onChange: The other part of the hook call.

>CounterInput
- value: Int, first part of a hook call.
- onChange: Second part of a hook call.
- min: Minimum value that the value can be
- max: Maximum value that the value can be
- label: 

>Dropdown
- value:
- option:
- label:
- onChange:
- placeholder:

>IntegerInput
- value:
- onChange:
- placeholder:
- min:
- max:
- label:

>MultiCounterInput
- value:
- onChange:
- min:
- max:
- label:
