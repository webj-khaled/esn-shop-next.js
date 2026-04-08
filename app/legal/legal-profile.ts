export const legalProfile = {
    company: {
        legalName: "REPLACE_WITH_LEGAL_ENTITY_NAME",
        legalForm: "REPLACE_WITH_LEGAL_FORM",
        seat: "REPLACE_WITH_REGISTERED_SEAT",
        addressLine1: "REPLACE_WITH_STREET_AND_NUMBER",
        postalCode: "REPLACE_WITH_POSTAL_CODE",
        city: "REPLACE_WITH_CITY",
        country: "Austria",
        contactEmail: "REPLACE_WITH_CONTACT_EMAIL",
        contactPhone: "REPLACE_WITH_CONTACT_PHONE",
        managingDirector: "REPLACE_WITH_MANAGING_DIRECTOR",
        mediaOwner: "REPLACE_WITH_MEDIA_OWNER",
        editorResponsible: "REPLACE_WITH_EDITORIAL_RESPONSIBLE_PERSON",
        commercialRegisterNumber: "REPLACE_WITH_FIRMENBUCHNUMMER_OR_N_A",
        registerCourt: "REPLACE_WITH_REGISTER_COURT_OR_N_A",
        vatId: "REPLACE_WITH_UID_OR_N_A",
        supervisoryAuthority: "REPLACE_WITH_COMPETENT_AUTHORITY_OR_N_A",
        chamber: "REPLACE_WITH_CHAMBER_MEMBERSHIP_OR_N_A",
        professionalRules: "REPLACE_WITH_APPLICABLE_PROFESSIONAL_RULES_OR_N_A",
    },
    privacy: {
        lastUpdated: "2026-04-04",
        dataProtectionContactEmail: "REPLACE_WITH_PRIVACY_CONTACT_EMAIL",
        dataProtectionContactPostalAddress:
            "REPLACE_WITH_PRIVACY_CONTACT_POSTAL_ADDRESS",
        dpoContact: "REPLACE_WITH_DPO_CONTACT_OR_N_A",
    },
    processors: {
        payments: "Stripe",
        transactionalEmails: "Resend",
        hosting: "REPLACE_WITH_HOSTING_PROVIDER",
    },
} as const;

export const dataRetention = {
    accountData:
        "Until account deletion request, then restricted/deleted unless retention is required by law.",
    orderData:
        "At least 7 years for tax/accounting obligations under Austrian law, plus any longer period required for legal claims.",
    authSecurityLogs:
        "Maximum 12 months, unless a longer period is required for security incident investigation.",
    passwordResetTokens:
        "Until used or expired, then deleted as part of periodic cleanup.",
    technicalLogs:
        "Up to 30 days unless needed longer for security and abuse prevention.",
} as const;
