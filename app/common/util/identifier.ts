export function normalizeIdentifier(input: string | FormDataEntryValue | null | undefined): string {
    if (input == null) {
        return '';
    }
    return String(input).trim().toLowerCase();
}
