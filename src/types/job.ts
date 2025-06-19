export interface Job {
  id?: string;
  company: string;
  position: string;
  status: "applied" | "interview" | "offer" | "rejected";
  appliedDate: string;
  salary?: string;
  location: string;
  jobUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
