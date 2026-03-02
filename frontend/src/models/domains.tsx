import { Cpu, BriefcaseBusiness, Paintbrush, Brain, Languages, Pill, Computer, TextSearch } from "lucide-react";

export const domains = {"All":null, "Tech":Cpu , "Business":BriefcaseBusiness, "Art & design":Paintbrush, "Science":Brain, "Languages":Languages};
export const domainsEd = {"All":null, "Medecine":Pill , "Computer science":Computer, "Sciences & Technologies": TextSearch};

export const DomainsEd = [
  {
    id: "med",
    label: "Medecine",
    subCategories: [
      "1ère Année",
      "2ère Année",
      "3ère Année",
      "4ère Année",
      "5ère Année",
      "6ère Année",
      "7ère Année",
      
    ],
  },
  {
    id: "info",
    label: "Computer science",
    subCategories: [
      "1ère Année",
      "2ère Année",
      "3ère Année",
      "4ère Année",
      "5ère Année",
    ],
  },
  {
    id: "ST",
    label: "Sciences & technologies",
    subCategories: [
      "1ère Année",
      "2ère Année",
      "3ère Année",
      "4ère Année",
      "5ère Année",
    ],
  }
];


export const Domains = [
  {
    id: "tech",
    label: "Tech",
    subCategories: [
      "Web Development",
      "Mobile Development",
      "Data & AI",
      "Cybersecurity",
      "Cloud & DevOps",
      
    ],
  },
  {
    id: "business",
    label: "Business",
    subCategories: [
      "Entrepreneurship",
      "Digital Marketing",
      "Finance",
      "Management",
      "Sales",
    ],
  },
  {
    id: "art-design",
    label: "Art & Design",
    subCategories: [
      "UI / UX Design",
      "Graphic Design",
      "Motion & Video",
      "3D Design",
    ],
  },
  {
    id: "science",
    label: "Science",
    subCategories: ["Mathematics", "Physics", "Chemistry", "Computer Science"],
  },
  {
    id: "languages",
    label: "Languages",
    subCategories: [
      "English",
      "French",
      "German",
      "Spanish",
      "Arabic",
      "Italian",
      "Chinese (Mandarin)",
    ],
  },
];


