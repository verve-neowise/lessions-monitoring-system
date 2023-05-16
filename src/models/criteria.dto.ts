export interface ScoringDto {
    value: number
    description: string
}

export interface CriteriaDto {
    maximum: number
    scorings: ScoringDto[]
    teacher?: number
}