// api/auth.js
// Mock API pour l'authentification
let currentUser = null;

// Utilisateurs de test
const users = [
  {
    id: "1",
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  },
];

export const loginUser = async (email, password) => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Identifiants incorrects");
  }

  // Ne pas renvoyer le mot de passe
  const { password: _, ...userWithoutPassword } = user;

  // Stocker l'utilisateur connecté
  currentUser = userWithoutPassword;

  // Simuler le stockage dans localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
  }

  return userWithoutPassword;
};

export const registerUser = async (userData) => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Vérifier si l'email existe déjà
  if (users.find((u) => u.email === userData.email)) {
    throw new Error("Cet email est déjà utilisé");
  }

  // Créer un nouvel utilisateur
  const newUser = {
    id: String(users.length + 1),
    ...userData,
  };

  // Ajouter l'utilisateur à la liste
  users.push(newUser);

  return true;
};

export const checkAuth = async () => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Vérifier s'il y a un utilisateur dans localStorage
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
      return currentUser;
    }
  }

  // Si aucun utilisateur n'est trouvé
  if (!currentUser) {
    throw new Error("Non authentifié");
  }

  return currentUser;
};

export const logoutUser = async () => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Supprimer l'utilisateur du stockage
  currentUser = null;

  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }

  return true;
};
