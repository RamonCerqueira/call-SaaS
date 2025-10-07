/**
 * Serviço de integração com a API da Bland.ai
 * Documentação: https://docs.bland.ai/
 */

const BLAND_API_BASE_URL = 'https://api.bland.ai/v1';

/**
 * Classe para gerenciar chamadas à API da Bland.ai
 */
class BlandApiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = BLAND_API_BASE_URL;
  }

  /**
   * Método auxiliar para fazer requisições HTTP
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Authorization': this.apiKey,
      'Content-Type': 'application/json',
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Bland API Error:', error);
      throw error;
    }
  }

  /**
   * Enviar uma nova chamada
   * POST /calls
   */
  async sendCall(callData) {
    const {
      phone_number,
      task,
      voice_id,
      pathway_id,
      first_sentence,
      model,
      temperature,
      max_duration,
      webhook,
      wait_for_greeting,
      record,
      language,
      ...otherParams
    } = callData;

    const payload = {
      phone_number,
      task: task || 'Have a conversation with the person who answers.',
      voice_id: voice_id || 'default',
      ...(pathway_id && { pathway_id }),
      ...(first_sentence && { first_sentence }),
      model: model || 'enhanced',
      temperature: temperature || 0.7,
      max_duration: max_duration || 30,
      ...(webhook && { webhook }),
      wait_for_greeting: wait_for_greeting !== undefined ? wait_for_greeting : true,
      record: record !== undefined ? record : true,
      language: language || 'pt-BR',
      ...otherParams,
    };

    return await this.request('/calls', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Listar todas as chamadas
   * GET /calls
   */
  async listCalls(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = queryParams ? `/calls?${queryParams}` : '/calls';
    
    return await this.request(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Obter detalhes de uma chamada específica
   * GET /calls/:call_id
   */
  async getCall(callId) {
    return await this.request(`/calls/${callId}`, {
      method: 'GET',
    });
  }

  /**
   * Obter transcrição de uma chamada
   * GET /calls/:call_id/transcript
   */
  async getCallTranscript(callId) {
    return await this.request(`/calls/${callId}/transcript`, {
      method: 'GET',
    });
  }

  /**
   * Obter gravação de uma chamada
   * GET /calls/:call_id/recording
   */
  async getCallRecording(callId) {
    return await this.request(`/calls/${callId}/recording`, {
      method: 'GET',
    });
  }

  /**
   * Criar um novo Pathway (fluxo conversacional)
   * POST /pathways
   */
  async createPathway(pathwayData) {
    const {
      name,
      description,
      nodes,
      ...otherParams
    } = pathwayData;

    const payload = {
      name,
      description: description || '',
      nodes: nodes || [],
      ...otherParams,
    };

    return await this.request('/pathways', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Listar todos os Pathways
   * GET /pathways
   */
  async listPathways() {
    return await this.request('/pathways', {
      method: 'GET',
    });
  }

  /**
   * Obter detalhes de um Pathway específico
   * GET /pathways/:pathway_id
   */
  async getPathway(pathwayId) {
    return await this.request(`/pathways/${pathwayId}`, {
      method: 'GET',
    });
  }

  /**
   * Atualizar um Pathway
   * PUT /pathways/:pathway_id
   */
  async updatePathway(pathwayId, pathwayData) {
    return await this.request(`/pathways/${pathwayId}`, {
      method: 'PUT',
      body: JSON.stringify(pathwayData),
    });
  }

  /**
   * Deletar um Pathway
   * DELETE /pathways/:pathway_id
   */
  async deletePathway(pathwayId) {
    return await this.request(`/pathways/${pathwayId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Criar uma base de conhecimento
   * POST /knowledge-bases
   */
  async createKnowledgeBase(kbData) {
    const {
      name,
      description,
      content,
      ...otherParams
    } = kbData;

    const payload = {
      name,
      description: description || '',
      content: content || [],
      ...otherParams,
    };

    return await this.request('/knowledge-bases', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Listar todas as bases de conhecimento
   * GET /knowledge-bases
   */
  async listKnowledgeBases() {
    return await this.request('/knowledge-bases', {
      method: 'GET',
    });
  }

  /**
   * Obter detalhes de uma base de conhecimento
   * GET /knowledge-bases/:kb_id
   */
  async getKnowledgeBase(kbId) {
    return await this.request(`/knowledge-bases/${kbId}`, {
      method: 'GET',
    });
  }

  /**
   * Atualizar uma base de conhecimento
   * PUT /knowledge-bases/:kb_id
   */
  async updateKnowledgeBase(kbId, kbData) {
    return await this.request(`/knowledge-bases/${kbId}`, {
      method: 'PUT',
      body: JSON.stringify(kbData),
    });
  }

  /**
   * Deletar uma base de conhecimento
   * DELETE /knowledge-bases/:kb_id
   */
  async deleteKnowledgeBase(kbId) {
    return await this.request(`/knowledge-bases/${kbId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Listar vozes disponíveis
   * GET /voices
   */
  async listVoices() {
    return await this.request('/voices', {
      method: 'GET',
    });
  }

  /**
   * Obter estatísticas de uso
   * GET /analytics
   */
  async getAnalytics(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = queryParams ? `/analytics?${queryParams}` : '/analytics';
    
    return await this.request(endpoint, {
      method: 'GET',
    });
  }
}

// Instância singleton do serviço
let blandApiInstance = null;

/**
 * Inicializar o serviço com a API key
 */
export const initBlandApi = (apiKey) => {
  blandApiInstance = new BlandApiService(apiKey);
  return blandApiInstance;
};

/**
 * Obter a instância do serviço
 */
export const getBlandApi = () => {
  if (!blandApiInstance) {
    throw new Error('Bland API não foi inicializada. Chame initBlandApi() primeiro.');
  }
  return blandApiInstance;
};

/**
 * Verificar se a API está inicializada
 */
export const isBlandApiInitialized = () => {
  return blandApiInstance !== null;
};

export default BlandApiService;
