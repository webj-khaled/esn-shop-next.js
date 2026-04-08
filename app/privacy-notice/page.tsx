import { Divider, Link, Stack, Typography } from "@mui/material";
import { dataRetention, legalProfile } from "../legal/legal-profile";

export default function PrivacyNoticePage() {
    const { company, privacy, processors } = legalProfile;

    return (
        <Stack spacing={2.5} marginY={4} maxWidth={980}>
            <Typography variant="h3">Privacy Notice</Typography>
            <Typography variant="body2">
                Last updated: {privacy.lastUpdated}
            </Typography>
            <Typography variant="body2">
                This privacy notice is prepared for GDPR Article 13/14 transparency
                requirements. Replace all placeholders before production use.
            </Typography>

            <Divider />

            <Typography variant="h5">1. Controller</Typography>
            <Typography variant="body1">{company.legalName}</Typography>
            <Typography variant="body2">
                {company.addressLine1}, {company.postalCode} {company.city}, {company.country}
            </Typography>
            <Typography variant="body2">Email: {privacy.dataProtectionContactEmail}</Typography>
            <Typography variant="body2">Phone: {company.contactPhone}</Typography>
            <Typography variant="body2">
                Postal address: {privacy.dataProtectionContactPostalAddress}
            </Typography>
            <Typography variant="body2">DPO contact: {privacy.dpoContact}</Typography>

            <Divider />

            <Typography variant="h5">2. Categories of Personal Data</Typography>
            <Typography variant="body2">
                Account data: email address and password hash.
            </Typography>
            <Typography variant="body2">
                Authentication and security data: sign-in attempts, normalized identifier,
                user-agent string, response latency, success/failure outcome.
            </Typography>
            <Typography variant="body2">
                Order and checkout data: delivery name, phone, address, purchased items,
                order amounts, currency, checkout session identifiers, and customer email.
            </Typography>
            <Typography variant="body2">
                Communication data: password reset and transactional email delivery metadata.
            </Typography>
            <Typography variant="body2">
                Technical data: strictly necessary `Authentication` cookie and cart
                information in browser local storage.
            </Typography>

            <Divider />

            <Typography variant="h5">3. Purposes and Legal Bases (GDPR Art. 6)</Typography>
            <Typography variant="body2">
                Contract performance (Art. 6(1)(b)): account login, order placement,
                checkout completion, and order management.
            </Typography>
            <Typography variant="body2">
                Legal obligation (Art. 6(1)(c)): accounting and tax record retention.
            </Typography>
            <Typography variant="body2">
                Legitimate interests (Art. 6(1)(f)): fraud prevention, account security,
                abuse monitoring, and service reliability.
            </Typography>
            <Typography variant="body2">
                Consent (Art. 6(1)(a)): only where optional tracking or marketing cookies
                are used.
            </Typography>

            <Divider />

            <Typography variant="h5">4. Recipients and Processors</Typography>
            <Typography variant="body2">
                Payments: {processors.payments}
            </Typography>
            <Typography variant="body2">
                Transactional email delivery: {processors.transactionalEmails}
            </Typography>
            <Typography variant="body2">
                Hosting/infrastructure: {processors.hosting}
            </Typography>
            <Typography variant="body2">
                Data is shared with processors only to the extent required for service
                delivery and under data-processing terms.
            </Typography>

            <Divider />

            <Typography variant="h5">5. International Transfers</Typography>
            <Typography variant="body2">
                If personal data is transferred outside the EEA, we rely on an applicable
                transfer mechanism (for example, adequacy decisions or Standard Contractual
                Clauses) and supplementary safeguards where required.
            </Typography>

            <Divider />

            <Typography variant="h5">6. Retention Periods</Typography>
            <Typography variant="body2">Account data: {dataRetention.accountData}</Typography>
            <Typography variant="body2">Order data: {dataRetention.orderData}</Typography>
            <Typography variant="body2">
                Security logs: {dataRetention.authSecurityLogs}
            </Typography>
            <Typography variant="body2">
                Password reset tokens: {dataRetention.passwordResetTokens}
            </Typography>
            <Typography variant="body2">
                Technical logs: {dataRetention.technicalLogs}
            </Typography>

            <Divider />

            <Typography variant="h5">7. Data Subject Rights</Typography>
            <Typography variant="body2">
                You may request access, rectification, erasure, restriction, data
                portability, and object to processing where applicable. You may also
                withdraw consent at any time for consent-based processing.
            </Typography>
            <Typography variant="body2">
                To exercise rights, contact: {privacy.dataProtectionContactEmail}
            </Typography>
            <Typography variant="body2">
                You can lodge a complaint with the Austrian Data Protection Authority:
                {" "}
                <Link
                    href="https://dsb.gv.at/eingabe-an-die-dsb/beschwerde"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Datenschutzbehoerde (DSB) - Beschwerde
                </Link>
                .
            </Typography>

            <Divider />

            <Typography variant="h5">8. Cookies and Similar Technologies</Typography>
            <Typography variant="body2">
                We currently use a strictly necessary authentication cookie and local
                storage for shopping-cart functionality.
            </Typography>
            <Typography variant="body2">
                If optional analytics or marketing cookies are introduced, this notice and
                the consent mechanism must be updated before activation.
            </Typography>

            <Divider />

            <Typography variant="h5">9. Legal Sources Used for This Template</Typography>
            <Typography variant="body2">
                GDPR transparency requirements:
                {" "}
                <Link
                    href="https://eur-lex.europa.eu/eli/reg/2016/679/art_13/oj/eng"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Regulation (EU) 2016/679, Articles 12-14
                </Link>
                .
            </Typography>
            <Typography variant="body2">
                Practical privacy notice structure:
                {" "}
                <Link
                    href="https://gdpr.eu/privacy-notice/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GDPR.eu privacy notice guide
                </Link>
                .
            </Typography>
            <Typography variant="body2">
                Austrian imprint obligations:
                {" "}
                <Link
                    href="https://www.usp.gv.at/themen/brancheninformationen/information-und-kommunikation/impressumspflicht-gemaess-para-24-mediengesetz.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    USP Austria
                </Link>
                .
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
