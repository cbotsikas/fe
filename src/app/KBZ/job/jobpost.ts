export interface Jobpost {
    id: string;
    Label: string; // Position
    department: string;
    employmentType: string;
    level: string; // Seniority Level
    JobDescription: String;
    // SkillReq?: string [];
    SkillReq: Skill [];
}

export interface Skill {
    SkillLabel: string;  // required field
    proficiencyLevel: string;
    skillPriority: string;
}
