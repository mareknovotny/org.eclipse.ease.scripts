/**
 * Copyright (c) 2016 Christian Pontesegger and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * name: Java Test
 */
package local.scripts;

import java.io.InputStream;
import java.io.PrintStream;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.swt.widgets.Display;

public class UIGreeter {
	private static PrintStream out;

	public static void main(String[] args) {
		out.println("Starting Java file execution");
		
		Display.getDefault().syncExec(new Runnable() {
			@Override
			public void run() {
				MessageDialog.openInformation(Display.getDefault().getActiveShell(), "Java Dialog",
						"Let us create some resources");
			}
		});

		IProject project = ResourcesPlugin.getWorkspace().getRoot().getProject("Java Project");
		try {
			project.create(new NullProgressMonitor());
			project.open(new NullProgressMonitor());
		} catch (CoreException e) {
			Display.getDefault().syncExec(new Runnable() {
				@Override
				public void run() {
					MessageDialog.openError(Display.getDefault().getActiveShell(), "Error", e.getMessage());
				}
			});
		}
	}
	
	public static void initialize(InputStream in, PrintStream out, PrintStream error) {
		UIGreeter.out = out;
		
	}
}
