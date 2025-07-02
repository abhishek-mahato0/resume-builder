/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { auth, signIn } from "@/auth";
import { prisma } from "@/auth/db";
import { revalidatePath } from "next/cache";
import { ResumeData } from "../template/types";
import { redirect } from "next/navigation";

export const handleAuth = async (
  e: React.FormEvent<HTMLFormElement>,
  currentForm: string
) => {
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string;
  // const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  if (currentForm === "login") {
    handleLogin(email);
  } else {
    handleRegister(name, email);
  }
};

export const handleRegister = async (name: string, email: string) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    const user = await prisma.user.create({
      data: { name, email }, // Assuming password is hashed before this step
    });

    return user;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

export const handleLogin = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    console.error("Error logging in user:", err);
    throw err;
  }
};

export const getUser = async () => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return {
        error: "User not authenticated",
        user: null,
      };
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return {
        error: "User not found",
        user: null,
      };
    }
    return {
      user: user,
      error: null,
    };
  } catch {
    return {
      error: "Failed to fetch user",
      user: null,
    };
  }
};

export const createUser = async () => {
  try {
    const email = "mahatoaaaa277777gmail.com";

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    const user = await prisma.user.create({
      data: { email },
    });

    return user;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

export async function SignIn(url: string) {
  await signIn("google", {
    callbackUrl: url || "/dashboard",
  });
}

export async function getContact() {
  try {
    const { user } = await getUser();

    if (!user) {
      return {
        name: "",
        email: "",
      };
    }

    const contact = await prisma.contact.findFirst({
      where: { userId: user.id },
    });

    if (!contact) {
      return {
        name: user.name || "",
        email: user.email || "",
      };
    }

    return contact;
  } catch {
    return {
      name: "",
      email: "",
    };
  }
}

export async function saveSettings(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const website = formData.get("website") as string;
  const linkedin = formData.get("linkedin") as string;
  const github = formData.get("github") as string;

  if (!name && !email && !phone && !website && !linkedin && !github) {
    return {
      error: "At least one field must be provided.",
    };
  }

  const { user } = await getUser();
  if (!user) {
    return {
      error: "User not authenticated",
    };
  }
  const existingContact = await prisma.contact.findFirst({
    where: { userId: user.id },
  });

  if (existingContact) {
    const payload = {
      name: name || existingContact.name,
      email: email || existingContact.email,
      phone: phone || existingContact.phone,
      website: website || existingContact.website,
      linkedin: linkedin || existingContact.linkedin,
      github: github || existingContact.github,
    };
    const updatedContact = await prisma.contact.update({
      where: { id: existingContact.id },
      data: payload,
    });
    return updatedContact;
  }

  if (!name || !email) {
    return {
      error: "Name and email are required fields.",
    };
  }
  const data = {
    name,
    email,
    phone,
    website,
    linkedin,
    github,
    userId: user.id,
  };

  const res = await prisma.contact.create({
    data,
  });

  if (!res) {
    return {
      error: "Failed to save contact information.",
    };
  }
  revalidatePath("/settings");
  return res;
}

export async function getRecentTemplate() {
  try {
    const { user } = await getUser();
    if (!user) {
      redirect("/login");
    }

    const template = await prisma.userInfo.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      take: 1,
    });

    return template;
  } catch (error) {
    return {
      error: error || "Failed to fetch recent template.",
    };
  }
}

export async function getRecentTemplateById(id: string) {
  try {
    const { user } = await getUser();
    if (!user) {
      return {
        error: "User not authenticated",
      };
    }

    const template = await prisma.userInfo.findUnique({
      where: { id: id },
    });

    return template;
  } catch (error) {
    return {
      error: error || "Failed to fetch recent template.",
    };
  }
}

export async function saveTemplate(data: ResumeData) {
  try {
    const { user } = await getUser();
    if (!user) {
      redirect("/login");
    }
    const newTemplate = await prisma.userInfo.create({
      data: {
        ...data,
        userId: user.id,
        contact: JSON.parse(JSON.stringify(data.contact)),
        experience: JSON.parse(JSON.stringify(data.experience)),
        education: JSON.parse(JSON.stringify(data.education)),
        skills: JSON.parse(JSON.stringify(data.skills)),
        language: data.language
          ? JSON.parse(JSON.stringify(data.language))
          : undefined,
        projects: data.projects
          ? JSON.parse(JSON.stringify(data.projects))
          : undefined,
      },
    });
    return newTemplate;
  } catch (error) {
    return {
      error: error || "Failed to save template.",
    };
  }
}

export async function updateTemplate(id: string, data: ResumeData) {
  try {
    const { user } = await getUser();
    if (!user) {
      redirect("/login");
    }
    const newTemplate = await prisma.userInfo.update({
      where: { id: id },
      data: {
        ...data,
        userId: user.id,
        contact: JSON.parse(JSON.stringify(data.contact)),
        experience: JSON.parse(JSON.stringify(data.experience)),
        education: JSON.parse(JSON.stringify(data.education)),
        skills: JSON.parse(JSON.stringify(data.skills)),
        language: data.language
          ? JSON.parse(JSON.stringify(data.language))
          : undefined,
        projects: data.projects
          ? JSON.parse(JSON.stringify(data.projects))
          : undefined,
      },
    });
    return newTemplate;
  } catch (error) {
    return {
      error: error || "Failed to save template.",
    };
  }
}

export async function getAllTemplates(limit: number | null) {
  try {
    const { user } = await getUser();
    if (!user) {
      return {
        error: "User not authenticated",
        templates: null,
      };
    }

    const query: any = {
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    };

    if (limit) {
      query.take = limit;
    }

    const template = await prisma.userInfo.findMany(query);

    if (!template || template.length === 0) {
      return {
        templates: null,
        error: "No templates found.",
      };
    }

    return {
      templates: template,
      error: null,
    };
  } catch (error) {
    return {
      templates: null,
      error: error || "Failed to fetch recent template.",
    };
  }
}

export async function deleteTemplate(id: string) {
  try {
    const { user } = await getUser();
    if (!user) {
      return {
        error: "User not authenticated",
      };
    }

    const deletedTemplate = await prisma.userInfo.delete({
      where: { id: id },
    });
    return {
      error: null,
      template: deletedTemplate,
    };
  } catch (error) {
    return {
      error: error || "Failed to delete template.",
      template: null,
    };
  }
}
