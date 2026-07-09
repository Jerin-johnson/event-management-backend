export const normalize = (data) => ({
    timezone: data.timezone,
    startDateTime: data.startDateTime,
    endDateTime: data.endDateTime,
    profiles: (data.profiles || [])
        .map((profile) => (typeof profile === "string" ? profile : profile._id.toString()))
        .sort(),
});
