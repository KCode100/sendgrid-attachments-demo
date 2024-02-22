'use client'

import { submitForm } from "./actions"

export default function Home() {

  function handleInput(formData: FormData) {
    const emailRecipient = formData.get('emailRecipient') as string
    const message = formData.get('message') as string
    const fileUpload = (formData.get('fileUpload') as File)
    console.log(fileUpload)

    const fileReader = new FileReader();
    fileReader.onload = function() {
      const result = fileReader.result;
      if (typeof result === 'string') { // Check if result is a string
        const base64String = result.split(',')[1]; // Use split method safely
        const constructedEmail = {
          to: emailRecipient,
          from: 'kivi.webdev@gmail.com',
          subject: 'Sending attachments with SendGrid',
          text: message,
          attachments: [
            {
              content: base64String,
              filename: fileUpload.name,
              type: fileUpload.type,
              disposition: "attachment"
            }
          ]
        }
        submitForm(constructedEmail);
      } else {
        // Handle the case when fileReader.result is not a string
        console.error('Error reading file');
      }
    };
    fileReader.readAsDataURL(fileUpload); // Read the file as data URL
  }

  return (
    <main>
      <form action={ handleInput }>
        <label htmlFor="emailRecipient">Email recipient</label><br />
        <input type="text" name="emailRecipient" id="emailRecipient" />
        <div>
          <label htmlFor="message">Message</label><br />
          <textarea name="message" id="message" cols={ 30 } rows={ 10 }></textarea>
        </div>
        <div>
          <label htmlFor="file-upload">Upload a file</label>
          <input id="file-upload" name="fileUpload" type="file" multiple />
        </div><br /><br />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}
