DJ SMS is an application being developed by Liz Kerber. The goal of the project is for users to control a Spotify playlist by sending a text message.

This application was built to be run on a Raspberry Pi using node and npm. After cloning, please run 'npm install' in the terminal, within the root folder of the application.

You will also want to be running a server that's visible to the internet. This can be achieved with ngrok. Instructions for download and use can be found at ngrok.com/download.

You will need the following additional software:
- Mopidy
- Mopidy's Spotify extension

The following must be locally configured:

- your own Twilio account, and its webhook (associated with a GET route; should point to the ngrok port)
- your local Mopidy config file, so you are logged into Spotify
