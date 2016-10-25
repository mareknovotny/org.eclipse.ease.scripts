/**
 * Copyright (c) 2016 Christian Pontesegger and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * name: Show open Mylyn tasks
 * onStartup: 3
 */
loadModule('/System/UI');

tasks = org.eclipse.mylyn.internal.tasks.ui.TasksUiPlugin.getTaskList().getAllTasks();

now = new java.util.Date();
message = "";

it = tasks.iterator();
while(it.hasNext()) {
	task = it.next();
	if (!task.isCompleted()) {
		dueDate = task.getDueDate();
		if (now.after(dueDate)) {
			message += "\n\t* " + task.getSummary();
		}
	}
}

if (message.length > 0) {
	showInfoDialog("Following tasks need to be completed:\n" + message, "Open tasks for today");
	openView("Task List");
}