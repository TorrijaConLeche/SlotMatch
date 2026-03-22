export interface AvailabilityDTO {
  day: number;
  hour: number;
}

export interface UserAvailabilityDTO {
  userId: string | null,
  slots: AvailabilityDTO[]
}