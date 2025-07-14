import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const AUTH_STORAGE_KEY = 'auth_user';
const USERS_STORAGE_KEY = 'registered_users';

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userString = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const signUp = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
  try {
    // Get existing users
    const existingUsersString = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
    
    // Check if email already exists
    const emailExists = existingUsers.some((user: any) => user.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return { success: false, error: 'Email already registered' };
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      createdAt: new Date().toISOString(),
    };
    
    // Store user credentials (in real app, password would be hashed)
    const userWithPassword = { ...newUser, password };
    existingUsers.push(userWithPassword);
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(existingUsers));
    
    // Set as current user
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Error during sign up:', error);
    return { success: false, error: 'Failed to create account' };
  }
};

export const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
  try {
    // Get existing users
    const existingUsersString = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
    
    // Find user with matching email and password
    const user = existingUsers.find((u: any) => 
      u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );
    
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    // Remove password from user object before storing
    const { password: _, ...userWithoutPassword } = user;
    
    // Set as current user
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Error during sign in:', error);
    return { success: false, error: 'Failed to sign in' };
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const user = await getCurrentUser();
    return user !== null;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};