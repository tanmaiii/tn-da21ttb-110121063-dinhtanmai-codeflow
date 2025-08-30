export interface ProfileData {
  name: string
  email: string
  bio: string
  avatar: string
  phone: string
  location: string
}

export interface PasswordData {
  current: string
  new: string
  confirm: string
}

export interface AppearanceSettings {
  theme: string
  language: string
  compactMode: boolean
}

export interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  projectUpdates: boolean
  securityAlerts: boolean
  marketingEmails: boolean
}

export interface SecuritySettings {
  twoFactorAuth: boolean
  loginAlerts: boolean
  showOnlineStatus: boolean
  profileVisibility: string
}

export interface AllSettings extends AppearanceSettings, NotificationSettings, SecuritySettings {
  dataSharing: boolean
  autoSave: boolean
} 