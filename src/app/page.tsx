import sendgrid from '@sendgrid/mail'

export default function Home() {

  async function submitForm(formData: FormData) {
    'use server'

    sendgrid.setApiKey(`${process.env.SENDGRID_API_KEY}`)

    const emailRecipient = formData.get('emailRecipient')
    const message = formData.get('message')
  
    const msg = {
      to: emailRecipient as string, // Change to your recipient
      from: 'kivi.webdev@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: message as string,
    }

    try {
      const res = await sendgrid.send(msg)
      if (res[0].statusCode >= 200 && res[0].statusCode < 300) {
        console.log({ status: 200 });
      } else {
        throw new Error()
      }
    } catch (error) {
      console.log({ error: error })
    }
  }

  return (
    <main>
      <form action={ submitForm }>
        <label htmlFor="emailRecipient">Email recipient</label><br />
        <input type="text" name="emailRecipient" id="emailRecipient" />
        <div>
          <label htmlFor="message">Message</label><br />
          <textarea name="message" id="message" cols={ 30 } rows={ 10 }></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
