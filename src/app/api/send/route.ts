import {EmailTemplate} from "../../../components/email/email-template";
import {NextRequest, NextResponse} from "next/server";
import {Resend} from "resend";
import {CreateEmailOptions} from "resend/build/src/emails/interfaces";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const res = await request.json();
  const {toolLink} = res;

  try {
    const data = await resend.emails.send({
      from: "AI Tools <hello@aitools.sh>",
      to: ["allenpdl75@gmail.com"],
      subject: "New Submission | AI Tools",
      react: EmailTemplate({toolLink: toolLink}),
    } as CreateEmailOptions);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({error});
  }
}
