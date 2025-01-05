export interface User {
    username: string;
    total_doubloons: number;
    current_doubloons: number;
    slack: string;
    id: string;
    rank?: number;
  }
  
  export interface ApiResponse {
    users: User[];
    pages: number;
    opted_in: number;
    time_since_last_update: number;
  }
  
  export interface GraphPoint {
    id: string;
    doubloons: number;
    timestamp: string;
  }
  
  export interface StatsData {
    totalDoubloons: number;
    totalUsers: number;
    isLoading: boolean;
  }
  
  export type DisplayMode = 'current' | 'total' | 'spent';