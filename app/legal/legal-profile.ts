export const legalProfile = {
    association: {
        legalName: "Erasmus Student Network Salzburg",
        shortName: "ESN Salzburg",
        legalForm: "Verein",
        zvrNumber: "1439086135",
        seat: "Salzburg (Salzburg)",
        careOf: "c/o Sofia Reiter",
        postalAddress: "Untersbergstrasse 4A/22, 5020 Salzburg, Austria",
        country: "Austria",
        dateOfEstablishment: "2022-11-16",
        registerExtractDate: "2026-04-20",
        registryAuthority: "Salzburg LPD",
    },
    representationRules: [
        "The president represents the association externally.",
        "Written declarations are valid with the signature of the president.",
        "In financial matters, the signature of the president or treasurer is required.",
        "Legal authorizations to represent or sign for the association can only be granted by the president, the deputy president, and the treasurer.",
    ],
    representatives: [
        {
            role: "President",
            fullName: "Sofia Reiter",
            mandateFrom: "2025-11-13",
            mandateTo: "2026-11-12",
        },
        {
            role: "Treasurer",
            fullName: "Khaled Elfaham",
            mandateFrom: "2025-11-13",
            mandateTo: "2026-11-12",
        },
    ],
    source: {
        documentName: "Vereinsregisterauszug_5259d975-0d1c-4dd6-a973-82d8d0630fba.pdf",
        issuedAt: "2026-04-20T02:10:24+02:00",
        issuer: "Austrian Federal Ministry of the Interior (IV/DDS)",
        verificationUrl: "https://www.signaturpruefung.gv.at",
    },
} as const;
