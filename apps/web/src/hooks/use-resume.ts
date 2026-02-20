"use client";

import { useState, useCallback } from "react";
import type { ResumeProfile, ResumeExperience, ResumeEducation, ResumeProject, ResumeCertification } from "@/types/resume";
import { INITIAL_RESUME_STATE } from "@/types/resume";

interface UseResumeOptions {
  resumeId: string;
  initialData?: Partial<ResumeProfile>;
}

export function useResume({ resumeId, initialData }: UseResumeOptions) {
  const [resume, setResume] = useState<ResumeProfile>({
    ...INITIAL_RESUME_STATE,
    ...initialData,
    personal: { ...INITIAL_RESUME_STATE.personal, ...initialData?.personal },
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const updatePersonal = useCallback(
    (field: keyof ResumeProfile["personal"], value: string) => {
      setResume((prev) => ({
        ...prev,
        personal: { ...prev.personal, [field]: value },
      }));
    },
    []
  );

  const addExperience = useCallback(() => {
    const entry: ResumeExperience = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setResume((prev) => ({ ...prev, experience: [...prev.experience, entry] }));
  }, []);

  const updateExperience = useCallback(
    (id: string, field: keyof ResumeExperience, value: string | boolean) => {
      setResume((prev) => ({
        ...prev,
        experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
      }));
    },
    []
  );

  const removeExperience = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  }, []);

  const addEducation = useCallback(() => {
    const entry: ResumeEducation = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    setResume((prev) => ({ ...prev, education: [...prev.education, entry] }));
  }, []);

  const updateEducation = useCallback(
    (id: string, field: keyof ResumeEducation, value: string) => {
      setResume((prev) => ({
        ...prev,
        education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
      }));
    },
    []
  );

  const removeEducation = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  }, []);

  const addProject = useCallback(() => {
    const entry: ResumeProject = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      url: "",
      technologies: [],
    };
    setResume((prev) => ({ ...prev, projects: [...prev.projects, entry] }));
  }, []);

  const updateProject = useCallback(
    (id: string, field: keyof ResumeProject, value: string | string[]) => {
      setResume((prev) => ({
        ...prev,
        projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
      }));
    },
    []
  );

  const removeProject = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  }, []);

  const addCertification = useCallback(() => {
    const entry: ResumeCertification = {
      id: crypto.randomUUID(),
      name: "",
      issuer: "",
      date: "",
      url: "",
    };
    setResume((prev) => ({ ...prev, certifications: [...prev.certifications, entry] }));
  }, []);

  const updateCertification = useCallback(
    (id: string, field: keyof ResumeCertification, value: string) => {
      setResume((prev) => ({
        ...prev,
        certifications: prev.certifications.map((c) =>
          c.id === id ? { ...c, [field]: value } : c
        ),
      }));
    },
    []
  );

  const removeCertification = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  }, []);

  const updateSkills = useCallback((skills: string[]) => {
    setResume((prev) => ({ ...prev, skills }));
  }, []);

  const save = useCallback(
    async (title: string, template: string, themeColor: string) => {
      setSaving(true);
      setMessage("");
      try {
        const res = await fetch(`/api/v1/resumes/${resumeId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content: resume, template, themeColor }),
        });
        if (res.ok) {
          setMessage("Saved successfully.");
        } else {
          setMessage("Failed to save.");
        }
      } catch {
        setMessage("Failed to save.");
      } finally {
        setSaving(false);
      }
    },
    [resume, resumeId]
  );

  return {
    resume,
    saving,
    message,
    updatePersonal,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
    updateSkills,
    save,
  };
}
