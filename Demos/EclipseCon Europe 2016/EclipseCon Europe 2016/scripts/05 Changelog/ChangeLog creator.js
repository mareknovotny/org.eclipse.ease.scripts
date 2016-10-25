/**
 * Copyright (c) 2016 Christian Pontesegger and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * name: Create workspace change log
 * onResourceChange: *.js
 */

loadModule('/System/Resources');

timestamp = new java.text.SimpleDateFormat("yyyy-MM-dd', 'HH:mm").format(java.lang.System.currentTimeMillis());

file = getChangeLog(argv[0]);
file = writeLine(file, timestamp + ": " + argv[0] + " " + argv[1], APPEND);
closeFile(file);

function getChangeLog(changedFile) {
	file = getFile(changedFile, false);
	project = file.getProject();

	return getFile("workspace://" + project.getName() + "/changeLog.txt", false);
}

