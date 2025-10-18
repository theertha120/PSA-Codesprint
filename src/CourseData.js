import Papa from "papaparse";
import { useEffect, useState } from "react";

export const CourseData = () => {
  const [technicalCourses, setTechnicalCourses] = useState([]);
  const [nonTechnicalCourses, setNonTechnicalCourses] = useState([]);

  useEffect(() => {
    fetch("/sources/Functions & Skills.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });

        const techCourses = [];
        const softCourses = [];

        parsed.data.forEach((row, idx) => {
          if (!row["Function / Unit / Skill"]) return;

          const progress = Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 80 + 10); 
          const courseObj = {
            id: idx + 1,
            title: row["Function / Unit / Skill"],
            specialisation: row["Specialisation / Unit"],
            type: row["Technical / Soft Skills"].trim(),
            modes: row["Mode of Courses Available"]
              ? row["Mode of Courses Available"].split(",").map((m) => m.trim())
              : [],
            progress,
          };

          if (courseObj.type.toLowerCase() === "technical") techCourses.push(courseObj);
          else softCourses.push(courseObj);
        });

        setTechnicalCourses(techCourses);
        setNonTechnicalCourses(softCourses);
      })
      .catch((err) => {
        console.error("Error loading courses:", err);
      });
  }, []);

  return { technicalCourses, nonTechnicalCourses };
};
