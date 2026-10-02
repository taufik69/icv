// The password reset email: plain text plus a simple HTML version (inline styles: email clients
// ignore stylesheets). The code is the only thing that matters, so it is big and first.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

export function resetCodeEmail({ to, name, code, minutes }) {
  const text = [
    `Hi ${name},`,
    '',
    `Your ICV staff portal password reset code is: ${code}`,
    '',
    `It works for ${minutes} minutes and can be used once.`,
    "If you didn't ask to reset your password, you can ignore this email; your password stays the same.",
  ].join('\n')

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#212121">
  <p style="margin:0 0 4px;font-size:13px;color:#5c5c5c">International College of Victoria</p>
  <h1 style="margin:0 0 16px;font-size:20px;color:#0a2449">Your password reset code</h1>
  <p style="margin:0 0 16px">Hi ${esc(name)}, use this code to reset your staff portal password:</p>
  <p style="margin:0 0 16px;padding:16px;border-radius:10px;background:#f4f8fa;text-align:center;font-size:32px;font-weight:bold;letter-spacing:8px;color:#0a2449">${esc(code)}</p>
  <p style="margin:0 0 8px">It works for <strong>${minutes} minutes</strong> and can be used once.</p>
  <p style="margin:0;font-size:13px;color:#5c5c5c">If you didn't ask to reset your password, ignore this email. Your password stays the same.</p>
</div>`

  return { to, subject: `${code} is your ICV password reset code`, text, html }
}
