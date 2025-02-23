import { supabase } from "../supabaseClient";

// Bio related queries
export const fetchBioData = async () => {
  try {
    const { data, error } = await supabase.from("bio").select("*").single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching bio data:", error);
    return { data: null, error };
  }
};

// Skills related queries
export const fetchSkillsData = async () => {
  try {
    const { data: categories, error: categoriesError } = await supabase
      .from("skill_categories")
      .select("*");
    if (categoriesError) throw categoriesError;

    const { data: skills, error: skillsError } = await supabase
      .from("skills")
      .select("*");
    if (skillsError) throw skillsError;

    const formattedSkills = categories.map((category) => ({
      title: category.title,
      skills: skills.filter((skill) => skill.category_id === category.id),
    }));

    return { data: formattedSkills, error: null };
  } catch (error) {
    console.error("Error fetching skills:", error);
    return { data: null, error };
  }
};

// Experience related queries
export const fetchExperiences = async () => {
  try {
    const { data, error } = await supabase.from("experiences").select("*");
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return { data: null, error };
  }
};

// Education related queries
export const fetchEducation = async () => {
  try {
    const { data, error } = await supabase.from("education").select("*");
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching education:", error);
    return { data: null, error };
  }
};

// Projects related queries
export const fetchProjects = async () => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*,members(*),associations(*)");
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { data: null, error };
  }
};

// Navigation related queries
export const fetchNavData = async () => {
  try {
    const { data, error } = await supabase
      .from("bio")
      .select("name, github")
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching nav data:", error);
    return { data: null, error };
  }
};
