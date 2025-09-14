import TaskList from "./tasklist.js";
import Task from "./task.js";
import inquirer from "inquirer";


const tl = TaskList.loadFromFile("tasks.json");
async function main() {

    let id = tl.listTasks().length > 0
        ? Math.max(...tl.listTasks().map(t => t.id)) + 1 : 1; // Get unique ids every time
    let quit = false
    while (!quit) {
        const cli= await inquirer.prompt([
            {
                type: 'list',
                name: 'command',
                message: 'Select a command',
                choices: ['Add', 'Update', 'Delete', 'List', 'Quit']
            }]);

        switch (cli.command) {
            case 'Add':
                const add = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'desc',
                        message: 'Enter a new task'
                    },
                    {
                        type: 'confirm',
                        name: 'confirmAdd',
                        message: 'Add this task?',
                        default: true
                    }
                ]);

                if (add.confirmAdd) {
                    console.log('Adding task:', add.desc);
                    tl.addTask(new Task(id, add.desc));
                    tl.saveToFile("tasks.json");
                } else {
                    console.log('Canceled');
                }
                id++;
                break;
            case 'Update':
                if (tl.listTasks().length === 0) {
                    console.log("No tasks available to update.");
                    break;
                }
                const update = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: 'Select a task to update',
                        choices: tl.listTasks().map(t => t.id)
                    },
                    {
                        type: 'input',
                        name: 'desc',
                        message: 'Enter a new desc (or leave blank)',
                    },
                    {
                        type: 'list',
                        name: 'status',
                        message: 'Select a new status',
                        choices: ["To do", "In progress", "Complete", "Don't change"],
                        default: "Don't Change"
                    },
                    {
                        type: "confirm",
                        name: 'confirmUpdate',
                        message: "Confirm Update?",
                        default: true
                    }
                    ]);
                if(update.confirmUpdate) {
                    console.log(`Updating task: ${update.id} with description ${update.desc} and status ${update.status}`);
                    const tid = parseInt(update.id, 10);
                    const newStatus = update.status === "Don't change" ? null : update.status;
                    const newDesc = update.desc.trim() === "" ? null : update.desc;
                    tl.updateTask(tid, newDesc, newStatus);
                    tl.saveToFile("tasks.json");
                } else {
                    console.log(`Canceled`);
                }
                break;
            case 'Delete':
                if (tl.listTasks().length === 0) {
                    console.log("No tasks available to update.");
                    break;
                }
                const del = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: 'Select a task to delete',
                        choices: tl.listTasks().map(t => t.id)
                    },
                    {
                        type: "confirm",
                        name: 'confirmDelete',
                        message: "Confirm Delete?",
                        default: true
                    }
                ]);
                if(del.confirmDelete) {
                    console.log(`Deleting task with id: ${del.id}`);
                    tl.deleteTask(del.id);
                    tl.saveToFile("tasks.json");
                } else {
                    console.log(`Canceled`);
                }
                break;
            case 'List':
                if (tl.listTasks().length === 0) {
                    console.log("No tasks available to list.");
                    break;
                }
                const list = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'status',
                        message: 'list by...',
                        choices: ['All', 'To do', 'In Progress', 'Complete'],
                        default: 'All'
                    }
                ]);
                tl.listTasks(list.status).forEach(t => {
                    console.log(`${t.id}. [${t.status}] ${t.desc} (Created: ${new Date(t.createdAt).toLocaleString()}) (Updated: ${new Date(t.updatedAt).toLocaleString()})`);
                })
                break;
            case 'Quit':
                quit = true;
                break;
        }

    }
}
await main();
