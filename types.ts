export enum Step {
  INTRO = 'INTRO',
  OSDI = 'OSDI',
  EXCLUSION = 'EXCLUSION',
  COMMITMENT = 'COMMITMENT',
  INFO = 'INFO',
  RESULT = 'RESULT',
  REJECT = 'REJECT'
}

export interface OSDIAnswers {
  [key: number]: number | null; // 0-4 or null for N/A
}

export interface UserInfo {
  name: string;
  phone: string;
  otherConditions: string;
  currentDrops: string;
}

export interface RecruitmentData {
  osdiScore: number;
  osdiSeverity: string;
  userInfo: UserInfo;
  timestamp: string;
}