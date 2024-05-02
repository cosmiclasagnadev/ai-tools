import { EmailTemplate } from "../../../components/email/email-template";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { Client } from "postmark";

const postmarkClient = new Client(process.env.POSTMARK_API_KEY!);

export async function POST(request: Request) {
  const res = await request.json();
  const { toolLink } = res;
  const emailHTML = render(EmailTemplate({ toolLink }));

  try {
    const options = {
      From: "AI Tools <hello@aitools.sh>",
      To: "hello@aitools.sh",
      Subject: "New Submission | AI Tools",
      HtmlBody: emailHTML,
    };

    postmarkClient.sendEmail(options);

    return NextResponse.json({ message: "Success!" });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong!",
      error: error,
    });
  }
}
