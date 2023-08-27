import * as React from 'react';

interface EmailTemplateProps {
    toolLink: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({toolLink}) => (
    <div>
        <h1>New Tool Submission</h1>
        <p>A new tool has been submitted to AI Tools!</p>
        <p>Link: <code>{toolLink}</code></p>
        <a href={toolLink} target="_blank">Visit Site</a>
    </div>
)
