const stories = [
  {
    created_at: "February 14, 2025",
    title: "How Progress Happens",
    description:
      "John H. Shaw, Harvard's vice provost for research, explains the crucial role of NIH support for biomedical research at the University.",
    image:
      "https://alumni.harvard.edu/sites/default/files/styles/thumbnail500/public/story/teaser/research-support-testtubes_72%20copy.png?itok=jP2KQ5UU",
  },
  {
    created_at: "February 6, 2025",
    title: "A ‘Wicked’ Good Time",
    description:
      "Grammy, Emmy and Tony Award-winning actor and singer Cynthia Erivo was honored as Hasty Pudding's 2025 Woman of the Year.",
    image:
      "https://alumni.harvard.edu/sites/default/files/styles/thumbnail500/public/story/teaser/Screenshot%202025-02-07%20at%209.48.48%E2%80%AFAM.jpg?itok=9go0r0tI",
  },
  {
    created_at: "February 5, 2025",
    title: "Prints, Paintings Gifted to Harvard Art Museums",
    description:
      "A gift from the collection of Philip A. Straus AB ’37 and Lynn G. Straus includes 62 prints and two paintings by Edvard Munch, as well as one print by Jasper Johns.",
    image:
      "https://alumni.harvard.edu/sites/default/files/styles/thumbnail500/public/story/teaser/Screenshot%202025-02-05%20at%2011.16.32%E2%80%AFAM.png?itok=xp1FGdiF",
  },
];

const events = [
  {
    date: {
      day: "19",
      month: "Dec",
    },
    title: "March Book Club- Check out Harvard Alumni In-Person Book Club!",
    location: "Houston, TX",
    event_type: "Lecture/Reading/Talk",
  },
  {
    date: {
      day: "22",
      month: "Jan",
    },
    title: "Harvard Alumni Networking Event",
    location: "New York, NY",
    event_type: "Networking",
  },
  {
    date: {
      day: "15",
      month: "Feb",
    },
    title: "Harvard Alumni Career Fair",
    location: "San Francisco, CA",
    event_type: "Career Fair",
  },
  {
    date: {
      day: "10",
      month: "Mar",
    },
    title: "Harvard Alumni Volunteer Day",
    location: "Boston, MA",
    event_type: "Volunteer",
  },
];

export const Stories = () => {
  return (
    <div className="flex flex-col gap-10">
      {stories.map((story) => (
        <div key={story.title} className="flex">
          <div className="w-40 h-40 shrink-0 mr-5">
            <img
              className="w-full h-auto"
              src={story.image}
              alt={story.title}
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
              {story.created_at}
            </p>
            <h4 className="text-xl mb-4">{story.title}</h4>
            <p className="text-sm">{story.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProgramsEvents = () => {
  return (
    <div className="flex flex-col gap-10">
      {events.map((event) => (
        <div key={event.title} className="flex gap-5 items-start">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <p className="text-sm uppercase ">{event.date.month}</p>
            <p className="text-2xl font-semibold leading-none">
              {event.date.day}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase mb-1 font-semibold text-foreground/80">
              {event.event_type}
            </p>
            <h4 className="text-xl mb-2">{event.title}</h4>
            <p className="text-sm">{event.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
