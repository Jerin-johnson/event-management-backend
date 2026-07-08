Core Requirements:

Profiles (Users)
Create profile with only name.
Timezone can be set later (default Asia/Kolkata).
No delete functionality.

Create Event
Select multiple profiles.
Select one timezone for the event.
Select Start Date + Time and End Date + Time.
End time must be after start time.
Store dates in UTC, but respect the event's timezone.

View Events
A user should see only events assigned to them.
All dates/times must be converted to the current user's timezone when displayed.

Update Events
Users can update events they are part of.
On update → log the changes (Bonus).

Multi-timezone Handling
Each user has their own timezone.
Events must show correctly in each user's local timezone.
