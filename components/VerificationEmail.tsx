import { Button, Html } from "@react-email/components";

export function VerificationEmail(
    props: { url: string }
){
    const { url } = props;
    return (
        <Html>
            <p>Click the button below to verify your email:</p>
            <Button href={url}>
                Verify Email
            </Button>
        </Html>
    )
};