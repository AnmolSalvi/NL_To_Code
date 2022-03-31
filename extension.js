// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const axios = require('axios').default;

const https = require("https");






// this method is called when your extension is activated
// your extension is activated the very first time the command is executed




// TODO: fix security vulnerability 
// @ts-ignore
// @ts-ignore


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;




// NLToCode() translates natural language into code. 
async function NLToCode() {
 
  
  // @ts-ignore
  editor = vscode.window.activeTextEditor;
  // Get text selection.
  
  // @ts-ignore
  const text = editor.document.getText(editor.selection);

//   var text = "create a sql query to select users from customers"

  // @ts-ignore
  //text = "create a sql query to select users from customers"

  var authToken = await vscode.window.showInputBox({
    placeHolder: "Input Authorization Token",
    password: true,
  });

  while (authToken == undefined) {
    authToken = await vscode.window.showInputBox({
      placeHolder: "Input Authorization Token",
      password: true,
    });
  }
  // TODO: Validate authorization token.*/

  // Get response from Codex.
 
  
  const response = await axios.post(
    "https://api.openai.com/v1/engines/text-davinci-002/completions",
    {
      prompt: text,
      temperature: 0.1,
      max_tokens: text.length * 5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    {
      headers: {
        authorization: "Bearer " + authToken,
      },
    }
  );
  // TODO: Validate response.
  return "\n" + response.data.choices[0].text + "\n"
}

// @ts-ignore
  function activate(context) {
	// Register NLToCode.
	// @ts-ignore
	let disposable1 = vscode.commands.registerCommand(
	  "extension.nLToCode",
	   function () {
		// Pass in NlToCode() as 'replacement'.
		NLToCode().then(replacement => {
		  // Move cursor to end of selected text.
		  // TODO: May only work if text is selected from top to bottom,
		  // fix it.
		  // @ts-ignore
		  const text = editor.document.getText(editor.selection);
		  // @ts-ignore
		  const position = editor.selection.active;
		  var newPosition = position.with(position.line, text.length);
		  var newSelection = new vscode.Selection(newPosition, newPosition);
  
		  // @ts-ignore
		  editor.selection = newSelection;
		  // @ts-ignore
		  editor.edit(editBuilder => {
			// @ts-ignore
			editBuilder.replace(editor.selection, replacement);
		  });
		})
	  }
	);
}
// @ts-ignore
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {}
// @ts-ignore
exports.deactivate = deactivate;

module.exports = {
	// @ts-ignore
	activate,
	// @ts-ignore
	deactivate,
}// @ts-ignore

