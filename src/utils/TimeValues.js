const timeValues = [
    {
        label: "Morning (5am - Noon)",
        value: "morning",
        start: 5,
        end: 12
    },
    {
        label: "Afternoon (Noon - 5pm)",
        value: "afternoon",
        start: 12,
        end: 17
    },
    {
        label: "Evening (5pm - 9 pm)",
        value: "evening",
        start: 17,
        end: 21
    },
    {
        label: "Late Night (9pm - 5am)",
        value: "late-night",
        start: 21,
        end: 29 //hacky way of saying 5am
    }
]

export default timeValues;