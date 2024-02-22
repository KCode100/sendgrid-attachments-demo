# SendGrid Email Attachment Demo

This project is a simple demonstration of how to use SendGrid to attach multiple files to an email message. It utilizes an HTML file input to allow users to select multiple files, then sends the selected files as attachments in an email using SendGrid's API.

## Features

- Allows users to select multiple files using an HTML file input.
- Converts the selected files into base64-encoded strings.
- Constructs an email message with the selected files as attachments.
- Sends the email using SendGrid's API.

## Setup

1. Clone this repository to your local machine.
2. Install the necessary dependencies using npm or yarn.
3. Obtain an API key from SendGrid by signing up for an account and creating a new API key.
4. Set up your SendGrid API key as an environment variable in a `.env` or a `.env.local` file.