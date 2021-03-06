/*******************************************************************************
 * Copyright (c) 2014 Christian Pontesegger and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Christian Pontesegger - initial API and implementation
 * 
 * name			: Add println() tasks 
 * toolbar		: Project Explorer
 * description	: Adds TODOs for all System.out.println lines it detects in java files
 ******************************************************************************/

loadModule('/System/Resources');

// find *.java files in workspace
for each (file in  findFiles("*.java")) {

	// for each file
	var lineNumber = 1;
	var fileHandle = openFile(file, READ);
	
	// read first line
	var line = readLine(fileHandle);
	while(line != null) {
		
		// search for print statement
		if (line.search(/System.out.print/) >= 0) {

			// create marker
			var marker = file.createMarker(org.eclipse.core.resources.IMarker.TASK);
			marker.setAttribute(org.eclipse.core.resources.IMarker.TRANSIENT, true);
			marker.setAttribute(org.eclipse.core.resources.IMarker.LINE_NUMBER, lineNumber);
			marker.setAttribute(org.eclipse.core.resources.IMarker.MESSAGE, "TODO " + line.trim());
			
		}
		
		// read next line
		var line = readLine(fileHandle);
		lineNumber++;
	}
} 