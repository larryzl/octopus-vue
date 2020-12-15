import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/assets/list',
    method: 'get',
    params: query
  })
}

export function fetchAsset(id) {
  return request({
    url: '/vue-element-admin/assets/detail',
    method: 'get',
    params: { id }
  })
}


export function createAsset(data) {
  return request({
    url: '/vue-element-admin/assets/create',
    method: 'post',
    data
  })
}

export function updateAsset(data) {
  return request({
    url: '/vue-element-admin/assets/update',
    method: 'fetch',
    data
  })
}
