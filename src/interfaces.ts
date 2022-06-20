export interface DayEvents {
  Days: Events[] | null
}

export interface Events { 
  Date: Date
  Appointments: Appointments[]
  AppointmentsTotal: number | null
}

export interface Appointments {
  Id: number
  MeetingId: number
  BeginDateTime: Date
  EndDateTime: Date
  Attachments: number[] | null
  Title: string
  Type: string
  TechnicalComment: string | null
}