import { Divider, Link, Stack, Typography } from "@mui/material";
import { legalProfile } from "../legal/legal-profile";

export default function ImpressumPage() {
    const { association, representationRules, representatives, source } = legalProfile;

    return (
        <Stack spacing={2.5} marginY={4} maxWidth={900}>
            <Typography variant="h3">Impressum</Typography>
            <Typography variant="body2">
                Company information based on the official Austrian association register
                extract dated {association.registerExtractDate}.
            </Typography>

            <Divider />

            <Typography variant="h5">Information According to Section 5 ECG</Typography>
            <Typography variant="body1">
                {association.legalName} ({association.legalForm})
            </Typography>
            <Typography variant="body1">
                Short name: {association.shortName}
            </Typography>
            <Typography variant="body1">
                ZVR number: {association.zvrNumber}
            </Typography>
            <Typography variant="body1">
                Registered seat: {association.seat}
            </Typography>
            <Typography variant="body1">
                Address: {association.postalAddress}
            </Typography>
            <Typography variant="body1">
                Care of: {association.careOf}
            </Typography>
            <Typography variant="body1">
                Date of establishment: {association.dateOfEstablishment}
            </Typography>
            <Typography variant="body1">
                Registry authority: {association.registryAuthority}
            </Typography>

            <Divider />

            <Typography variant="h5">Authorized Representatives</Typography>
            {representatives.map((representative) => (
                <Typography key={`${representative.role}-${representative.fullName}`} variant="body1">
                    {representative.role}: {representative.fullName} ({representative.mandateFrom} to{" "}
                    {representative.mandateTo})
                </Typography>
            ))}

            <Divider />

            <Typography variant="h5">Representation Rules</Typography>
            {representationRules.map((rule) => (
                <Typography key={rule} variant="body2">
                    {rule}
                </Typography>
            ))}

            <Divider />

            <Typography variant="h5">Source</Typography>
            <Typography variant="body1">
                Source document: {source.documentName}
            </Typography>
            <Typography variant="body2">
                Issued at: {source.issuedAt}
            </Typography>
            <Typography variant="body2">
                Issuer: {source.issuer}
            </Typography>
            <Typography variant="body2">
                Signature verification:
                {" "}
                <Link
                    href={source.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {source.verificationUrl}
                </Link>
            </Typography>

            <Divider />

            <Typography variant="body2">
                Privacy information is available at{" "}
                <Link href="/privacy-notice">
                    /privacy-notice
                </Link>
                .
            </Typography>
        </Stack>
    );
}
