export const PHONE_MASK = [
    { mask: '+0 (000) 000-00-00' },
    { mask: '+000 (000) 000-00-00' }
]

export const phoneDispatch = (appended: string, masked: any) => {
    const digits = (masked.value + appended).replace(/\D/g, '');
    return masked.compiledMasks[digits.length > 11 ? 1 : 0]
}