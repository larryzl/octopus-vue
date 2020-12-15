import request from '@/utils/request'

export function getData(url,params,timeout) {
  return request({
    url,
    method: 'get',
    params,
    timeout:timeout?timeout:5000
  })
}

export function postData(url,data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function patchData(url,Data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function deleteData(url) {
  return request({
    method: 'delete',
    url,
  })
}
