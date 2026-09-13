import { Transform } from 'class-transformer'

export function ProperNoun() {
    return Transform(({ value }: { value: string }) => value?.trim().toLowerCase().replace(/\b\w/g, char => char.toUpperCase())

    )
}