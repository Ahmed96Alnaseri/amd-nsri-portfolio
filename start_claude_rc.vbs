Set WshShell = CreateObject("WScript.Shell")

' Open a new cmd window running claude in the project folder
WshShell.Run "cmd /k ""cd /d C:\Users\Ahmed\amd-nsri-portfolio && claude"""

' Wait 12 seconds for Claude Code to fully start up
WScript.Sleep 12000

' Activate the cmd window (titled by the directory or claude)
WshShell.AppActivate "cmd"
WScript.Sleep 800

' Type /rc and press Enter to enable remote control
WshShell.SendKeys "/rc{ENTER}"
