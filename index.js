/**
 * TODO: make a proper driver
 */

import TaskList from "./tasklist.js";
import Task, {STATUS} from "./task.js";

const tasks = TaskList.loadFromFile('./tasks.json');
tasks.addTask(new Task(1, 'Finish cleaning up TaskList', STATUS.TO_DO));
tasks.saveToFile('tasks.json');
tasks.listTasks().forEach(t => {
    console.log(`${t.id}. [${t.status}] ${t.desc} (Created: ${new Date(t.createdAt).toLocaleString()})`);
});