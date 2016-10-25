/**
 * Copyright (c) 2016 Christian Pontesegger and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * name: Remember This
 * toolbar: Project Explorer
 * keyboard: Shift+F9
 */

loadModule('/System/UI');
topic = showInputDialog("What do you want me to remind you?", "", "Remember This!");

if (!topic.isEmpty()) {
	loadModule('/System/Scripting');
	list = getSharedObject("RememberThis");
	if (list == null) {
		list = new java.util.ArrayList();
		setSharedObject("RememberThis", list, true, true);
	}
	
	list.add(topic);
}
