// src/hooks/useApiHealth.ts
import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';

export const useApiHealth = () => {
  const [isHealthy, setIsHealthy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await apiService.healthCheck();
        setIsHealthy(health.status === 'healthy');
      } catch (error) {
        setIsHealthy(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { isHealthy, isLoading };
};