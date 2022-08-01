type Datapoint = {
  id: string;
};

type Goal = {
  slug: string;
  datapoints: Datapoint[];
};

type User = {
  username: string;
  urgency_load: number;
  goals: Goal[];
};

type BeeminderAuth = { user: string; token: string };
