'use client'

import { Attachments, submitForm } from "./actions"

export default function Home() {

  function handleInput(formData: FormData) {
    const emailRecipient = formData.get('emailRecipient') as string;
    const message = formData.get('message') as string;
    const fileUploads = formData.getAll('fileUpload') as File[]; // Get all files as an array
  
    const attachments: Attachments[] = []; // Array to store all attachments
  
    const filePromises = fileUploads.map(fileUpload => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = function () {
          const result = fileReader.result
          if (typeof result === 'string') {
            const base64String = result.split(',')[1]
            attachments.push({
              content: base64String,
              filename: fileUpload.name,
              type: fileUpload.type,
              disposition: "attachment"
            })
            resolve(null)
          } else {
            reject('Error reading file')
          }
        };
        fileReader.readAsDataURL(fileUpload); // Read the file as data URL
      })
    })
  
    Promise.all(filePromises)
      .then(() => {
        const constructedEmail = {
          to: emailRecipient,
          from: 'kivi.webdev@gmail.com',
          subject: 'Sending attachments with SendGrid',
          text: message,
          attachments: attachments // Attachments array
        };
        submitForm(constructedEmail)
      })
      .catch(error => {
        console.error(error)
      })
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
