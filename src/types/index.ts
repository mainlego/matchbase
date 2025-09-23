export type Sport = 'football' | 'volleyball' | 'tennis' | 'basketball';

export interface Match {
  id: string;
  sport: Sport;
  homeTeam: string;
  awayTeam: string;
  date: string;
  league: string;
  price: number;
  statsYears: number;
}

export interface MatchStatistics {
  matchId: string;
  yearRange: string;
  data: {
    headToHead: HeadToHeadStats[];
    homeTeamForm: TeamForm[];
    awayTeamForm: TeamForm[];
    leagueStats: LeagueStats;
  };
}

export interface HeadToHeadStats {
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  competition: string;
}

export interface TeamForm {
  date: string;
  opponent: string;
  result: 'W' | 'D' | 'L';
  goalsFor: number;
  goalsAgainst: number;
  competition: string;
}

export interface LeagueStats {
  averageGoals: number;
  homeWinPercentage: number;
  drawPercentage: number;
  awayWinPercentage: number;
}

export interface UserData {
  telegramId: string;
  email: string;
}

export interface Order {
  id: string;
  matchId: string;
  userData: UserData;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: Date;
}