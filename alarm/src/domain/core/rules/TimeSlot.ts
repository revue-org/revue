export interface TimeSlot {
    get from(): Date
    set from(from: Date)
    get to(): Date
    set to(to: Date)
}