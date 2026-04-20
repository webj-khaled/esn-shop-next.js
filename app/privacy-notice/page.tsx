import { Divider, Link, Stack, Typography } from "@mui/material";
import { legalProfile } from "../legal/legal-profile";

export default function PrivacyNoticePage() {
    const { association, representatives, source } = legalProfile;

    return (
        <Stack spacing={2.5} marginY={4} maxWidth={980}>
            <Typography variant="h3">Privacy Notice</Typography>
            <Typography variant="body2">
                Last updated: {association.registerExtractDate}
            </Typography>
            <Typography variant="body2">
                This page only publishes information available in the official Austrian
                association register extract.
            </Typography>

            <Divider />

            <Typography variant="h5">1. Controller</Typography>
            <Typography variant="body1">
                {association.legalName} ({association.legalForm})
            </Typography>
            <Typography variant="body2">Short name: {association.shortName}</Typography>
            <Typography variant="body2">ZVR number: {association.zvrNumber}</Typography>
            <Typography variant="body2">Registered seat: {association.seat}</Typography>
            <Typography variant="body2">Address: {association.postalAddress}</Typography>
            <Typography variant="body2">Care of: {association.careOf}</Typography>
            <Typography variant="body2">Country: {association.country}</Typography>
            <Typography variant="body2">
                Registry authority: {association.registryAuthority}
            </Typography>

            <Divider />

            <Typography variant="h5">2. Authorized Representatives</Typography>
            {representatives.map((representative) => (
                <Typography
                    key={`${representative.role}-${representative.fullName}`}
                    variant="body2"
                >
                    {representative.role}: {representative.fullName} ({representative.mandateFrom}{" "}
                    to {representative.mandateTo})
                </Typography>
            ))}

            <Divider />

            <Typography variant="h5">3. Available Contact Data</Typography>
            <Typography variant="body2">
                The source document does not list a public email address, phone number, or
                dedicated data protection officer contact.
            </Typography>
            <Typography variant="body2">
                Until additional official details are available, communication can be sent
                to the postal address listed above.
            </Typography>

            <Divider />

            <Typography variant="h5">4. Source</Typography>
            <Typography variant="body2">Source document: {source.documentName}</Typography>
            <Typography variant="body2">Issued at: {source.issuedAt}</Typography>
            <Typography variant="body2">Issuer: {source.issuer}</Typography>
            <Typography variant="body2">
                Signature verification:
                {" "}
                <Link href={source.verificationUrl} target="_blank" rel="noopener noreferrer">
                    {source.verificationUrl}
                </Link>
            </Typography>

            <Divider />

            <Typography variant="body2">
                Company details are also available at{" "}
                <Link href="/impressum">
                    /impressum
                </Link>
                .
            </Typography>
        </Stack>
    );
}
