/**
 * Copyright (c) 2016 Christian Pontesegger and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * onShutdown: 5000
 */
loadModule('/System/Scripting');

loadModule('/System/UI');
list = getSharedObject("RememberThis");
if (list != null) {
	text = ""
	for (index=0; index < list.size(); index++)
		text += "\n" + list.get(index);
	
	showInfoDialog("Please remember:\n" + text, "Remember This!");
}
