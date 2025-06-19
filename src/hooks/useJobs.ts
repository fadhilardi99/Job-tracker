import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Job } from "../types/job";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const jobsData: Job[] = [];
      querySnapshot.forEach((doc) => {
        jobsData.push({ id: doc.id, ...doc.data() } as Job);
      });
      setJobs(jobsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addJob = async (job: Omit<Job, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date();
    await addDoc(collection(db, "jobs"), {
      ...job,
      createdAt: now,
      updatedAt: now,
    });
  };

  const updateJob = async (id: string, job: Partial<Job>) => {
    const jobRef = doc(db, "jobs", id);
    await updateDoc(jobRef, {
      ...job,
      updatedAt: new Date(),
    });
  };

  const deleteJob = async (id: string) => {
    await deleteDoc(doc(db, "jobs", id));
  };

  return { jobs, loading, addJob, updateJob, deleteJob };
};
