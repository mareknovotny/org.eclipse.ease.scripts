/*******************************************************************************
 * Copyright (C) 2016, Max Hohenegger <eclipse@hohenegger.eu>
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/

// name			: Delete Branch
// popup		: enableFor(org.eclipse.egit.ui.internal.repository.tree.RepositoryNode)
// description	: Do something with a repository
loadModule("/System/Platform")
loadModule('/System/UI')

loadModule("/System/Git UI")

deleteBranch(getRepository(getSelection()));
