'use strict'

module.exports = (slapp) => {

  let help = `Let's ride is pretty simple. Ask question with the \`/letsride\` command:
\`\`\`
/letsride [type your question here]
[answer 1]
[answer 2]
[...]
\`\`\`

By default, In and Out buttons are created. Create custom buttons (up to 15 of them) by listing them on new lines (shift-enter or ctrl-enter or return on mobile).

For example:

\`\`\`
/letsride What time should we meet?
10:30AM PST
2:00PM PST
:no_entry: never
\`\`\`

Choose a button option and results are aggregated under the question.

Like this! https://goo.gl/ucnthN
`

  slapp.command('/letsride', /^\s*help\s*$/, (msg) => {
    msg.respond(help)
  })

  slapp.message('help', ['direct_mention', 'direct_message'], (msg, text) => {
    msg.say(help)
  })

  slapp.event('bb.team_added', function (msg) {
    slapp.client.im.open({ token: msg.meta.bot_token, user: msg.meta.user_id }, (err, data) => {
      if (err) {
        return console.error(err)
      }
      let channel = data.channel.id

      msg.say({ channel: channel, text: 'Thanks for adding me to your team!' })
      msg.say({ channel: channel, text: help })
    })
  })
}
