# To-Do List CLI

A simple command-line interface (CLI) for managing a to-do list. This CLI allows you to add, display, update, and delete to-dos with a unique ID for each entry. It uses a JSON file to store the to-dos and a text file to keep track of the last used ID.

## Features

- **Add** new to-dos with a unique ID.
- **Display** all to-dos.
- **Update** an existing to-do.
- **Delete** specific to-dos by text.

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>

2. **Install Dependencies:**
    Make sure you have Node.js installed. Then, run the following command:
   ```bash
   npm install

3. **Create Necessary files:**
    Run following commands if you don't have todoID.txt or todos.json files:
   ```bash
   echo "[]" > todos.json
   echo "0" > todoID.txt

# Usage
1. **Adding a To-do**
    Add a new to-do item to your list. Each to-do will have a unique ID.

   ```bash
    node index.js add "Buy groceries"

2. **Displaying All To-dos**
    Display all to-dos stored in your list.

    ```bash
    node index.js display

3. **Updating a To-do**
    Update the text of an existing to-do.

    ```bash
    node index.js update "<oldTodoText>" "<newTodoText>"
    
For example:
    ```bash
    node index.js update "Buy groceries" "Buy vegetables"

4. **Deleting a To-do**
    Delete a specific to-do by its text.

    ```bash
    node index.js delete "Buy vegetables"

This will remove the to-do with the text "Buy vegetables" from your list, decrement the IDs of all following to-dos, and update the todoID.txt file accordingly.