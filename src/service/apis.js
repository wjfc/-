import request from '@/service/request.js'
import { stringify } from 'qs';

export function postKeyCode(params) {
  return request.post(`/shoudong?${stringify(params)}`);
}

export function postKeyCodeBohui(params) {
  return request.get(`/monitor/send?${params}`);
}

export function getClients() {
  return request.get("/api/v1/clients/");
}

export function getAreas() {
  return request.get("/json/secondaryArea.json");
}

// 根据 clientId 获取 客户端在线离线 状态
export function checkClientIdStatus(clientId) {
  return request.get(`/api/v2/clients/${clientId}`, {
    auth: {
      username: 'admin',
      password: 'public'
    }
  });
}

export function getAllNodes() {
  return request.get(`/api/v2/management/nodes`, {
    auth: {
      username: 'admin',
      password: 'public'
    }
  });
}

export function getAllClientsByNodeName() {
  return request.get(`/api/v2/nodes/emq@127.0.0.1/clients`, {
    auth: {
      username: 'admin',
      password: 'public'
    }
  });
}


