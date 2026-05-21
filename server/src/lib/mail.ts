import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_SENDER_EMAIL;

if (!resendApiKey) {
	throw new Error("Could not find environment variables RESEND_API_KEY");
}
if (!from) {
	throw new Error("Could not find environment variables RESEND_SENDER_EMAIL");
}

type MailMessage = {
	to: string;
	subject: string;
	text: string;
};

const resend = new Resend(resendApiKey);

export async function sendEmail(message: MailMessage) {
	resend.emails.send({
		from: `Petmatch <${from}>`,
		to: message.to,
		subject: message.subject,
		text: message.text,
	});
}
