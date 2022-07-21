import request from '@/service/request.js'
// import { stringify } from 'qs';

// 按键返送
export function postKeyCodeBohui(params) {
  return request.get(`/monitor/send?${params}`);
}

// 获取 srs 在线设备
export function getClients() {
  return request.get("/api/v1/clients/");
}

// 获取区域 json 
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

export function login(params) {
  return request.post(`/jscnCloud/api/v1/user/login`, params);
  // return request.post(`/jscnCloud/api/v1/user/login`, params)
}
// /jscnCloud/api/v1/user/getCaptcha
export function getCaptcha() {
  return request.get(`/jscnCloud/api/v1/user/getCaptcha`, {
    responseType: 'blob',
  })
}



