export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface WaitlistResponse {
  position: number;
  alreadyRegistered?: boolean;
}

export interface SubscribeResponse {
  subscribed: boolean;
}
