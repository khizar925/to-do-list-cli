import fs from "fs";
import { Command } from "commander";
import chalk from "chalk"; // Import chalk

const program = new Command();

const todoIdFetch = () => {
  const todoId = fs.readFileSync("todoID.txt", "utf8");
  return parseInt(todoId);
};

const updateTodoId = (newId) => {
  fs.writeFile("todoID.txt", newId.toString(), "utf-8", (writeErr) => {
    if (writeErr) {
      console.log(chalk.red("Error updating todoID.txt:"), writeErr);
    }
  });
};

let todoId = todoIdFetch();

program.name("to-do-list").description("CLI for to-do list").version("0.8.0");

program
  .command("add")
  .description("Add the new To-do.")
  .argument("<todoText>", "todo to add.")
  .action((todoText) => {
    todoId++;
    const object = {
      id: todoId,
      text: todoText,
    };

    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) {
        console.log(chalk.red(err));
        return;
      }

      let todos = [];
      if (data) {
        try {
          todos = JSON.parse(data);
        } catch (parseErr) {
          console.log(chalk.red("Error parsing JSON:"), parseErr);
          return;
        }
      }

      todos.push(object);

      fs.writeFile(
        "todos.json",
        JSON.stringify(todos, null, 2),
        "utf-8",
        (writeErr) => {
          if (writeErr) {
            console.log(chalk.red(writeErr));
          } else {
            console.log(chalk.green("To-do added successfully."));
          }
        }
      );
    });
    updateTodoId(todoId);
  });

program
  .command("display")
  .description("Display all Todos.")
  .action(() => {
    let todos = [];
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) {
        console.log(chalk.red(err));
        return;
      }
      if (data) {
        try {
          todos = JSON.parse(data);
        } catch (parseErr) {
          console.log(chalk.red("Error parsing JSON:"), parseErr);
          return;
        }
        todos.forEach((todo) => {
          console.log(chalk.blue(`${todo.id}: ${todo.text}`));
        });
      }
    });
  });

program
  .command("delete")
  .description("Delete specific Todos.")
  .argument("<todoText>", "todo to delete.")
  .action((todoText) => {
    let todos = [];
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) {
        console.log(chalk.red(err));
        return;
      }
      if (data) {
        try {
          todos = JSON.parse(data);
        } catch (parseErr) {
          console.log(chalk.red("Error parsing JSON:"), parseErr);
          return;
        }
        const indexToDelete = todos.findIndex((todo) => todo.text === todoText);
        if (indexToDelete === -1) {
          console.log(chalk.yellow("Todo not found."));
          return;
        }
        todos.splice(indexToDelete, 1);
        // Update IDs of remaining to-dos
        todos.forEach((todo, index) => {
          todo.id = index + 1;
        });
        // Update todoID.txt with the new highest ID
        const newTodoId = todos.length ? todos[todos.length - 1].id : 0;
        updateTodoId(newTodoId);

        fs.writeFile(
          "todos.json",
          JSON.stringify(todos, null, 2),
          "utf-8",
          (writeErr) => {
            if (writeErr) {
              console.log(chalk.red("Error writing to todos.json:"), writeErr);
            } else {
              console.log(
                chalk.green(
                  `Todo with text "${todoText}" deleted successfully.`
                )
              );
            }
          }
        );
      }
    });
  });

program
  .command("update")
  .description("Update specific Todos.")
  .argument("<oldText>", "old todo text.")
  .argument("<newText>", "new todo text.")
  .action((oldText, newText) => {
    let todos = [];
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) {
        console.log(chalk.red(err));
        return;
      }
      if (data) {
        try {
          todos = JSON.parse(data);
        } catch (parseErr) {
          console.log(chalk.red("Error parsing JSON:"), parseErr);
          return;
        }
        const todoToUpdate = todos.find((todo) => todo.text === oldText);
        if (!todoToUpdate) {
          console.log(chalk.yellow("Todo not found."));
          return;
        }
        todoToUpdate.text = newText;
        fs.writeFile(
          "todos.json",
          JSON.stringify(todos, null, 2),
          "utf-8",
          (writeErr) => {
            if (writeErr) {
              console.log(chalk.red("Error writing to todos.json:"), writeErr);
            } else {
              console.log(
                chalk.green(
                  `Todo with text "${oldText}" updated to "${newText}".`
                )
              );
            }
          }
        );
      }
    });
  });

program.parse();
