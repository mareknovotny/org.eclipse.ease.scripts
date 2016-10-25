/**
 * Copyright (c) 2016 Christian Pontesegger and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * name: Copy to PasteBin
 * popup: enableFor(org.eclipse.jface.text.ITextSelection)
 * image: http://pastebin.com/favicon.ico
 */

loadModule("/System/UI");

// get selected text
code = getSelection().getText();
language = "unknown";
title = "Code Snippet";

// try to detect editor type to set right coding 
if (getActiveView() instanceof org.eclipse.wst.jsdt.internal.ui.javaeditor.CompilationUnitEditor)
	language = "javascript";
else if (getActiveView() instanceof org.eclipse.jdt.internal.ui.javaeditor.CompilationUnitEditor)
	language = "java";

// try to get filename from active editor
editorInput = getActiveView().getEditorInput();
if (editorInput instanceof org.eclipse.ui.part.FileEditorInput)
	title = editorInput.getFile().getName();

// paste content
paste(title, code, language);

// visualize paste result
if ((response.startsWith("Bad")) || (response.startsWith("Post")))
	showErrorDialog("Could not publish to pastebin:\n\n" + response,
			"Pastebin error");
else
	showInputDialog("Successfully pasted to: ", response, "Pastebin URL");

/**
 * Paste a text on PasteBin.
 * 
 * @param title
 *            paste title
 * @param message
 *            paste content
 * @returns PasteBin response
 */
function paste(title, message, language) {
	params = encode("api_dev_key", "0d8fe3b5d541fda00bf87d8d66d7ac2d");
	params += "&" + encode("api_option", "paste");
	params += "&" + encode("api_paste_code", code);
	params += "&" + encode("api_paste_private", "0");
	params += "&" + encode("api_paste_name", title);
	params += "&" + encode("api_paste_format", language);
	params += "&" + encode("api_paste_expire_date", "1H");
	// params += "&" + encode("api_user_key", "");

	postData = new java.lang.String(params)
			.getBytes(java.nio.charset.StandardCharsets.UTF_8);

	url = new java.net.URL("http://pastebin.com/api/api_post.php");

	// @type java.net.HttpURLConnection
	connection = url.openConnection();
	connection.setDoOutput(true)
	connection.setInstanceFollowRedirects(false);
	connection.setRequestMethod("POST");
	connection.setRequestProperty("Content-Type",
			"application/x-www-form-urlencoded");
	connection.setRequestProperty("charset", "utf-8");
	connection.setRequestProperty("Content-Length", postData.length);
	connection.setUseCaches(false);

	connection.getOutputStream().write(postData);
	connection.getOutputStream().close();

	reader = new java.io.BufferedReader(new java.io.InputStreamReader(
			connection.getInputStream()));
	response = reader.readLine();
	connection.disconnect();

	return response;
}

/**
 * Utility function to encode text data for POST request
 * 
 * @param key
 *            parameter key
 * @param value
 *            parameter content
 * @returns encoded POST parameter
 */
function encode(key, value) {
	return java.net.URLEncoder.encode(key) + "="
			+ java.net.URLEncoder.encode(value);
}