import { Injectable } from '@nestjs/common'
import { Resend } from 'resend'

@Injectable()
export class ResendService {
  constructor(private readonly resend: Resend) {}

  async sendEmailToken(to: string, token: string) {
    const email = await this.resend.emails.send({
      from: 'no-reply@prosspecta.com.br',
      to,
      subject: 'Confirm your email',
      html: `<p>Olá! Seu token é: ${token}</p>`,
    })

    if (email.error?.message) {
      throw new Error(email.error?.message)
    }

    return email.data?.id
  }
}
