import { Divider, Link, Stack, Typography } from "@mui/material";
import { legalProfile } from "../legal/legal-profile";

export default function ImpressumPage() {
    const { company } = legalProfile;

    return (
        <Stack spacing={2.5} marginY={4} maxWidth={900}>
            <Typography variant="h3">Impressum</Typography>
            <Typography variant="body2">
                This page is a compliance template for Austrian websites. Replace all
                fields starting with <strong>REPLACE_WITH_</strong> before going live.
            </Typography>

            <Divider />

            <Typography variant="h5">Information According to Section 5 ECG</Typography>
            <Typography variant="body1">
                {company.legalName} ({company.legalForm})
            </Typography>
            <Typography variant="body1">
                Registered seat: {company.seat}
            </Typography>
            <Typography variant="body1">
                Address: {company.addressLine1}, {company.postalCode} {company.city},{" "}
                {company.country}
            </Typography>
            <Typography variant="body1">Email: {company.contactEmail}</Typography>
            <Typography variant="body1">Phone: {company.contactPhone}</Typography>
            <Typography variant="body1">
                Commercial register number: {company.commercialRegisterNumber}
            </Typography>
            <Typography variant="body1">
                Register court: {company.registerCourt}
            </Typography>
            <Typography variant="body1">VAT ID: {company.vatId}</Typography>
            <Typography variant="body1">
                Supervisory authority: {company.supervisoryAuthority}
            </Typography>
            <Typography variant="body1">Chamber: {company.chamber}</Typography>
            <Typography variant="body1">
                Applicable professional rules: {company.professionalRules}
            </Typography>

            <Divider />

            <Typography variant="h5">Media Owner / Editorial Responsibility</Typography>
            <Typography variant="body1">Media owner: {company.mediaOwner}</Typography>
            <Typography variant="body1">
                Editorial responsibility: {company.editorResponsible}
            </Typography>
            <Typography variant="body2">
                Managing director / legal representative: {company.managingDirector}
            </Typography>

            <Divider />

            <Typography variant="h5">Consumer Dispute Resolution</Typography>
            <Typography variant="body2">
                We do not commit to alternative dispute resolution before a consumer
                arbitration board unless legally required.
            </Typography>
            <Typography variant="body2">
                Note: The EU Online Dispute Resolution (ODR) platform was discontinued in
                2025 by EU regulation; do not use outdated ODR links in your imprint.
            </Typography>

            <Divider />

            <Typography variant="h5">Legal References</Typography>
            <Typography variant="body2">
                Austrian government information on imprint obligations:
                {" "}
                <Link
                    href="https://www.usp.gv.at/themen/brancheninformationen/information-und-kommunikation/impressumspflicht-gemaess-para-24-mediengesetz.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    USP - Impressumspflicht gemaess Paragraf 24 Mediengesetz
                </Link>
            </Typography>
            <Typography variant="body2">
                General e-commerce imprint guidance:
                {" "}
                <Link
                    href="https://www.wko.at/internetrecht/informationspflichten-nach-dem-e-commerce-gesetz--dem-unte"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    WKO - Informationspflichten nach dem ECG
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
