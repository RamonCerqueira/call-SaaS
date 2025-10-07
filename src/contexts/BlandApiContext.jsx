import { createContext, useContext, useState, useEffect } from 'react';
import { initBlandApi, getBlandApi, isBlandApiInitialized } from '../services/blandApi';

const BlandApiContext = createContext(null);

export const useBlandApi = () => {
  const context = useContext(BlandApiContext);
  if (!context) {
    throw new Error('useBlandApi deve ser usado dentro de um BlandApiProvider');
  }
  return context;
};

export const BlandApiProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar API key do localStorage ao iniciar
  useEffect(() => {
    const storedApiKey = localStorage.getItem('bland_api_key');
    if (storedApiKey) {
      initializeApi(storedApiKey);
    }
  }, []);

  const initializeApi = (key) => {
    try {
      initBlandApi(key);
      setApiKey(key);
      setIsInitialized(true);
      localStorage.setItem('bland_api_key', key);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsInitialized(false);
    }
  };

  const updateApiKey = (key) => {
    initializeApi(key);
  };

  const clearApiKey = () => {
    setApiKey(null);
    setIsInitialized(false);
    localStorage.removeItem('bland_api_key');
  };

  // Wrapper functions para as operações da API
  const sendCall = async (callData) => {
    setLoading(true);
    setError(null);
    try {
      const api = getBlandApi();
      const result = await api.sendCall(callData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const listCalls = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const api = getBlandApi();
      const result = await api.listCalls(params);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCall = async (callId) => {
    setLoading(true);
    setError(null);
    try {
      const api = getBlandApi();
      const result = await api.getCall(callId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCallTranscript = async (callId) => {
    setLoading(true);
    setError(null);
    try {
      const api = getBlandApi();
      const result = await api.getCallTranscript(callId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const listPathways = async () => {
    setLoading(true);
    setError(null);
    try {
      const api = getBlandApi();
      const result = await api.listPathways();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createPathway = async (pathwayData) => {
    setLoading(true);
    setError(null);
    try {
      const api = getBlandApi();
      const result = await api.createPathway(pathwayData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePathway = async (pathwayId, pathwayData) => {
    setLoading(true);
    setError(null);
    try {
      const api = getBlandApi();
      const result = await api.updatePathway(pathwayId, pathwayData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePathway = async (pathwayId) => {
    setLoading(true);
    setError(null);
    try {
      const api = getBlandApi();
      const result = await api.deletePathway(pathwayId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const listKnowledgeBases = async () => {
    setLoading(true);
    setError(null);
    try {
      const api = getBlandApi();
      const result = await api.listKnowledgeBases();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createKnowledgeBase = async (kbData) => {
    setLoading(true);
    setError(null);
    try {
      const api = getBlandApi();
      const result = await api.createKnowledgeBase(kbData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const listVoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const api = getBlandApi();
      const result = await api.listVoices();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    apiKey,
    isInitialized,
    loading,
    error,
    updateApiKey,
    clearApiKey,
    // API methods
    sendCall,
    listCalls,
    getCall,
    getCallTranscript,
    listPathways,
    createPathway,
    updatePathway,
    deletePathway,
    listKnowledgeBases,
    createKnowledgeBase,
    listVoices,
  };

  return (
    <BlandApiContext.Provider value={value}>
      {children}
    </BlandApiContext.Provider>
  );
};
