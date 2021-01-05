import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/ambient/list',
    method: 'get',
    params: query
  })
}

export function fetchAmbient(id) {
  return request({
    url: '/vue-element-admin/ambient/detail',
    method: 'get',
    params: { id }
  })
}


export function createAmbient(data) {
  return request({
    url: '/vue-element-admin/ambient/create',
    method: 'post',
    data
  })
}

export function updateAmbient(data) {
  return request({
    url: '/vue-element-admin/ambient/update',
    method: 'fetch',
    data
  })
}
