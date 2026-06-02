import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data?.name || !data?.email) {
      return NextResponse.json(
        { ok: false, error: 'Name and email are required.' },
        { status: 400 }
      )
    }

    // TODO: wire to an email service. Easiest path: Resend.
    //   import { Resend } from 'resend'
    //   const resend = new Resend(process.env.RESEND_API_KEY)
    //   await resend.emails.send({
    //     from: 'Atya Website <noreply@atyaebizsolutions.com>',
    //     to: ['info@atyaebizsolutions.com'],
    //     subject: `New lead from ${data.name}`,
    //     text: JSON.stringify(data, null, 2),
    //   })
    console.log('[contact] submission:', data)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] error:', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to submit. Please try again.' },
      { status: 500 }
    )
  }
}
