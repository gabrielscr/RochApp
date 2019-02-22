export interface Environment {
  /** URL da API de dados, incluindo a barra no final */
  apiUrl: string;
  storeUrl: string;
  useOfflineData?: boolean;
}


export function getEnvironment(): Environment {
  return (window as any).__env;
}
