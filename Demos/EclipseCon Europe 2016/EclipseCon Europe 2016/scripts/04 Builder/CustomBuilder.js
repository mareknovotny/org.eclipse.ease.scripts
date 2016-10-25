/**
 * Copyright (c) 2016 Christian Pontesegger and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * name: Custom JS Builder
 * onSave: *.js
 */
loadModule('/System/Resources');

markerMessage = "File should start with a file comment";

// remove old markers
file = getFile(argv[0]);
file.deleteMarkers("org.eclipse.core.resources.problemmarker", false, 0);

firstLine = readLine(file).trim();
if (!firstLine.startsWith("//") && !firstLine.startsWith("/*"))
	// file should start with a comment
	createProblemMarker("warning", argv[0], 1, "File should start with a file comment");
