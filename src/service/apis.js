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