## Objectives

1. Display a dialog box with no.of.questions, category and difficulty for the user to choose
2. Store the correct answers in a state variable and display it on the top right for the user.
3. Display the percentage of questions answered correctly. 
4. Display a button for the user to play again

**Note:** Some of the responses from server comes in a HTML format. 

Hence ``dangerouslySetInnerHTML={{ __html: answer}}`` is used to convert them from HTML format. Never use it against user input.
This can be used only over a server responses at rare cases
