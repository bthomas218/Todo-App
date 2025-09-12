/**
 * TODO: Implement Update
 * TODO: Implement Delete
 */

import TaskList from "./tasklist.js";
import Task, {STATUS} from "./task.js";
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
                choices: ['Add', 'Update', 'Delete', 'List', 'Quit'],
            }]);

        switch (cli.command) {
            case 'Add':
                const add = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'desc',
                        message: 'Enter a new task',
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
                } else {
                    console.log('Canceled');
                }
                id++;
                break;
            case 'Update':
                // handle update
                break;
            case 'Delete':
                // handle delete
                break;
            case 'List':
                const list = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'status',
                        message: 'list by...',
                        choices: ['All', 'To do', 'In Progress', 'Complete'],
                        default: true
                    }
                ]);
                tl.listTasks(list.status).forEach(t => {
                    console.log(`${t.id}. [${t.status}] ${t.desc} (Created: ${new Date(t.createdAt).toLocaleString()}) 
                    (Updated: ${new Date(t.updatedAt).toLocaleString()})`);
                })
                break;
            case 'Quit':
                quit = true;
                break;
        }

    }
}
await main();
tl.saveToFile("tasks.json");