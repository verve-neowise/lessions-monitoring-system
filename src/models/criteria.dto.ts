export interface ScoringDto {
    value: number
    description: string
}

export interface CriteriaDto {
    name: string
    description?: string
    maximum: number
    scorings: ScoringDto[]
    teacher?: number
}