'use server'

import sendgrid from '@sendgrid/mail'

export type Attachments = {
  content: string,
  filename: string,
  type: string,
  disposition: string
}

type ConstructedEmail = {
  to: string
  from: string
  subject: string
  text: string
  attachments?: Attachments[]
}

export async function submitForm(constructedEmail: ConstructedEmail) {
  sendgrid.setApiKey(`${process.env.SENDGRID_API_KEY}`)

  try {
    const res = await sendgrid.send(constructedEmail)
    if (res[0].statusCode >= 200 && res[0].statusCode < 300) {
      console.log({ status: 200 });
    } else {
      throw new Error()
    }
  } catch (error) {
    console.log({ error: error })
  }
}