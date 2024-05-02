import * as React from "react";
import { Html, Heading, Text } from "@react-email/components";

interface EmailTemplateProps {
  toolLink: string;
}

export function EmailTemplate({ toolLink }: EmailTemplateProps) {
  return (
    <Html>
      <div>
        <Heading>New Tool Submission</Heading>
        <Text>A new tool has been submitted to AI Tools!</Text>
        <Text>
          Link: <code>{toolLink}</code>
        </Text>
        <a href={toolLink} target="_blank">
          Visit Site
        </a>
      </div>
    </Html>
  );
}
